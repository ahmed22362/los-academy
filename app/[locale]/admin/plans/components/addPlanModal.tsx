"use client";

import React, { useState } from "react";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { PiStudentBold } from "react-icons/pi";
import Cookies from "universal-cookie";
import { PlanDetails } from "@/types";
import { FormField } from "@/types";
import { showError, showSuccess } from "@/utilities/toastMessages";
import AddModal from "@/app/[locale]/components/genericTableComponent/genericAddModal";
import PlanSchema from "@/schemas/plan.schema";

export const planFormFields: FormField[] = [
  { name: "title", label: "Plan Title", type: "text" },
  {
    name: "sessionDuration",
    label: "Session Duration",
    type: "number",
    placeholder: "Enter session duration",
  },
  {
    name: "sessionsCount",
    label: "Sessions Count",
    type: "number",
    placeholder: "Enter sessions count",
  },
  {
    name: "sessionsPerWeek",
    label: "Sessions Per Week",
    type: "number",
    placeholder: "Enter sessions per week",
  },
  {
    name: "discount",
    label: "Discount",
    type: "number",
    placeholder: "Enter discount",
  },
  {
    name: "recommended",
    label: "Recommended",
    type: "select",
    options: ["true", "false"],
    placeholder: "Select Recommended",
  },
  {
    name: "planPrice",
    label: "Plan Price $",
    type: "number",
    placeholder: "Enter plan price",
  },
];

export default function AddPlanModal({
  openAssignModal,
  handleCloseModal,
  updateComponent,
}: {
  openAssignModal: boolean;
  handleCloseModal: () => void;
  updateComponent: () => void;
}) {
  const cookies = new Cookies();
  const toast = useRef<Toast>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const addPlan = (formData: any) => {
    let recommended = !!formData.recommended;

    const planData: PlanDetails = {
      ...formData,
      type: "standard",
      recommended,
    };
    setIsProcessing(true);
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/plan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify(planData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          showSuccess("Plan added successfully", toast);
          updateComponent();
        } else {
          let message;
          Array.isArray(data) ? (message = data[0].message) : data.message;
          console.log(Array.isArray(data));
          showError(`Error Adding plan: ${message}`, toast);
        }
        setIsProcessing(false);
      })
      .catch((err) => {
        console.log(err);
        showError(err.message ?? "Something went vert wrong!", toast);
        setIsProcessing(false);
      });
  };

  return (
    <>
      <Toast ref={toast} />
      <AddModal
        openModal={openAssignModal}
        closeModal={handleCloseModal}
        formFields={planFormFields}
        onSubmit={addPlan}
        modalHeader={"Add Plan"}
        isProcessing={isProcessing}
        schema={PlanSchema}
        addButtonText={"Add Plan"}
        icon={<PiStudentBold />}
      />
    </>
  );
}
