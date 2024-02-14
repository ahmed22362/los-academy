"use client";

import React, { useState } from "react";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import UpdateModal from "@/app/[locale]/components/genericTableComponent/updateModal";
import { showError, showSuccess } from "@/utilities/toastMessages";
import { FormField, Payout } from "@/types";
const editPayOutFormFields: FormField[] = [
  { name: "amount", label: "Amount in $", type: "number" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["done", "pending", "processing"],
  },
];
export default function EditPayoutModal({
  openAssignModal,
  handleCloseModal,
  payout,
  updateComponent,
}: {
  openAssignModal: boolean;
  handleCloseModal: () => void;
  payout: Payout;
  updateComponent: () => void;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const cookies = new Cookies();
  const toast = useRef<Toast>(null);

  const updatePayout = (formData: any) => {
    setIsProcessing(true);
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/payout/${payout.id}`, {
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
        formFields={editPayOutFormFields}
        onSubmit={updatePayout}
        modalHeader={"Update Payout"}
        isProcessing={isProcessing}
        updateButtonText={"Update"}
        objectDetails={payout}
      />
    </>
  );
}
