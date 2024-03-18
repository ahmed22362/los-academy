"use client";

import React, { useState } from "react";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import UpdateModal from "@/app/[locale]/components/genericTableComponent/updateModal";
import { showError, showSuccess } from "@/utilities/toastMessages";
import { FormField, SessionStatus } from "@/types";
export default function EditSessionModal({
  openAssignModal,
  handleCloseModal,
  sessionDetails,
  updateComponent,
}: {
  openAssignModal: boolean;
  handleCloseModal: () => void;
  sessionDetails: any;
  updateComponent: () => void;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const cookies = new Cookies();
  const toast = useRef<Toast>(null);

  const updateSessionFormFields: FormField[] = [
    {
      name: "sessionDate",
      label: "Session Date",
      type: "datepicker",
    },
    {
      name: "studentAttended",
      label: "Student Attended?",
      type: "select",
      options: ["true", "false"],
    },
    {
      name: "teacherAttended",
      label: "Teacher Attended?",
      type: "select",
      options: ["true", "false"],
    },
    {
      name: "hasReport",
      label: "Has Report?",
      type: "select",
      options: ["true", "false"],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: Object.values(SessionStatus),
    },
    {
      name: "reschedule_request_count",
      label: "Numbers of reschedule requests for this session",
      type: "number",
    },
  ];
  const updateSession = (formData: any) => {
    setIsProcessing(true);
    formData.sessionDate = formData.sessionDate
      .toString()
      .split(",")
      .map((strDate: string) => new Date(strDate).toISOString())[0];
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/${sessionDetails.id}`, {
      method: "PATCH",
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
        console.log(data);
        if (data.status === "success") {
          showSuccess("Updated Successfully", toast);
          const timer = setTimeout(() => {
            updateComponent();
            clearTimeout(timer);
          }, 4000);
        } else {
          showError(
            "Something went wrong make sure all fields are filled correctly",
            toast,
          );
        }
        setIsProcessing(false);
      })
      .catch((err) => {
        console.log(err);
        showError(err.message, toast);
      });
  };
  return (
    <>
      <Toast ref={toast} />
      <UpdateModal
        openModal={openAssignModal}
        closeModal={handleCloseModal}
        formFields={updateSessionFormFields}
        onSubmit={updateSession}
        modalHeader={"Update Sessions"}
        isProcessing={isProcessing}
        updateButtonText={"Update"}
        objectDetails={sessionDetails}
      />
    </>
  );
}
