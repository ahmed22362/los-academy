"use client";
import { CustomFlowbiteTheme, Dropdown } from "flowbite-react";
import { useState } from "react";
import AddMonthlyReport from "./addMonthlyReport";
import GenericComboBox from "@/app/[locale]/components/genericTableComponent/genericSearchBox.component";
import { Student } from "@/types";

export default function MonthlyReportCombBox({
  updateComponent,
  students,
}: {
  updateComponent: () => void;
  students: Student[];
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
            Add Report +
          </button>
          <AddMonthlyReport
            openReportModal={handleModal}
            handleCloseModal={closeModal}
            updateComponent={updateComponent}
            allStudents={students}
          />
        </div>
      }
    />
  );
}
