"use client";
import { CustomFlowbiteTheme, Dropdown } from "flowbite-react";
import { useState } from "react";
import AddPlanModal from "./addPlanModal";
import GenericComboBox from "@/app/[locale]/components/genericTableComponent/genericSearchBox.component";

export default function PlanComboBox({ ...props }: any) {
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
            Add Plan +
          </button>
          <AddPlanModal
            openAssignModal={handleModal}
            handleCloseModal={closeModal}
            updateComponent={props.updateComponent}
          />
        </div>
      }
    />
  );
}
