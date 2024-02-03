"use client";

import React, { useState } from "react";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import UpdateModal from "@/app/[locale]/components/genericTableComponent/updateModal";
import { showError, showSuccess } from "@/utilities/toastMessages";
import { FormField } from "@/types";

export default function EditTeacherModal({
  openAssignModal,
  handleCloseModal,
  teacherDetails,
  updateComponent,
}: {
  openAssignModal: boolean;
  handleCloseModal: () => void;
  teacherDetails: any;
  updateComponent: () => void;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const cookies = new Cookies();

  const toast = useRef<Toast>(null);

  const updateTeacherFormFields: FormField[] = [
    { name: "name", label: "Teacher Name", type: "text" },
    { name: "email", label: "Teacher Email", type: "email" },
    { name: "phone", label: "Teacher Phone", type: "tel" },
    {
      name: "nationalId",
      label: "National ID",
      type: "text",
    },
    {
      name: "password",
      label: "Password",
      type: "text",
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: ["admin", "teacher"],
    },
    {
      name: "committed_mins",
      label: "Committed Minutes",
      type: "number",
    },
    {
      name: "hour_cost",
      label: "Hour Cost",
      type: "number",
    },
    {
      name: "balance",
      label: "Balance",
      type: "number",
    },
  ];
  const updateTeacher = (formData: any) => {
    setIsProcessing(true);
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher/${teacherDetails.id}`, {
      method: "PATCH",
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
        } else {
          showError(data.message, toast);
        }
        setIsProcessing(false);
      })
      .catch((err) => {
        console.log(err);
        setIsProcessing(false);
        showError(err, toast);
      });
  };
  return (
    <>
      <Toast ref={toast} />
      <UpdateModal
        openModal={openAssignModal}
        closeModal={handleCloseModal}
        formFields={updateTeacherFormFields}
        onSubmit={updateTeacher}
        modalHeader={"Update Teacher"}
        isProcessing={isProcessing}
        updateButtonText={"Update"}
        objectDetails={teacherDetails}
      />
    </>
  );
}
