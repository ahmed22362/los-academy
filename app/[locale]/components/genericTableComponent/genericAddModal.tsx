import React, { useRef, useEffect } from "react";
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
import { FormField } from "@/types";

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
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
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
              handleSubmit(e);
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
                    {field.options?.map((option) => (
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
              </div>
            ))}
            <div className="w-full">
              <LoadingButton
                title={addButtonText}
                customStyle={
                  "text-white bg-secondary-color hover:bg-secondary-hover rounded-full py-2 px-5 transition-colors mt-5"
                }
                isProcessing={isProcessing}
                action={() => onSubmit(values)}
              />
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
