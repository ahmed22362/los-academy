import { BsTrash } from "react-icons/bs";
import { BiSolidEditAlt } from "react-icons/bi";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import { Session } from "@/types";
import { showError, showSuccess } from "@/utilities/toastMessages";
import EditSessionModal from "./EditSessionModal";

export default function SessionOptions({
  sessionData,
  updateComponent,
}: {
  sessionData: Session;
  updateComponent: () => void;
}) {
  const [handleModal, setHandleModal] = useState(false);
  const session = sessionData;
  // Toast reference
  const [visible, setVisible] = useState(false);
  const toast = useRef<Toast>(null);
  const toastC = useRef<Toast>(null);
  const cookies = new Cookies();

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

  // Confirm Delete Student
  const confirm = () => {
    setVisible(true);
    toastC.current?.clear();
    toastC.current?.show({
      severity: "warn",
      sticky: true,
      content: (
        <span
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
        </span>
      ),
    });
  };

  const confirmDelete = () => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/${session.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          showSuccess(data.message, toast);
          updateComponent();
        } else {
          showError(data.message, toast);
        }
        setTimeout(() => {
          closeModal();
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        showError(err, toast);
      });
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="flex flex-row justify-between gap-4 sm:gap-10">
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
        <EditSessionModal
          openAssignModal={handleModal}
          handleCloseModal={closeModal}
          sessionDetails={session}
          updateComponent={updateComponent}
        />
        <Toast ref={toastC} position="bottom-center" />
      </div>
    </>
  );
}
