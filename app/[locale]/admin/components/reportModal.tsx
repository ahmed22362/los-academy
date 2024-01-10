"use client";

import { convertDateTimeZone } from "@/utilities";
import { CustomFlowbiteTheme, Modal } from "flowbite-react";
import jsPDF from "jspdf";
import Image from "next/image";

import { useEffect, useRef } from "react";

export default function ReportModal({
  openAssignModal,
  handleCloseModal,
  details,
}: {
  openAssignModal: boolean;
  handleCloseModal: () => void;
  details: string | any;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const reportDetails = details && details;

  const downloadPdf = async () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const capture: any = document.getElementById("reportModal");
    pdf.html(capture).then(() => {
      pdf.save("report.pdf");
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
      base: "flex items-start justify-between rounded-t px-5 py-2",
    },
  };

  return (
    <>
      <Modal
        ref={modalRef}
        show={openAssignModal}
        onClose={handleCloseModal}
        size={"3xl"}
      >
        <Modal.Header theme={modalTheme.header}></Modal.Header>
        <Modal.Body>
          <div
            id="reportModal"
            className="flex flex-col items-start justify-center gap-3 px-4 mt-5"
          >
            <div className="flex flex-col-reverse">
              <h3 className="mt-10 text-black-color-one text-center font-semibold text-md">
                Report Details :
              </h3>
              <div className="flex flex-col justify-center items-center gap-1">
                <Image
                  src={"/logo.png"}
                  width={50}
                  height={50}
                  loading={"lazy"}
                  alt={"report logo"}
                />
                <span className="text-black-color-one font-bold text-sm">
                  LOS Academy
                </span>
              </div>
            </div>

            <hr
              style={{ width: "70%", height: "2px", backgroundColor: "black" }}
            />
            <h3 className="text-black-color-one text-center font-semibold text-md">
              Courses Grades :
            </h3>
            <ul className="ps-5 capitalize flex flex-col items-start justify-center gap-2">
              {reportDetails.arabic === null || reportDetails.arabic === "" ? (
                ""
              ) : (
                <li>
                  Arabic: <span className="ps-3 ">{reportDetails.arabic}</span>
                </li>
              )}
              {reportDetails.arabicComment === null ||
              reportDetails.arabicComment === "" ? (
                ""
              ) : (
                <li>
                  Arabic Comment:{" "}
                  <span className="ps-3 ">
                    <q>{reportDetails.arabicComment}</q>
                  </span>
                </li>
              )}
              {reportDetails.islamic === null ||
              reportDetails.islamic === "" ? (
                ""
              ) : (
                <li>
                  Islamic:{" "}
                  <span className="ps-3 ">{reportDetails.islamic}</span>
                </li>
              )}
              {reportDetails.islamicComment === null ||
              reportDetails.islamicComment === "" ? (
                ""
              ) : (
                <li>
                  Islamic Comment:{" "}
                  <span className="ps-3 ">
                    <q>{reportDetails.islamicComment}</q>
                  </span>
                </li>
              )}
              {reportDetails.quran === null || reportDetails.quran === "" ? (
                ""
              ) : (
                <li>
                  Quran: <span className="ps-3 ">{reportDetails.quran}</span>
                </li>
              )}
              {reportDetails.quranComment === null ||
              reportDetails.quranComment === "" ? (
                ""
              ) : (
                <li>
                  Quran Comment:{" "}
                  <span className="ps-3 ">
                    <q>{reportDetails.quranComment}</q>
                  </span>
                </li>
              )}
            </ul>
            <p className="flex flex-col  w-[500px]">
              <b>Teacher Comment:</b>
              <q className="ps-5 pe-5 pt-3 text-sm font-bold italic leading-6">
                {" "}
                {reportDetails.comment}{" "}
              </q>
            </p>

            <hr
              style={{ width: "70%", height: "2px", backgroundColor: "black" }}
            />
            <h3 className="text-black-color-one text-center font-semibold text-md">
              Total Grade:{" "}
              <span
                className={`${
                  reportDetails.grade === "exellent" ||
                  reportDetails.grade === "good"
                    ? "text-success-color"
                    : reportDetails.grade === "average"
                    ? "text-warning-color"
                    : "text-danger-color"
                } capitalize italic ps-3`}
              >
                {reportDetails.grade}
              </span>
            </h3>

            <div>
              <h6 className="pb-1 text-black-color-one font-semibold">
                Session Info
              </h6>
              <ul className="ps-5">
                <li>Session ID: {reportDetails.sessionId}</li>
                <li>
                  Session Date:{" "}
                  {convertDateTimeZone(
                    reportDetails.session.sessionDate,
                    "UTC",
                    Intl.DateTimeFormat().resolvedOptions().timeZone,
                    "D-MMM-YYYY",
                  )}
                </li>
                <li>
                  Create at:{" "}
                  {convertDateTimeZone(
                    reportDetails.createdAt,
                    "UTC",
                    Intl.DateTimeFormat().resolvedOptions().timeZone,
                    "D-MMM-YYYY",
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              className="text-white bg-success-color hover:bg-green-300 rounded-full py-2 px-5 transition-colors"
              onClick={downloadPdf}
            >
              Download as pdf
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
