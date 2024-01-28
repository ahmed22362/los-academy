"use client";

import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { ResponseSessionStatistsData } from "@/types";

export default function TeacherChart({
  teacherStatistics,
  totalSessions,
}: {
  teacherStatistics: ResponseSessionStatistsData[];
  totalSessions: number;
}) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const teacherAbsentSessionCount = teacherStatistics.filter(
    (item) => item.status === "teacher_absent",
  )[0]?.count;
  const takenSessionCount = teacherStatistics.filter(
    (item) => item.status === "taken",
  )[0]?.count;
  const pendingSessionCount = teacherStatistics.filter(
    (item) => item.status === "pending",
  )[0]?.count;
  const studentAbsentSessionCount = teacherStatistics.filter(
    (item) => item.status === "user_absent",
  )[0]?.count;

  const studentAbsentSessions = Math.floor(
    studentAbsentSessionCount ?? 0 / totalSessions,
  );
  const attendSessions = Math.floor(takenSessionCount ?? 0 / totalSessions);
  const pendingSessions = Math.floor(pendingSessionCount ?? 0 / totalSessions);
  const teacherAbsentSessions = Math.floor(
    teacherAbsentSessionCount ?? 0 / totalSessions,
  );
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Attend", "Pending", "Student Absent", "Teacher Absent"],
      datasets: [
        {
          data: [
            attendSessions,
            pendingSessions,
            studentAbsentSessions,
            teacherAbsentSessions,
          ],
          backgroundColor: [
            documentStyle.getPropertyValue("--primary-color"),
            documentStyle.getPropertyValue("--secondary-color"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--orange-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--blue-300"),
            documentStyle.getPropertyValue("--yellow-300"),
            documentStyle.getPropertyValue("--orange-300"),
          ],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="card flex justify-content-center">
      <Chart
        type="pie"
        data={chartData}
        options={chartOptions}
        className="w-full md:w-30rem"
        height={"150px"}
        width={"150px"}
      />
    </div>
  );
}
