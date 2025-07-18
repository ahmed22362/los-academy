"use client";

import { BsTrash } from "react-icons/bs";
import { BiSolidEditAlt } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import EditTeacherModal from "./editTeacherModal";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";

export default function FetchTeacherData({
  teacherData,
  updateComponent,
}: {
  teacherData: any;
  updateComponent: () => void;
}) {
  const [handleModal, setHandleModal] = useState(false);
  const teacher = teacherData;
  const cookies = new Cookies();
  // Toast reference
  const [visible, setVisible] = useState(false);
  const toast = useRef<Toast>(null);
  const toastB = useRef<Toast>(null);
  const toastC = useRef<Toast>(null);
  const showError = (message: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };
  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: "success",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };

  const openModal = () => {
    setHandleModal(true);
  };

  const closeModal = () => {
    setHandleModal(false);
  };

  // Delete Confirmation
  const clear = () => {
    toastC.current?.clear();
    setVisible(false);
  };

  // Confirm Delete teacher
  const confirm = () => {
    if (!visible) {
      setVisible(true);
      toastC.current?.clear();
      toastC.current?.show({
        severity: "warn",
        sticky: true,
        content: (
          <div
            className="flex flex-column align-items-center"
            style={{ flex: "1" }}
          >
            <div className="flex flex-col">
              <div className="text-center">
                <i
                  className="pi pi-exclamation-triangle"
                  style={{ fontSize: "3rem" }}
                ></i>
                <div className="font-bold text-xl my-3">
                  Are you sure you want to delete?
                </div>
              </div>
              <div className="flex gap-4 items-center justify-center">
                <button
                  className="bg-danger-color hover:bg-red-400 transition-colors text-white px-5 py-2 rounded-xl"
                  onClick={() => {
                    confirmDelete();
                    clear();
                  }}
                >
                  Yes
                </button>
                <button
                  className="bg-primary-color hover:bg-blue-900 transition-colors text-white px-5 py-2 rounded-xl"
                  onClick={() => clear()}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        ),
      });
    }
  };

  const confirmDelete = () => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher/${teacher.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        updateComponent();
        // console.log(data)
        data.status === "success"
          ? showSuccess("Teacher Deleted Successfuly")
          : showError(`can't delete teacher somthing went wrong`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-row justify-between gap-4">
      <Toast ref={toast} />
      <BiSolidEditAlt
        className={"text-2xl cursor-pointer"}
        style={{ color: "green" }}
        onClick={openModal}
      />
      <BsTrash
        className={"text-2xl cursor-pointer"}
        style={{ color: "red" }}
        onClick={confirm}
      />
      <EditTeacherModal
        openAssignModal={handleModal}
        handleCloseModal={closeModal}
        teacherDetails={teacher}
        updateComponent={updateComponent}
      />
      <Toast ref={toastB} />
      <Toast ref={toastC} position="bottom-center" />
    </div>
  );
}
