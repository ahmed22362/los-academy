"use client";

import React, { useState } from "react";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import { showError, showSuccess } from "@/utilities/toastMessages";
import EditReportForm from "@/app/[locale]/components/report/EditReportForm";
import { getCourses } from "@/utilities/getCourses";
import { Student } from "@/types";

export default function EditMonthlyReport({
  openReportModal,
  reportData,
  handleCloseModal,
  updateComponent,
  students,
}: {
  openReportModal: boolean;
  reportData: any;
  handleCloseModal: () => void;
  updateComponent: () => void;
  students: Student[];
}) {
  const reportDetails = reportData && reportData;
  const [isProcessing, setIsProcessing] = useState(false);
  const cookies = new Cookies();
  const toast = useRef<Toast>(null);
  const courses = getCourses();

  const editReport = (formData: any) => {
    if (Object.keys(formData).length === 0) {
      showError("No data to Update monthly report", toast);
      return;
    }
    if (!formData.grade || !formData.comment) {
      showError("Please provide both total grade and comment.", toast);
      setIsProcessing(false);
      return;
    }
    console.log(formData);
    setIsProcessing(true);
    fetch(
      `${process.env.NEXT_PUBLIC_APIURL}/monthlyReport/${reportDetails.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
        body: JSON.stringify(formData),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          showSuccess("updated successfully", toast);
          updateComponent();
        } else {
          showError(data.message, toast);
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
      <EditReportForm
        openReportModal={openReportModal}
        reportData={reportData}
        isProcessing={isProcessing}
        handleCloseModal={handleCloseModal}
        courses={courses.map((course) => course.title)}
        onEditReport={editReport}
        users={students}
        monthlyReport={true}
        header={"Update Monthly Report"}
      />
    </>
  );
}
