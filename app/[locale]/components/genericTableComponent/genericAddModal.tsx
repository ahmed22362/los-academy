import React, { useRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  CustomFlowbiteTheme,
  FileInput,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import LoadingButton from "../../admin/components/loadingButton";
import { FormField, Student, Teacher } from "@/types";
import type { Value } from "react-multi-date-picker";
import DatePickerField from "../../admin/components/Calender/DatePickerField";
import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import { showError } from "@/utilities/toastMessages";
import { Toast } from "primereact/toast";

interface FormValues {
  [key: string]: string | number;
}
interface AddModalProps {
  openModal: boolean;
  closeModal: () => void;
  formFields: FormField[];
  onSubmit: (values: any) => void;
  modalHeader: string;
  isProcessing: boolean;
  schema: yup.Schema;
  icon?: React.ReactNode;
  addButtonText: string;
  students?: Student[];
  teachers?: Teacher[];
}

const AddModal: React.FC<AddModalProps> = ({
  openModal,
  closeModal,
  formFields,
  onSubmit,
  modalHeader,
  schema,
  isProcessing,
  icon,
  addButtonText,
  students,
  teachers,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [datePickerValue, setDatePickerValue] = useState<Value>(null);
  const toast = useRef<Toast>(null);
  const handleDateChange = (value: Value) => {
    setDatePickerValue(value);
    setFieldValue("sessionDates", value);
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    isValid,
  } = useFormik({
    initialValues: formFields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.type === "file" ? null : "",
      }),
      {},
    ) as FormValues,
    onSubmit: (formValues) => {
      onSubmit(formValues);
    },
    validationSchema: schema,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      setDatePickerValue(null);
      resetForm();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal, closeModal]);

  const modalTheme: CustomFlowbiteTheme["modal"] = {
    header: {
      base: "flex items-start justify-between rounded-t px-5 py-2 w-full",
      title: "w-full flex items-center gap-4 text-2xl font-semibold",
    },
  };

  return (
    <>
      <Toast ref={toast} />
      <Modal ref={modalRef} show={openModal} onClose={closeModal} size={"3xl"}>
        <Modal.Header theme={modalTheme.header}>
          {modalHeader}
          {icon}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
                if (!isValid) {
                  showError("please complete all fields", toast);
                }
              }}
              className="flex flex-col gap-4"
            >
              {formFields.map((field) => (
                <div key={field.name}>
                  <div className="mb-2 block">
                    <Label htmlFor={field.name} value={field.label} />
                  </div>
                  {field.type === "select" ? (
                    <select
                      className={`w-full rounded-lg focus:border-secondary-color border-2 ${
                        errors.role && touched.role
                          ? "border-danger-color"
                          : "border-gray-300"
                      }`}
                      id={field.name}
                      value={values[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option key={field.name} value={""}>
                        {`Select ${field.name}`}
                      </option>

                      {students && field.name === "userId"
                        ? students?.map((student) => (
                            <option key={student.id} value={student.id}>
                              {`${student.name} - ${student.email}`}
                            </option>
                          ))
                        : teachers && field.name === "teacherId"
                        ? teachers?.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                              {`${teacher.name} - ${teacher.email}`}
                            </option>
                          ))
                        : field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                    </select>
                  ) : field.type === "file" ? (
                    <div id={field.name} className="max-w-md">
                      <FileInput
                        id={field.name}
                        helperText="Accepted PDF files only"
                        onChange={(e: any) => {
                          const file = e.target.files[0];
                          setFieldValue(field.name, file);
                        }}
                      />
                    </div>
                  ) : (
                    <TextInput
                      id={field.name}
                      placeholder={field.placeholder ?? field.label}
                      value={values[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type={field.type}
                    />
                  )}
                  {errors[field.name] && touched[field.name] && (
                    <span className="text-danger-color">
                      {errors[field.name]}
                    </span>
                  )}
                  {field.type === "datepicker" && (
                    <div className="m-2">
                      <div className="flex items-center">
                        <div className="cursor-pointer">Choose Dates</div>
                        <div className="relative w-4 h-4">
                          <Image
                            src="/vectors/ArrowRight.svg"
                            alt="Arrow Right 90 degree"
                            width={10}
                            height={10}
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <DatePickerField
                        value={datePickerValue}
                        onChange={handleDateChange}
                        error={errors[field.name]}
                        touched={touched[field.name]}
                      />
                    </div>
                  )}
                </div>
              ))}
              <div className="w-full">
                <LoadingButton
                  title={addButtonText}
                  customStyle={
                    "text-white bg-secondary-color hover:bg-secondary-hover rounded-full py-2 px-5 transition-colors mt-5"
                  }
                  isProcessing={isProcessing}
                  action={() => {
                    // console.log(
                    //   "is is valid?",
                    //   isValid,
                    //   "this is values",
                    //   values,
                    // );
                    // if (isValid) {
                    //   onSubmit(values);
                    // }
                  }}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddModal;
