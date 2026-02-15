const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const mongoose = require("mongoose");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");

// ============================ CAPTURE PAYMENT ============================
exports.capturePayment = async (req, res) => {

  // 🔐 Razorpay disabled safely
  if (!instance) {
    return res.status(503).json({
      success: false,
      message: "Payments disabled (Razorpay not configured)",
    });
  }

  const { courses } = req.body;
  const userId = req.user.id;

  if (!courses || courses.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Provide course IDs",
    });
  }

  let totalAmount = 0;

  try {
    for (const courseId of courses) {
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: "User already enrolled in course",
        });
      }

      totalAmount += Number(course.price);
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const paymentResponse = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      data: paymentResponse,
    });

  } catch (error) {
    console.error("Capture Payment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate payment",
    });
  }
};

// ============================ VERIFY PAYMENT ============================
exports.verifyPayment = async (req, res) => {

  // 🔐 Razorpay disabled safely
  if (!instance) {
    return res.status(503).json({
      success: false,
      message: "Payments disabled (Razorpay not configured)",
    });
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    courses,
  } = req.body;

  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Invalid signature",
    });
  }

  try {
    await enrollStudents(courses, userId);
    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not enroll student",
    });
  }
};

// ============================ ENROLL STUDENTS ============================
const enrollStudents = async (courses, userId) => {

  for (const courseId of courses) {
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $push: { studentsEnrolled: userId } },
      { new: true }
    );

    if (!course) {
      throw new Error("Course not found");
    }

    const courseProgress = await CourseProgress.create({
      courseID: courseId,
      userId,
      completedVideos: [],
    });

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          courses: courseId,
          courseProgress: courseProgress._id,
        },
      },
      { new: true }
    );

    await mailSender(
      user.email,
      `Successfully enrolled in ${course.courseName}`,
      courseEnrollmentEmail(course.courseName, user.firstName)
    );
  }
};

// ============================ PAYMENT SUCCESS EMAIL ============================
exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const user = await User.findById(userId);

    await mailSender(
      user.email,
      "Payment Successful",
      paymentSuccessEmail(
        user.firstName,
        amount / 100,
        orderId,
        paymentId
      )
    );

    return res.status(200).json({
      success: true,
      message: "Payment success email sent",
    });
  } catch (error) {
    console.error("Send Email Error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not send payment email",
    });
  }
};
