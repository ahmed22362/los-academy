"use client";

import { Dropdown, Modal } from "flowbite-react";
import Image from "next/image";
import { CustomFlowbiteTheme } from "flowbite-react";
import { SetStateAction, useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { Toast } from "primereact/toast";
import LoadingButton from "./loadingButton";
import { showError, showSuccess } from "@/utilities/toastMessages";

export default function AssignModal({
  openAssignModal,
  handleCloseModal,
  sessionReqId,
  user,
  updateComponent,
}: {
  openAssignModal: boolean;
  handleCloseModal: () => void;
  sessionReqId: number | string;
  user: string | any;
  updateComponent: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const cookies = new Cookies();
  const [allTeacher, setAllTeacher] = useState([]);
  const [teacher, setTeacher] = useState("select teacher");
  const [teacherId, setTeacherId] = useState(null);
  const toast = useRef<Toast>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectTeacher = (selectedTeacherName: SetStateAction<string>) => {
    setTeacher(selectedTeacherName);
  };
  const selectTeacherId = (selectedTeacherId: any) => {
    setTeacherId(selectedTeacherId);
  };

  const getAllTeachers = () => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllTeacher(data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllTeachers();
  }, []);

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
      base: "flex items-start justify-between rounded-t p-5",
    },
  };

  const assignTeacher = () => {
    setIsProcessing(true);
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/assignTeacher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify({
        teacherId: teacherId,
        sessionReqId: sessionReqId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          showSuccess(data.message, toast);
          updateComponent();
        } else {
          showError(data.message, toast);
        }
        setIsProcessing(false);
      })
      .catch((err) => {
        console.log(err);
        showError(err.message, toast);
        setIsProcessing(false);
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
          Assign to this Student :
        </Modal.Header>
        <Toast ref={toast} />
        <Modal.Body>
          <div className="flex items-center gap-5  ">
            <Image
              src={"/vectors/feedback3.svg"}
              alt={"student"}
              width={25}
              height={25}
              className=""
              style={{ width: "50px", height: "50px" }}
            />
            <span className="text-black-one-color">Student Name: {user}</span>
          </div>
          <div className="flex flex-col my-5 gap-3">
            <h4 className="adminBoxTitle">This Teacher: </h4>
            <Dropdown label={teacher} theme={customTheme} inline>
              {allTeacher &&
                allTeacher.map((teacher: any, index: number) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => {
                      selectTeacher(teacher.name);
                      selectTeacherId(teacher.id);
                    }}
                  >
                    {teacher.name}
                  </Dropdown.Item>
                ))}
            </Dropdown>
          </div>
          <div className="flex justify-center items-center">
            <LoadingButton
              isProcessing={isProcessing}
              action={assignTeacher}
              customStyle="text-white bg-secondary-color hover:bg-secondary-hover rounded-full py-1 px-5 transition-colors"
              title="Assign"
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
