import { useState, useRef, useEffect, RefObject } from "react";
import { Toast } from "primereact/toast";
import { signupSchema } from "@/schemas";
import Cookies from "universal-cookie";
import AddModal from "@/app/[locale]/components/genericTableComponent/genericAddModal";
import { showError, showSuccess } from "@/utilities/toastMessages";
import { FormField } from "@/types";
import { PiStudentBold } from "react-icons/pi";

const formFields: FormField[] = [
  { name: "name", label: "Student Name", type: "text" },
  { name: "email", label: "Student Email", type: "email" },
  {
    name: "gender",
    label: "Student Gender",
    type: "select",
    options: ["male", "female"],
  },
  { name: "phone", label: "Student Phone", type: "tel" },
  { name: "password", label: "Password", type: "text" },
  {
    name: "passwordConfirmation",
    label: "Password Confirmation",
    type: "text",
  },
  { name: "age", label: "Age", type: "number" },
];

export default function AddStudentModal({
  openAssignModal,
  handleCloseModal,
  updateComponent,
}: {
  openAssignModal: boolean;
  handleCloseModal: () => void;
  updateComponent: () => void;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useRef<Toast>(null);

  const cookies = new Cookies();

  const addStudent = (formData: any) => {
    setIsProcessing(true);

    fetch(`${process.env.NEXT_PUBLIC_APIURL}/user`, {
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
          showSuccess("student added successfully!", toast);
          const timeToClose = setTimeout(() => {
            handleCloseModal();
          }, 2000);
          updateComponent();
          return () => clearTimeout(timeToClose);
        } else {
          showError(`Add student failed. ${data.message}`, toast);
        }
        setIsProcessing(false);
      })
      .catch((err): void => {
        showError(`Add student failed. ${err.message}`, toast);
        console.log(err);
        setIsProcessing(false);
      });
  };

  if (!openAssignModal) {
    return null;
  }

  return (
    <>
      <Toast ref={toast} />
      <AddModal
        openModal={openAssignModal}
        closeModal={handleCloseModal}
        formFields={formFields}
        onSubmit={addStudent} // Pass your existing addStudent function
        modalHeader="Add Student"
        schema={signupSchema}
        isProcessing={isProcessing}
        icon={<PiStudentBold />}
        addButtonText={"Add Student"}
      />
    </>
  );
}
