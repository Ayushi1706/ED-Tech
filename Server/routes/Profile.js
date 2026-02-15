const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");

const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/Profile");

// ================= PROFILE ROUTES =================

// update profile
router.put("/updateProfile", auth, updateProfile);

// delete account
router.delete("/deleteAccount", auth, deleteAccount);

// get user details
router.get("/getUserDetails", auth, getAllUserDetails);

//  THIS WAS MISSING
router.post("/updateDisplayPicture", auth, updateDisplayPicture);

// enrolled courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

// instructor dashboard
router.get("/instructorDashboard", auth, instructorDashboard);

module.exports = router;
