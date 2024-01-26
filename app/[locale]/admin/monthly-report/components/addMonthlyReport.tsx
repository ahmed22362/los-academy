"use client";

import React, { useState } from "react";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import { getAllStudents } from "@/utilities/getAllStudents";
import { getCourses } from "@/utilities/getCourses";
import AddReportForm from "@/app/[locale]/components/report/AddReportForm";
import { showError, showSuccess } from "@/utilities/toastMessages";

export default function AddMonthlyReport({
  openReportModal,
  handleCloseModal,
  updateComponent,
}: {
  openReportModal: boolean;
  handleCloseModal: () => void;
  updateComponent: () => void;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const cookies = new Cookies();
  const toast = useRef<Toast>(null);
  const allStudents = getAllStudents(cookies.get("token"));
  const allCourses = getCourses();
  const addReport = (formData: any) => {
    if (allStudents && formData.userId.length === 0) {
      showError("Please provide User Id.", toast);
      setIsProcessing(false);
      return;
    }
    if (allCourses && formData.reportCourses.length === 0) {
      showError("Please provide at least one course report.", toast);
      setIsProcessing(false);
      return;
    }
    if (!formData.grade || !formData.comment) {
      showError("Please provide both total grade and comment.", toast);
      setIsProcessing(false);
      return;
    }

    console.log(formData);
    setIsProcessing(true);
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/monthlyReport/`, {
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
          updateComponent();
          // router.refresh();
        } else {
          let message = Array.isArray(data) ? data[0].message : data.message;
          showError(message, toast);
        }
        setIsProcessing(false);
      })
      .catch((err) => {
        console.log(err);
        showError(err.message, toast);
        setIsProcessing(false);
      });
  };

  return (
    <>
      <Toast ref={toast} />
      <AddReportForm
        openAssignModal={openReportModal}
        handleCloseModal={handleCloseModal}
        courses={allCourses.map((course) => course.title)}
        onAddReport={addReport}
        modalHeader={"Add Monthly Report"}
        isProcessing={isProcessing}
        monthlyReport={true}
        students={allStudents}
      />
    </>
  );
}
