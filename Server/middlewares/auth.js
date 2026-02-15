const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// ---------- AUTH TOKEN VERIFY ----------
exports.auth = async (req,res,next) => {
    try {
        let token = req.headers.authorization?.split(" ")[1] || req.cookies.token || req.body.token;

        if(!token){
            return res.status(401).json({ success:false, message:"Token missing. Access denied." });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch(error) {
            return res.status(401).json({ success:false, message:"Invalid or expired token" });
        }

        next();

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:"Authentication failed",
            error:error.message
        });
    }
};


// ---------- STUDENT ONLY ROUTE ----------
exports.isStudent = (req,res,next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(403).json({ success:false, message:'Only Students allowed' });
        }
        next();
    } catch(err){
        return res.status(500).json({ success:false, message:'Role check failed' });
    }
};


// ---------- INSTRUCTOR ONLY ROUTE ----------
exports.isInstructor = (req,res,next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(403).json({ success:false, message:'Only Instructors allowed' });
        }
        next();
    } catch(err){
        return res.status(500).json({ success:false, message:'Role check failed' });
    }
};


// ---------- ADMIN ONLY ROUTE ----------
exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(403).json({ success:false, message:'Only Admins allowed' });
        }
        next();
    } catch(err){
        return res.status(500).json({ success:false, message:'Role check failed' });
    }
};
