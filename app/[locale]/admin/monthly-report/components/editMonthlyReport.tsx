"use client";

import React, { useState } from "react";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import { getAllStudents } from "@/utilities/getAllStudents";
import { showError, showSuccess } from "@/utilities/toastMessages";
import EditReportForm from "@/app/[locale]/components/report/EditReportForm";
import { getCourses } from "@/utilities/getCourses";

export default function EditMonthlyReport({
  openReportModal,
  reportData,
  handleCloseModal,
  updateComponent,
}: {
  openReportModal: boolean;
  reportData: any;
  handleCloseModal: () => void;
  updateComponent: () => void;
}) {
  const reportDetails = reportData && reportData;
  const [isProcessing, setIsProcessing] = useState(false);
  const cookies = new Cookies();
  const toast = useRef<Toast>(null);
  const myStudentsData = getAllStudents(cookies.get("token"));
  const courses = getCourses();

  const editReport = (formData: any) => {
    const reportData: { [key: string]: any } = {};

    if (Object.keys(reportData).length === 0) {
      showError("No data to Update monthly report", toast);
      return;
    }

    console.log(reportData);
    setIsProcessing(true);
    fetch(
      `${process.env.NEXT_PUBLIC_APIURL}/monthlyReport/${reportDetails.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
        body: JSON.stringify(reportData),
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
        users={myStudentsData}
        monthlyReport={true}
        header={"Update Monthly Report"}
      />
    </>
  );
}
