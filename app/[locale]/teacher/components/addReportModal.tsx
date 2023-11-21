"use client";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import {
  CustomFlowbiteTheme,
  Label,
  Modal,
  Radio,
  TextInput,
  Textarea,
} from "flowbite-react";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import LoadingButton from "../../admin/components/loadingButton";
import { useRouter } from "next/navigation";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { FaRegFileLines } from "react-icons/fa6";

export default function AddReportModal({
  openAssignModal,
  handleCloseModal,
  sessionID,
}: {
  sessionID?: any;
  openAssignModal: boolean;
  handleCloseModal: () => void;
}) {
  const idSession = sessionID && sessionID;
  const modalRef = useRef<HTMLDivElement>(null);

  const [id, setId] = useState(idSession);
  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState("");
  const [comment, setComment] = useState("");
  const [arabicComment, setArabicComment] = useState("");
  const [quranComment, setQuranComment] = useState("");
  const [islamicComment, setIslamicComment] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);

  const onSubjectsChange = (e: CheckboxChangeEvent) => {
    let _subjects = [...subjects];

    if (e.checked) _subjects.push(e.value);
    else _subjects.splice(_subjects.indexOf(e.value), 1);

    setSubjects(_subjects);
  };

  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const cookies = new Cookies();
  const toast = useRef<Toast>(null);

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Add Success",
      life: 3000,
    });
  };
  const showError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: "Add failed make sure all fields are correct",
      life: 4000,
    });
  };

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

  const modalTheme: CustomFlowbiteTheme["modal"] = {
    header: {
      base: "flex items-start justify-between rounded-t px-5 py-2 w-full",
      title: "w-full flex items-center gap-4 text-2xl font-semibold",
    },
  };

  const addReport = () => {
    console.log({
      sessionId: parseInt(id),
      comment: comment,
      grade: grade,
      title: title,
      subjects,
      arabicComment,
      quranComment,
      islamicComment
    });
    // setIsProcessing(true);
    // fetch(`${process.env.NEXT_PUBLIC_APIURL}/report`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${cookies.get("token")}`,
    //   },
    //   // body: JSON.stringify({
    //   //     sessionId: parseInt(id),
    //   //     arabic,
    //   //     arabicComment,
    //   //     quran,
    //   //     quranComment,
    //   //     islamic,
    //   //     islamicComment,
    //   //     comment: comment,
    //   //     grade:  grade,
    //   //     title:  title
    //   // }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.status === "success") {
    //       showSuccess();
    //       router.refresh();
    //     } else {
    //       showError();
    //     }
    //     setIsProcessing(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <Modal
      ref={modalRef}
      show={openAssignModal}
      onClose={handleCloseModal}
      size={"3xl"}
    >
      <Modal.Header theme={modalTheme.header}>
        Add Report <FaRegFileLines />
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <Toast ref={toast} />
          <div>
            <div className="mb-2 block">
              <Label htmlFor="id" value="Session ID" />
            </div>
            <TextInput
              id="id"
              defaultValue={id}
              onChange={(e) => setId(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Report Title" />
            </div>
            <TextInput
              id="title"
              placeholder="Report Title"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </div>
          <h3 className="mb-3">Select Subject: </h3>
          <div id="checkbox" className="flex flex-col gap-4">
            <div className="mb-2 block">
              <div className="flex items-center gap-2">
                <div className="card flex justify-content-center border-[2px] border-gray-300 rounded-[25%] p-[0px]">
                  <Checkbox
                    inputId="arabic"
                    name="subject"
                    value="arabic"
                    onChange={onSubjectsChange}
                    checked={subjects.includes("arabic")}
                  />
                </div>
                <label htmlFor="arabic" className="ml-2">
                  Arabic
                </label>
              </div>
              <TextInput
                id="arabicComment"
                placeholder="Arabic Comment"
                type="text"
                className="my-2"
                onChange={(e) => setArabicComment(e.target.value)}
              />
            </div>
            <div className="mb-2 block">
              <div className="flex items-center gap-2">
                <div className="card flex justify-content-center border-[2px] border-gray-300 rounded-[25%] p-[0px]">
                  <Checkbox
                    inputId="quran"
                    name="subject"
                    value="quran"
                    onChange={onSubjectsChange}
                    checked={subjects.includes("quran")}
                  />
                </div>
                <label htmlFor="quran" className="ml-2">
                  Quran
                </label>
              </div>
              <TextInput
                id="quranComment"
                placeholder="Quran Comment"
                type="text"
                className="my-2"
                onChange={(e) => setQuranComment(e.target.value)}
              />
            </div>
            <div className="mb-2 block">
              <div className="flex items-center gap-2">
                <div className="card flex justify-content-center border-[2px] border-gray-300 rounded-[25%] p-[0px]">
                  <Checkbox
                    id="islamic"
                    inputId="islamic"
                    name="subject"
                    value="islamic"
                    onChange={onSubjectsChange}
                    checked={subjects.includes("islamic")}
                  />
                </div>
                <label htmlFor="quran" className="ml-2">
                  Islamic
                </label>
              </div>
              <TextInput
                id="islamicComment"
                placeholder="Islamic Comment"
                type="text"
                className="my-2"
                onChange={(e) => setIslamicComment(e.target.value)}
              />
            </div>
          </div>
          <fieldset className="flex max-w-md flex-col gap-4" id="radio">
            <legend className="mb-4">Grade</legend>
            <div className={"flex flex-row gap-4"}>
              <div className="flex items-center gap-2">
                <Label className="cursor-pointer" htmlFor="excellent">
                  <Radio
                    id="excellent"
                    name="radio"
                    value="excellent"
                    className="h-4 w-4"
                    onClick={(e: any) => {
                      setGrade(e.target.value);
                    }}
                  />
                  <span className="ml-2">Excellent</span>
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Label className="cursor-pointer" htmlFor="Good">
                  <Radio
                    id="Good"
                    name="radio"
                    value="good"
                    className="h-4 w-4"
                    onClick={(e: any) => {
                      setGrade(e.target.value);
                    }}
                  />
                  <span className="ml-2">Good</span>
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Label className="cursor-pointer" htmlFor="Average">
                  <Radio
                    id="Average"
                    name="radio"
                    value="average"
                    className="h-4 w-4"
                    onClick={(e: any) => {
                      setGrade(e.target.value);
                    }}
                  />
                  <span className="ml-2">Average</span>
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Label className="cursor-pointer" htmlFor="Below Average">
                  <Radio
                    id="Below Average"
                    name="radio"
                    value="below average"
                    className="h-4 w-4"
                    onClick={(e: any) => {
                      setGrade(e.target.value);
                    }}
                  />
                  <span className="ml-2">Below Average</span>
                </Label>
              </div>
            </div>
          </fieldset>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="comment" value="Your message" />
            </div>
            <Textarea
              id="comment"
              placeholder="Leave a comment..."
              required
              rows={4}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="w-full">
            <LoadingButton
              title={"Add Report"}
              action={addReport}
              customStyle={
                "text-white bg-secondary-color hover:bg-secondary-hover rounded-full py-2 px-5 transition-colors"
              }
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
