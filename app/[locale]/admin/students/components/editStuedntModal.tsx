// Assuming this component is a child component and it doesn't handle its own state management
import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import {
  CustomFlowbiteTheme,
  Label,
  Modal,
  Select,
  TextInput,
} from "flowbite-react";
import LoadingButton from "../../components/loadingButton";
import Cookies from "universal-cookie";
interface FormData {
  name: string;
  email: string;
  phone: string;
  availableFreeSession: string;
  age: string;
  password: string;
  remainSessions: string;
  gender: string;
  verified: string;
}
export default function EditStudentModal({
  openAssignModal,
  handleCloseModal,
  studentDetails,
  updateComponent,
}: {
  openAssignModal: boolean;
  handleCloseModal: () => void;
  studentDetails: any;
  updateComponent: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: studentDetails.name,
    email: studentDetails.email,
    phone: studentDetails.phone,
    availableFreeSession: studentDetails.role,
    age: studentDetails.sessionCost,
    password: "",
    remainSessions: studentDetails.remainSessions,
    gender: studentDetails.gender,
    verified: studentDetails.verified,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const cookies = new Cookies();
  const toast = useRef<Toast>(null);

  const showNotification = (
    severity: "success" | "info" | "warn" | "error" | undefined,
    summary: string,
    detail: string,
  ) => {
    toast.current?.show({
      severity,
      summary,
      detail,
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

  const modalTheme: CustomFlowbiteTheme["modal"] = {
    header: {
      base: "flex items-start justify-between rounded-t px-5 py-2",
    },
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const updateStudent = () => {
    const updatedData: { [key: string]: any } = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof FormData] !== studentDetails[key]) {
        updatedData[key] = formData[key as keyof FormData];
      }
    });

    if (Object.keys(updatedData).length === 0) {
      showNotification("error", "Error", "No data to update");
      return;
    }

    setIsProcessing(true);

    fetch(`${process.env.NEXT_PUBLIC_APIURL}/user/${studentDetails.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          showNotification("success", "Success", "Updated Successfully");
          const timer = setTimeout(() => {
            updateComponent();
            clearTimeout(timer);
          }, 4000);
        } else {
          showNotification(
            "error",
            "Error",
            "Update Failed. Make sure all fields are filled correctly",
          );
        }
        setIsProcessing(false);
      })
      .catch((err) => {
        console.log(err);
        showNotification("error", "Error", err.toString());
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
        Edit Student: {studentDetails.name}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <Toast ref={toast} />
          {[
            { label: "Student Name", key: "name", type: "text" },
            { label: "Student Email", key: "email", type: "email" },
            {
              label: "Student Gender",
              key: "gender",
              type: "select",
              options: ["", "male", "female"],
            },
            { label: "Student Phone", key: "phone", type: "tel" },
            {
              label: "Available Free Session",
              key: "availableFreeSession",
              type: "text",
            },
            { label: "Update Student Password", key: "password", type: "text" },
            { label: "Age", key: "age", type: "text" },
            { label: "Remain Sessions", key: "remainSessions", type: "text" },
            {
              label: "Verified",
              key: "verified",
              type: "select",
              options: ["", "true", "false"],
            },
          ].map((field) => (
            <div key={field.key}>
              <div className="mb-2 block">
                <Label htmlFor={field.key} value={field.label} />
              </div>
              {field.type === "select" ? (
                <Select
                  id={field.key}
                  value={formData[field.key as keyof FormData]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                >
                  <option value="">{field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              ) : (
                <TextInput
                  id={field.key}
                  defaultValue={studentDetails[field.key]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  type={field.type}
                  placeholder={field.label}
                />
              )}
            </div>
          ))}
          <div className="w-full">
            <LoadingButton
              title={"Save Changes"}
              action={updateStudent}
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
