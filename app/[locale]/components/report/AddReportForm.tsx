import React, { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import LoadingButton from "../../admin/components/loadingButton";
import {
  CustomFlowbiteTheme,
  Label,
  Modal,
  Radio,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import {
  GradeOptions,
  ReportsCourses,
} from "../../teacher/components/reoprt/addReportModal";
import { FaRegFileLines } from "react-icons/fa6";
import { Student } from "@/types";

const modalTheme: CustomFlowbiteTheme["modal"] = {
  header: {
    base: "flex items-start justify-between rounded-t px-5 py-2 w-full",
    title: "w-full flex items-center gap-4 text-2xl font-semibold",
  },
};
interface AddReportFormProps {
  openAssignModal: boolean;
  handleCloseModal: () => void;
  courses: string[];
  onAddReport?: (formData: any) => void;
  modalHeader: string;
  isProcessing: boolean;
  sessionId?: number;
  monthlyReport?: boolean;
  students?: Student[];
  isEditMode?: boolean;
  onEditReport?: (formData: any) => void;
  initialData?: any;
}
const AddReportForm: React.FC<AddReportFormProps> = ({
  openAssignModal,
  handleCloseModal,
  courses,
  onAddReport,
  modalHeader,
  isProcessing,
  sessionId,
  monthlyReport,
  students,
  initialData,
  isEditMode,
  onEditReport,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<any>({
    reportCourses: [],
    ...initialData,
  });

  const toast = useRef<Toast>(null);

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

  const handleCommentChange = (comment: string) => {
    setFormData({ ...formData, comment });
  };

  const handleTotalGradeChange = (grade: GradeOptions) => {
    setFormData({ ...formData, grade });
  };
  const handleUserIdChange = (userId: string) => {
    setFormData({ ...formData, userId });
  };

  const handleCourseCommentChange = ({
    course,
    comment,
    grade,
  }: {
    course: string;
    comment?: string;
    grade?: GradeOptions;
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
  };
  const handleSubmit = (formData: any) => {
    if (isEditMode && onEditReport) {
      onEditReport!(formData);
    } else if (onAddReport) {
      sessionId
        ? (formData.title = `Report ${sessionId}`)
        : `Report ${formData.sessionId}`;
      onAddReport(formData);
    } else {
      console.error("There is no handled submit function in add report form!");
    }
  };
  return (
    <Modal
      ref={modalRef}
      show={openAssignModal}
      onClose={handleCloseModal}
      size={"3xl"}
    >
      <Modal.Header theme={modalTheme.header}>
        {modalHeader} <FaRegFileLines />
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <Toast ref={toast} />
          {sessionId && (
            <div>
              <div className="mb-2 block">
                <Label htmlFor="id" value="Session ID" />
              </div>
              <TextInput id="id" defaultValue={sessionId} type="text" />
            </div>
          )}
          {monthlyReport && (
            <div>
              <div className="mb-2 block">
                <Label htmlFor="id" value="Select User" />
              </div>
              <Select
                id="id"
                defaultValue={isEditMode ? initialData?.userId : ""}
                onChange={(e) => handleUserIdChange(e.target.value)}
                className="w-full"
              >
                <option value="">Select User</option>
                {students &&
                  students.map((student: any, index: number) => {
                    return (
                      <option key={index} value={student.id}>
                        {student.name} - {student.email}
                      </option>
                    );
                  })}
              </Select>
            </div>
          )}
          <h3 className="mb-3">Add the information of taken courses: </h3>
          <div id="checkbox" className="flex flex-col gap-4">
            {courses.map((course, index) => (
              <div className="mb-2 block" key={index}>
                <div className="flex flex-col max-md:w-full w-[40%] justify-center items-start gap-3">
                  <label htmlFor={course} className="ml-2">
                    {course}:
                  </label>
                  <Select
                    name="courseGrade"
                    defaultValue={
                      isEditMode
                        ? initialData?.reportCourses[index]?.courseGrade
                        : GradeOptions.AVERAGE
                    }
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
                  defaultValue={
                    isEditMode
                      ? initialData?.reportCourses[index]?.courseComment || ""
                      : ""
                  }
                  onChange={(e) => {
                    handleCourseCommentChange({
                      course,
                      comment: e.target.value,
                    });
                  }}
                />
              </div>
            ))}
          </div>
          <fieldset className="flex w-full flex-col gap-4" id="radio">
            <legend className="mb-4">
              Total {monthlyReport ? "Month" : "session"} grade
            </legend>
            <div className={"flex flex-row gap-4"}>
              {Object.values(GradeOptions).map((grade) => (
                <div className="flex items-center gap-2" key={grade}>
                  <Label className="cursor-pointer" htmlFor={grade}>
                    <Radio
                      id={grade}
                      name="radio"
                      onChange={(e: any) => {
                        handleTotalGradeChange(e.target.value);
                      }}
                      value={grade}
                      className="h-4 w-4"
                      defaultChecked={
                        isEditMode && initialData?.grade === grade
                      }
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
              defaultValue={isEditMode ? initialData.comment : ""}
            />
          </div>
          <div className="w-full">
            <LoadingButton
              title={isEditMode ? "Update Report" : "Add Report"}
              isProcessing={isProcessing}
              action={() => handleSubmit(formData)}
              customStyle={
                "text-white bg-secondary-color hover:bg-secondary-hover rounded-full py-2 px-5 transition-colors"
              }
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddReportForm;
