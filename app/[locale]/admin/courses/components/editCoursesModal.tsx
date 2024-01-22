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
import LoadingButton from "../../components/loadingButton";
import Cookies from "universal-cookie";
import UpdateModal from "@/app/[locale]/components/genericTableComponent/updateModal";
import { courseFormFields } from "./addCoursesModal";
import { showError, showSuccess } from "@/utilities/toastMessages";
export default function EditCoursesModal({
  openAssignModal,
  handleCloseModal,
  courseDetails,
  updateComponent,
}: {
  openAssignModal: boolean;
  handleCloseModal: () => void;
  courseDetails: any;
  updateComponent: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const cookies = new Cookies();
  const toast = useRef<Toast>(null);

  const updateCourse = (formData: any) => {
    setIsProcessing(true);
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/course/${courseDetails.id}`, {
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
        formFields={courseFormFields}
        onSubmit={updateCourse}
        modalHeader={"Update Course"}
        isProcessing={isProcessing}
        updateButtonText={"Update"}
        objectDetails={courseDetails}
      />
    </>
  );
}
