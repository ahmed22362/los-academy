"use client";
import GenericComboBox from "@/app/[locale]/components/genericTableComponent/genericSearchBox.component";
import { useState } from "react";
import AddPayoutModal from "./addPayoutModal";
import { Teacher } from "@/types";

export default function PayOutComboBox({
  updateComponent,
  teachers,
}: {
  updateComponent: () => void;
  teachers: Teacher[];
}) {
  const [handleModal, setHandleModal] = useState(false);

  const openModal = () => {
    setHandleModal(true);
  };
  const closeModal = () => {
    setHandleModal(false);
  };
  return (
    <GenericComboBox
      AdditionalComponent={
        <div
          className={"flex flex-row justify-between items-center gap-5 my-3"}
        >
          <button
            onClick={openModal}
            className={
              "bg-white hover:bg-gray-100 transition-colors text-black-color-one px-5 py-2 rounded-[16px] font-normal"
            }
          >
            Add Payout +
          </button>
          <AddPayoutModal
            openAssignModal={handleModal}
            handleCloseModal={closeModal}
            updateComponent={updateComponent}
            teachers={teachers}
          />
        </div>
      }
    />
  );
}
