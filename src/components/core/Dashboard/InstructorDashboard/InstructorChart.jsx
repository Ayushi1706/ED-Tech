import React, { useState } from "react"
import { Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const InstructorChart = ({ courses = [] }) => {
  const [currChart, setCurrChart] = useState("students")

  // Fixed professional color palette
  const chartColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#8AC926",
    "#C9CBCF",
  ]

  // Check if student data exists
  const hasStudentData = courses.some(
    (course) => course.totalStudentsEnrolled > 0
  )

  // Check if income data exists
  const hasIncomeData = courses.some(
    (course) => course.totalAmountGenerated > 0
  )

  // Chart data for students
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: chartColors.slice(0, courses.length),
        borderWidth: 1,
      },
    ],
  }

  // Chart data for income
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: chartColors.slice(0, courses.length),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#F1F2FF",
        },
      },
    },
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      
      <p className="text-lg font-bold text-richblack-5">
        Visualize
      </p>

      {/* Toggle Buttons */}
      <div className="space-x-4 font-semibold">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm px-3 py-1 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>

        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm px-3 py-1 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>

      {/* Chart Area */}
      <div className="relative mx-auto aspect-square w-full max-w-[400px]">

        {courses.length === 0 ? (
          <p className="text-center text-richblack-200">
            Not Enough Data To Visualize
          </p>
        ) : (currChart === "students" && !hasStudentData) ||
          (currChart === "income" && !hasIncomeData) ? (
          <p className="text-center text-richblack-200">
            Not Enough Data To Visualize
          </p>
        ) : (
          <Pie
            data={
              currChart === "students"
                ? chartDataStudents
                : chartIncomeData
            }
            options={options}
          />
        )}
      </div>
    </div>
  )
}

export default InstructorChart
