"use client";

import {
  CustomFlowbiteTheme,
  Label,
  Modal,
  Radio,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import LoadingButton from "../../admin/components/loadingButton";
import { FaRegFileLines } from "react-icons/fa6";

export enum GradeOptions {
  EXCELLENT = "excellent",
  GOOD = "good",
  VERY_GOOD = "very good",
  AVERAGE = "average",
  BELOW_AVERAGE = "below average",
}
export interface ReportsCourses {
  courseName: string;
  courseGrade: GradeOptions;
  courseComment?: GradeOptions;
}
interface FormData {
  [key: string]: any;
  sessionId: number;
  reportCourses: ReportsCourses[];
  comment?: string;
  grade?: GradeOptions;
  title: string;
}
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
  const [courses, setCourses] = useState<[]>([]);
  const [formData, setFormData] = useState<FormData>({
    sessionId: idSession,
    title: `Session ${idSession} Report`,
    reportCourses: [],
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const cookies = new Cookies();
  const toast = useRef<Toast>(null);

  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 5000,
    });
  };
  const showError = (message: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 5000,
    });
  };
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/course`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setCourses(res.data.map((course: any) => course.title));
        console.log("here in get courses", res.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [sessionID]);

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
  const handleCommentChange = (comment: string) => {
    setFormData({ ...formData, comment });
    console.log("in comment change", formData);
  };
  const handleTotalGradeChange = (grade: GradeOptions) => {
    setFormData({ ...formData, grade });
    console.log("in comment data", formData);
  };

  const handleCourseCommentChange = ({
    course,
    comment,
    grade,
  }: {
    course: string;
    comment?: string;
    grade?: string;
  }) => {
    const updatedCourse = {
      courseName: course,
      courseComment: comment,
      courseGrade: grade,
    };
    setFormData((prev: any) => {
      const existingCourse = prev.reportCourses.find(
        (c: ReportsCourses) => c.courseName === course,
      );

      if (existingCourse) {
        return {
          ...prev,
          reportCourses: prev.reportCourses.map((c: ReportsCourses) => {
            if (c.courseName === course) {
              return {
                ...c,
                courseComment: comment ? comment : c.courseComment,
                courseGrade: grade ? grade : c.courseGrade,
              };
            }
            return c;
          }),
        };
      } else {
        return {
          ...prev,
          reportCourses: [...prev.reportCourses, updatedCourse],
        };
      }
    });
    console.log("this is the form report in course", formData);
  };
  const modalTheme: CustomFlowbiteTheme["modal"] = {
    header: {
      base: "flex items-start justify-between rounded-t px-5 py-2 w-full",
      title: "w-full flex items-center gap-4 text-2xl font-semibold",
    },
  };
  const addReport = () => {
    setIsProcessing(true);
    if (courses && formData.reportCourses.length === 0) {
      showError("Please provide at least one course report.");
      setIsProcessing(false);
      return;
    }
    if (!formData.grade || !formData.comment) {
      showError("Please provide both total grade and comment.");
      setIsProcessing(false);
      return;
    }
    console.log("this is the payload", formData);
    setIsProcessing(false);
    return;
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          showSuccess(data.message);
          window.location.reload();
        } else {
          showError(data.message);
        }
        setIsProcessing(false);
      })
      .catch((err) => {
        console.log(err);
        showError(err.message);
        setIsProcessing(false);
      });
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
              readOnly={true}
            />
          </div>
          <h3 className="mb-3">Add the information of taken courses: </h3>
          <div id="checkbox" className="flex flex-col gap-4">
            {courses.map((course, index) => (
              <>
                <div className="mb-2 block" key={course}>
                  <div className="flex flex-col max-md:w-full w-[40%] justify-center items-start gap-3">
                    <label htmlFor={course} className="ml-2">
                      {course}:
                    </label>
                    <Select
                      name="courseGrade"
                      defaultValue={GradeOptions.AVERAGE}
                      onChange={(e: any) => {
                        handleCourseCommentChange({
                          course,
                          grade: e.target.value,
                        });
                      }}
                      className="w-full"
                    >
                      {Object.values(GradeOptions).map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <TextInput
                    id={`${course} Comment`}
                    placeholder={`${course} Comment`}
                    type="text"
                    className="my-2"
                    key={`course-${index}`}
                    onChange={(e) => {
                      handleCourseCommentChange({
                        course,
                        comment: e.target.value,
                      });
                    }}
                  />
                </div>
              </>
            ))}
          </div>
          <fieldset className="flex w-full flex-col gap-4" id="radio">
            <legend className="mb-4">Total session grade</legend>
            <div className={"flex flex-row gap-4"}>
              {Object.values(GradeOptions).map((grade) => (
                <div className="flex items-center gap-2" key={grade}>
                  <Label className="cursor-pointer" htmlFor={grade}>
                    <Radio
                      id={grade}
                      name="radio"
                      value={grade}
                      className="h-4 w-4"
                      onChange={(e: any) => {
                        handleTotalGradeChange(e.target.value);
                      }}
                    />
                    <span className="ml-2">{grade}</span>
                  </Label>
                </div>
              ))}
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
              onChange={(e) => handleCommentChange(e.target.value)}
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
