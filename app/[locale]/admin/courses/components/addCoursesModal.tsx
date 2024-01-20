"use client";

import React, { useState } from "react";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { GiTeacher } from "react-icons/gi";
import Cookies from "universal-cookie";
import { FormField } from "@/types";
import AddModal from "@/app/[locale]/components/genericTableComponent/genericAddModal";
import CourseSchema from "@/schemas/course.schema";
import { showError, showSuccess } from "@/utilities/toastMessages";

export const courseFormFields: FormField[] = [
  { name: "title", label: "Course Title", type: "text" },
  { name: "description", label: "Course Description", type: "text" },
  { name: "details", label: "Course Details", type: "textarea" },
];
export default function AddCourseModal({
  openAssignModal,
  handleCloseModal,
  updateComponent,
}: {
  openAssignModal: boolean;
  handleCloseModal: () => void;
  updateComponent: () => void;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useRef<Toast>(null);
  const cookies = new Cookies();

  const addCourse = (formData: any) => {
    setIsProcessing(true);
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/course`, {
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
        console.log(data);
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
          console.log(Array.isArray(data));
          showError(message, toast);
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
      <AddModal
        openModal={openAssignModal}
        closeModal={handleCloseModal}
        formFields={courseFormFields}
        onSubmit={addCourse}
        modalHeader={"Add Course"}
        isProcessing={isProcessing}
        schema={CourseSchema}
        addButtonText={"Add Course"}
      />
    </>
  );
}
