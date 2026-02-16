# 🎓 StudyNotion – MERN Stack Ed-Tech Platform

StudyNotion is a full-stack Ed-Tech web application that allows students to explore, purchase, and rate courses while enabling instructors to create and manage educational content.  

The platform is built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** and follows a scalable client-server architecture.

---

## 🚀 Live Demo

Frontend: 
Backend: https://ed-tech-backend-mhnr.onrender.com

---

## 📌 Table of Contents

- Project Overview  
- System Architecture  
- Front-End  
- Back-End  
- Database Schema  
- API Design  
- Deployment  
- Technologies Used  
- Future Enhancements  

---

# 📖 Project Overview

StudyNotion provides:

- A seamless and interactive learning experience for students  
- A platform for instructors to create, manage, and monetize courses  
- Secure authentication and payment integration  
- Cloud-based media management  

---

# 🏗️ System Architecture

The application follows a **client-server architecture** consisting of:

### 1️⃣ Front-End (Client)
- Built using **React.js**
- Communicates with backend via REST APIs
- Manages UI rendering and user interactions

### 2️⃣ Back-End (Server)
- Built using **Node.js and Express.js**
- Handles authentication, course management, and business logic
- Provides RESTful APIs for frontend communication

### 3️⃣ Database
- Uses **MongoDB**
- Stores user data, course content, and transaction details

---

# 💻 Front-End

The front-end is developed using React.js and Tailwind CSS to provide a responsive and dynamic user interface.

## 👨‍🎓 Student Features

- Homepage with platform introduction  
- Course listing with descriptions and ratings  
- Wishlist functionality  
- Cart and Razorpay checkout  
- Course content access (videos, materials)  
- Enrolled courses dashboard  
- Profile management  

## 👩‍🏫 Instructor Features

- Instructor dashboard  
- Course creation and editing  
- Course analytics and insights  
- Profile management  

---

# ⚙️ Back-End

The backend is developed using Node.js and Express.js and follows a modular structure.

## 🔐 Authentication & Authorization

- User signup & login  
- JWT-based authentication  
- OTP verification  
- Forgot password functionality  
- Role-based access control (Student/Instructor)

## 📚 Course Management

- Create, update, delete courses  
- Add course sections and lectures  
- Course rating system  

## 💳 Payment Integration

- Razorpay integration  
- Secure checkout flow  

## ☁️ Media Management

- Cloudinary integration for storing images and videos  

---

# 🗄️ Database Schema

### 👨‍🎓 Student Schema
- Name  
- Email  
- Password (hashed using Bcrypt)  
- Enrolled Courses  

### 👩‍🏫 Instructor Schema
- Name  
- Email  
- Password  
- Created Courses  

### 📚 Course Schema
- Course Name  
- Description  
- Instructor Details  
- Sections & Subsections  
- Ratings  
- Media Content  

---

# 🔌 API Design

The API follows REST architecture and uses JSON for data exchange.

## 🔐 Authentication Routes

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/verify-otp`
- `POST /api/auth/forgot-password`

## 📚 Course Routes

- `GET /api/courses`
- `GET /api/courses/:id`
- `POST /api/courses`
- `PUT /api/courses/:id`
- `DELETE /api/courses/:id`
- `POST /api/courses/:id/rate`

---

# 🚀 Deployment

The project is deployed using:

- **Frontend:** Vercel  
- **Backend:** Render / Railway  
- **Database:** MongoDB Atlas  
- **Media Storage:** Cloudinary  

---

# 🛠️ Technologies Used

### Frontend
- React.js  
- Redux Toolkit  
- Tailwind CSS  
- Axios  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT  
- Bcrypt  

### Other Tools
- Razorpay  
- Cloudinary  
- Postman  
- VS Code  

---

# 🔮 Future Enhancements

- Live classes integration  
- Certificate generation  
- Admin dashboard  
- Advanced analytics  
- Discussion forums  

---
