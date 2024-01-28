"use client";

import React from "react";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { Student } from "@/types";
import AddReportForm from "./AddReportForm";

export default function EditReportForm({
  openReportModal,
  reportData,
  handleCloseModal,
  onEditReport,
  users,
  courses,
  isProcessing,
  monthlyReport,
  header,
}: {
  openReportModal: boolean;
  monthlyReport: boolean;
  header: string;
  reportData: any;
  isProcessing: boolean;
  handleCloseModal: () => void;
  users?: Student[];
  courses: string[];
  onEditReport: (formData: any) => void;
}) {
  const reportDetails = reportData && reportData;
  const toast = useRef<Toast>(null);

  return (
    <>
      <Toast ref={toast} />
      <AddReportForm
        openAssignModal={openReportModal}
        handleCloseModal={handleCloseModal}
        courses={courses}
        modalHeader={header}
        isProcessing={isProcessing}
        monthlyReport={monthlyReport}
        students={users}
        isEditMode={true}
        onEditReport={onEditReport}
        initialData={reportDetails}
      />
    </>
  );
}
