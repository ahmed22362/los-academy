"use client";

import { useState } from "react";
import GenericComboBox from "../../continuity-status/components/GenericSearchBox";
import AddSessionModal from "./AddSessionModal";
import { Student, Teacher } from "@/types";

export default function SessionComboBox({
  updateComponent,
  students,
  teachers,
}: {
  updateComponent: () => void;
  students: Student[];
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
            Add Session +
          </button>
          <AddSessionModal
            openAssignModal={handleModal}
            handleCloseModal={closeModal}
            updateComponent={updateComponent}
            students={students}
            teachers={teachers}
          />
        </div>
      }
    />
  );
}
