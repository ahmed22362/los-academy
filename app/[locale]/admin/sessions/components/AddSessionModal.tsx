"use client";

import React, { useState } from "react";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import { FormField, Student, Teacher } from "@/types";
import AddModal from "@/app/[locale]/components/genericTableComponent/genericAddModal";
import { showError, showSuccess } from "@/utilities/toastMessages";
import createSessionSchema from "@/schemas/session.schema";

export default function AddSessionModal({
  openAssignModal,
  handleCloseModal,
  updateComponent,
  students,
  teachers,
}: {
  openAssignModal: boolean;
  handleCloseModal: () => void;
  updateComponent: () => void;
  students: Student[];
  teachers: Teacher[];
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useRef<Toast>(null);
  const cookies = new Cookies();
  const sessionFormFields: FormField[] = [
    {
      name: "userId",
      label: "Student",
      type: "select",
    },
    {
      name: "teacherId",
      label: "Teacher",
      type: "select",
    },
    {
      name: "sessionDates",
      label: "Session Dates Only For The First Week",
      type: "datepicker",
    },
    {
      name: "sessionDuration",
      label: "Session Duration (minutes)",
      type: "number",
      placeholder: "Enter Session Duration",
    },
    {
      name: "sessionCount",
      label: "Session Count",
      type: "number",
      placeholder: "Enter Session Count",
    },
    {
      name: "sessionsPerWeek",
      label: "Sessions Per Week",
      type: "number",
      placeholder: "Enter Sessions Per Week",
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: ["free", "paid"],
      placeholder: "Select Type",
    },
  ];
  const addSession = (formData: any) => {
    setIsProcessing(true);

    if (formData.sessionDates.length === 0) {
      setIsProcessing(false);
      showError("please choose dates for the session ", toast);
      return;
    }
    formData.sessionDates = formData.sessionDates
      .toString()
      .split(",")
      .map((strDate: string) => new Date(strDate).toISOString());
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/createSession`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify({
        ...formData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          showSuccess(data.message, toast);
          updateComponent();
          const timerToClose = setTimeout(() => {
            handleCloseModal();
            clearTimeout(timerToClose);
          }, 3000);
        } else {
          let message;
          Array.isArray(data) ? (message = data[0].message) : data.message;
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
      <AddModal
        openModal={openAssignModal}
        closeModal={handleCloseModal}
        formFields={sessionFormFields}
        onSubmit={addSession}
        modalHeader={"Add Session"}
        isProcessing={isProcessing}
        schema={createSessionSchema}
        addButtonText={"Add Session"}
        students={students}
        teachers={teachers}
      />
    </>
  );
}
