"use client";

import { Dropdown, Modal } from "flowbite-react";
import Image from "next/image";
import { CustomFlowbiteTheme } from "flowbite-react";
import { SetStateAction, useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import LoadingButton from "../../admin/components/loadingButton";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { showError, showSuccess } from "@/utilities/toastMessages";

export default function TakeModal({
  openAssignModal,
  handleCloseModal,
  sessionReqId,
  user,
  updateComponent,
  api,
}: {
  openAssignModal: boolean;
  handleCloseModal: () => void;
  sessionReqId: number | string;
  user: string | any;
  updateComponent: () => void;
  api: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const cookies = new Cookies();
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (openAssignModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openAssignModal, handleCloseModal]);

  if (!openAssignModal) {
    return null;
  }

  const customTheme: CustomFlowbiteTheme["dropdown"] = {
    floating: {
      base: "w-fit",
      item: {
        base: "bg-white-color",
      },
      style: {
        light: "bg-white-color",
      },
    },

    inlineWrapper:
      "flex justify-between w-[260px] items-center px-5 py-3 rounded-full bg-white-color",
  };
  const modalTheme: CustomFlowbiteTheme["modal"] = {
    header: {
      base: "flex items-start justify-between rounded-t p-5 pb-1",
    },
  };

  const assignTeacher = () => {
    setIsProcessing(true);
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/${api}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify({
        sessionReqId: sessionReqId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          showSuccess(data.message, toast);
          updateComponent();
          router.refresh();
        } else {
          showError(data.message, toast);
          updateComponent();
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
      <Modal
        ref={modalRef}
        show={openAssignModal}
        onClose={handleCloseModal}
        size={"lg"}
      >
        <Modal.Header theme={modalTheme.header}>
          Take this Student :
        </Modal.Header>
        <Toast ref={toast} />
        <Modal.Body>
          <div className="flex items-center gap-5 mb-3">
            <Image
              src={"/vectors/feedback3.svg"}
              alt={"student"}
              width={50}
              height={50}
              style={{ width: "50px", height: "50px" }}
            />
            <span className="text-black-one-color ">Student Name: {user}</span>
          </div>

          <div className="flex justify-center items-center">
            <LoadingButton
              action={assignTeacher}
              customStyle={
                "text-white bg-secondary-color hover:bg-secondary-hover rounded-full py-2 px-5 transition-colors"
              }
              isProcessing={isProcessing}
              title={"Accept Student"}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
