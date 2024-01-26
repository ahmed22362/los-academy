"use client";

import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import { showError, showSuccess } from "@/utilities/toastMessages";
import AddReportForm from "../../../components/report/AddReportForm";
import { getCourses } from "@/utilities/getCourses";

export enum GradeOptions {
  EXCELLENT = "excellent",
  GOOD = "good",
  VERY_GOOD = "very good",
  AVERAGE = "average",
  BELOW_AVERAGE = "below average",
}
export interface ReportsCourses {
  courseName: string;
  courseGrade: GradeOptions;
  courseComment?: GradeOptions;
}
interface FormData {
  [key: string]: any;
  sessionId: number;
  reportCourses: ReportsCourses[];
  comment?: string;
  grade?: GradeOptions;
  title: string;
}
export default function AddReportModal({
  openAssignModal,
  handleCloseModal,
  sessionID,
}: {
  sessionID?: any;
  openAssignModal: boolean;
  handleCloseModal: () => void;
}) {
  const idSession = sessionID && sessionID;
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const toast = useRef<Toast>(null);
  const cookies = new Cookies();
  const courses = getCourses().map((course) => course.title);

  const addReport = (formData: any) => {
    if (courses && formData.reportCourses.length === 0) {
      showError("Please provide at least one course report.", toast);
      setIsProcessing(false);
      return;
    }
    if (!formData.grade || !formData.comment) {
      showError("Please provide both total grade and comment.", toast);
      setIsProcessing(false);
      return;
    }
    formData.sessionId = idSession;
    setIsProcessing(true);
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          showSuccess(data.message, toast);
          window.location.reload();
        } else {
          console.log(data);
          let message = Array.isArray(data) ? data[0].message : data.message;
          showError(message, toast);
        }
        setIsProcessing(false);
      })
      .catch((err) => {
        console.error(err);
        showError(err.message, toast);
        setIsProcessing(false);
      });
  };

  return (
    <>
      <Toast ref={toast} />
      <AddReportForm
        key={sessionID}
        openAssignModal={openAssignModal}
        handleCloseModal={handleCloseModal}
        courses={courses}
        onAddReport={addReport}
        modalHeader={"Add Report"}
        isProcessing={isProcessing}
        sessionId={idSession}
      />
    </>
  );
}
