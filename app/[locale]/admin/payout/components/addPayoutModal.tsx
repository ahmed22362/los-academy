"use client";

import React, { useState } from "react";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import { FormField, Teacher } from "@/types";
import AddModal from "@/app/[locale]/components/genericTableComponent/genericAddModal";
import { showError, showSuccess } from "@/utilities/toastMessages";
import createPayoutSchema from "@/schemas/payout.schema";

const createPayOutFormFields: FormField[] = [
  { name: "teacherId", label: "Teacher", type: "select" },
  { name: "amount", label: "Amount in $", type: "number" },
];
export default function AddPayoutModal({
  openAssignModal,
  handleCloseModal,
  updateComponent,
  teachers,
}: {
  openAssignModal: boolean;
  teachers: Teacher[];
  handleCloseModal: () => void;
  updateComponent: () => void;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useRef<Toast>(null);
  const cookies = new Cookies();

  const addPayout = (formData: any) => {
    setIsProcessing(true);
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/payout`, {
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
          showError(data.message, toast);
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
        formFields={createPayOutFormFields}
        onSubmit={addPayout}
        modalHeader={"Add Payout"}
        isProcessing={isProcessing}
        schema={createPayoutSchema}
        addButtonText={"Add Payout"}
        teachers={teachers}
      />
    </>
  );
}
