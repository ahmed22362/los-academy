"use client";

import React, { useState } from "react";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import { FormField } from "@/types";
import AddModal from "@/app/[locale]/components/genericTableComponent/genericAddModal";
import materialSchema from "@/schemas/material.schmea";
import { showError, showSuccess } from "@/utilities/toastMessages";

export default function AddMaterialModal({
  openAssignModal,
  handleCloseModal,
  updateComponent,
}: {
  openAssignModal: boolean;
  handleCloseModal: () => void;
  updateComponent: () => void;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const cookie = new Cookies();
  const toast = useRef<Toast>(null);

  const materialFormFields: FormField[] = [
    { name: "name", label: "Book Name", type: "text" },
    { name: "age", label: "Up to Age", type: "text" },
    { name: "course", label: "Course", type: "text" },
    { name: "file", label: "Upload file", type: "file", accept: ".pdf" },
  ];

  const addBook = (values: any) => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("age", values.age);
    formData.append("course", values.course);
    formData.append("file", values.file);
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/material`, {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${cookie.get("token")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          showSuccess("Material added Successfully!", toast);
          updateComponent();
        } else {
          showError(`Can't add Material: ${data.message}`, toast);
        }
        setIsProcessing(false);
      })
      .catch((err) => {
        console.log(err);
        showError(`Some thing went wrong: ${err.message}`, toast);
      });
  };

  return (
    <>
      <Toast ref={toast} />
      <AddModal
        openModal={openAssignModal}
        closeModal={handleCloseModal}
        formFields={materialFormFields}
        onSubmit={addBook}
        modalHeader={"Add Material"}
        isProcessing={isProcessing}
        schema={materialSchema}
        addButtonText={"Add Material"}
      />
    </>
  );
}
