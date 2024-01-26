"use client";

import {
  CustomFlowbiteTheme,
  Label,
  Modal,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { getAllStudents } from "@/utilities/getAllStudents";
import UpdateModal from "../genericTableComponent/updateModal";
import { FormField, Student } from "@/types";
import { showError, showSuccess } from "@/utilities/toastMessages";
import AddReportForm from "./AddReportForm";

export const reportFormFields = ({
  users,
  courses,
}: {
  users?: string[];
  courses: string[];
}): FormField[] => [
  { name: "title", label: "Report Title", type: "text" },
  { name: "grade", label: "Total Grade", type: "radio" },
  { name: "comment", label: "Your Message", type: "textarea" },
];
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
