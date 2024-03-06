"use client";

import React, { useState } from "react";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import { TeacherSchema } from "@/schemas";
import { FormField } from "@/types";
import { showError, showSuccess } from "@/utilities/toastMessages";
import AddModal from "@/app/[locale]/components/genericTableComponent/genericAddModal";
import { GiTeacher } from "react-icons/gi";
const teacherFormFields: FormField[] = [
  { name: "name", label: "Teacher Name", type: "text" },
  { name: "email", label: "Teacher Email", type: "email" },
  { name: "phone", label: "Teacher Phone", type: "tel" },
  {
    name: "nationalId",
    label: "National ID",
    type: "text",
    placeholder: "National ID must be unique and 14 number!",
  },
  {
    name: "password",
    label: "Password",
    type: "text",
    placeholder: "It's recommended to use a strong password",
  },
  {
    name: "passwordConfirmation",
    label: "Password Confirmation",
    type: "text",
    placeholder: "Make sure you enter the same password!",
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    options: ["admin", "teacher"],
  },
  {
    name: "hour_cost",
    label: "Hour Cost",
    type: "text",
    placeholder: "Cost currency is in USD / $",
  },
  {
    name: "permanent_meeting_url",
    label: "Teacher permanent meeting link",
    type: "text",
    placeholder: "https://us05web.zoom.us/j/****?pwd=***.1",
  },
];
export default function AddTeacherModal({
  openAssignModal,
  handleCloseModal,
  updateComponent,
}: {
  openAssignModal: boolean;
  handleCloseModal: () => void;
  updateComponent: () => void;
}) {
  const toast = useRef<Toast>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const cookies = new Cookies();

  const addTeacher = (formData: any) => {
    setIsProcessing(true);
    console.log(formData);
    formData.hour_cost = parseFloat(formData.hour_cost);
    console.log(formData);

    fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          showSuccess("Teacher added successfully", toast);
          updateComponent();
        } else if (data.status === "fail") {
          showError(`Failed on adding Teacher: ${data.message}`, toast);
        } else {
          showError(`Failed on adding Teacher: ${data.message}`, toast);
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
        formFields={teacherFormFields}
        onSubmit={addTeacher}
        modalHeader="Add Teacher"
        schema={TeacherSchema}
        isProcessing={isProcessing}
        icon={<GiTeacher />}
        addButtonText={"Add Teacher"}
      />
    </>
  );
}
