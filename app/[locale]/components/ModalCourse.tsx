"use client";

import { CustomFlowbiteTheme, Modal } from "flowbite-react";
import { useRef, useEffect, FC } from "react";
import PrimaryButton from "./PrimaryButton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

interface CourseDetails {
  title: string;
  description: string;
  details: string;
}

interface ModalCourseProps {
  handleOpen: string;
  handleCloseModal: () => void;
  courseDetails: CourseDetails;
}

const ModalCourse: FC<ModalCourseProps> = ({
  handleOpen,
  handleCloseModal,
  courseDetails,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const course = courseDetails && courseDetails;
  const router = useRouter();

  const customTheme: CustomFlowbiteTheme["modal"] = {
    body: {
      base: "p-4 flex-1 overflow-auto min-h-[500px]",
    },
    header: {
      base: "flex items-start justify-between rounded-t border-none",
    },
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleCloseModal();
      }
    };

    if (handleOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleOpen, handleCloseModal]);

  if (!handleOpen) {
    return null;
  }

  return (
    <>
      <Modal ref={modalRef} show={true} onClose={handleCloseModal} size={"5xl"}>
        <Modal.Header theme={customTheme.header}></Modal.Header>
        <Modal.Body theme={customTheme.body}>
          <div className="flex flex-col lg:flex-row">
            {/* First Column */}
            <div className="w-full lg:w-2/3 pr-8">
              <div className="flex justify-between items-center px-4">
                <h2 className="text-black-color-one text-3xl font-bold mb-6 underline">
                  {course.title}
                </h2>
                <div className="flex items-center justify-center bg-white-color w-[80px] h-[80px] rounded-full">
                  <Image
                    src={"/vectors/courses.png"}
                    alt="course image"
                    width={50}
                    height={50}
                    loading={"lazy"}
                    className={"w-auto h-auto"}
                  />
                </div>
              </div>
              <div
                className="px-4 text-black-color-two text-md font-normal capitalize leading-7"
                dangerouslySetInnerHTML={{ __html: course.details }}
              ></div>
            </div>
            {/* Second Column */}
            <div className="w-full lg:w-1/3 px-4 flex flex-col items-center gap-4 pt-24">
              <h3 className="text-md text-black-color-two font-bold">
                Each Package Includes
              </h3>
              <ul className="text-md text-black-color-two font-normal list-none pl-4">
                {[
                  "Get 1 free trial class for any course",
                  "Get a certificate after completing course",
                  "Safe learning environment for you and kids",
                  "One-to-One Live Sessions",
                  "Professional & Qualified",
                ].map((item, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <FaCheckCircle
                      className="text-secondary-color mr-2"
                      size={20}
                    />{" "}
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col items-center">
                <PrimaryButton
                  text={"Start Free Trial"}
                  onClick={() => {
                    router.push("/login");
                  }}
                  ourStyle={
                    "bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors \
                    text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] py-2.5 px-12 shadow rounded-full w-fit"
                  }
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCourse;
