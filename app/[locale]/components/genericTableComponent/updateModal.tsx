import React, { useRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import type { Value } from "react-multi-date-picker";
import {
  CustomFlowbiteTheme,
  Label,
  Modal,
  TextInput,
  Select,
  Radio,
} from "flowbite-react";
import LoadingButton from "../../admin/components/loadingButton";
import { FormField } from "@/types";
import Image from "next/image";
import DatePickerField from "../../admin/components/Calender/DatePickerField";

interface FormValues {
  [key: string]: string | number;
}

interface UpdateModalProps {
  openModal: boolean;
  closeModal: () => void;
  formFields: FormField[];
  onSubmit: (values: any) => void;
  modalHeader: string;
  isProcessing: boolean;
  icon?: React.ReactNode;
  updateButtonText: string;
  objectDetails: any;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  openModal,
  closeModal,
  formFields,
  onSubmit,
  modalHeader,
  isProcessing,
  icon,
  updateButtonText,
  objectDetails,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [datePickerValue, setDatePickerValue] = useState<Value>(
    objectDetails["sessionDate"] ?? null,
  );

  const handleDateChange = (value: Value) => {
    setDatePickerValue(value);
    setFieldValue("sessionDate", value);
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: formFields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: objectDetails[field.name] || "",
      }),
      {},
    ) as FormValues,
    onSubmit: (formValues) => {
      const filteredFormValues = Object.fromEntries(
        Object.entries(formValues).filter(([key, value]) => value !== ""),
      );
      onSubmit(filteredFormValues);
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
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
              handleSubmit();
            }}
            className="flex flex-col gap-4"
          >
            {formFields.map((field) => (
              <div key={field.name}>
                <div className="mb-2 block">
                  <Label htmlFor={field.name} value={field.label} />
                </div>
                {field.type === "select" ? (
                  <Select
                    className={`w-full rounded-lg focus:border-secondary-color border-2 ${
                      errors[field.name] && touched[field.name]
                        ? "border-danger-color"
                        : "border-gray-300"
                    }`}
                    id={field.name}
                    defaultValue={
                      typeof values[field.name] === "boolean"
                        ? `${values[field.name]}`
                        : values[field.name]
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option key={field.name} value={""}>
                      {`Select ${field.name}`}
                    </option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                ) : field.type === "radio" ? (
                  <div className="flex gap-4">
                    {field.options?.map((option) => (
                      <div key={option}>
                        <Label
                          htmlFor={`${field.name}_${option}`}
                          value={option}
                        />
                        <Radio
                          id={`${field.name}_${option}`}
                          name={field.name}
                          value={option}
                          checked={values[field.name] === option}
                          onChange={handleChange}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <TextInput
                    id={field.name}
                    placeholder={field.placeholder ?? field.label}
                    defaultValue={values[field.name]}
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
                title={updateButtonText}
                customStyle={
                  "text-white bg-secondary-color hover:bg-secondary-hover rounded-full py-2 px-5 transition-colors mt-5"
                }
                isProcessing={isProcessing}
              />
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateModal;
