"use client";

import { AiOutlineFileText } from "react-icons/ai";
import { useRef, useState } from "react";
import { BiTrash } from "react-icons/bi";
import Cookies from "universal-cookie";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { convertDateTimeZone } from "@/utilities";
import ReportModal from "../../../teacher/components/reoprt/reportModal";
import { UserRole } from "@/types";
import { showError } from "@/utilities/toastMessages";

export default function ReportData({ data }: { data: any }) {
  const report = data && data;
  const convertDate = convertDateTimeZone;
  const [selectedReport, setSelectedReport]: any = useState(false);
  const cookies = new Cookies();
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const toastB = useRef<Toast>(null);
  const toastC = useRef<Toast>(null);

  const handleOpen = () => {
    setSelectedReport(true);
  };
  const handleCloseModal = () => {
    setSelectedReport(false);
  };

  // Delete Confirmation
  const clear = () => {
    toastC.current?.clear();
    setVisible(false);
  };

  // Confirm Delete report

  const confirm = () => {
    if (!visible) {
      setVisible(true);
      toastC.current?.clear();
      toastC.current?.show({
        severity: "warn",
        sticky: true,
        content: (
          <div
            className="flex flex-column align-items-center"
            style={{ flex: "1" }}
          >
            <div className="flex flex-col">
              <div className="text-center">
                <i
                  className="pi pi-exclamation-triangle"
                  style={{ fontSize: "3rem" }}
                ></i>
                <div className="font-bold text-xl my-3">
                  Are you sure you want to delete?
                </div>
              </div>
              <div className="flex gap-4 items-center justify-center">
                <button
                  className="bg-danger-color hover:bg-red-400 transition-colors text-white px-5 py-2 rounded-xl"
                  onClick={() => {
                    confirmDelete();
                    clear();
                  }}
                >
                  Yes
                </button>
                <button
                  className="bg-primary-color hover:bg-blue-900 transition-colors text-white px-5 py-2 rounded-xl"
                  onClick={() => clear()}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        ),
      });
    }
  };

  const confirmDelete = () => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/report/${report.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          showError(data.message, toast);
          const timer = setTimeout(() => {
            router.refresh();
            clearTimeout(timer);
          }, 3000);
        } else {
          showError(data.message, toast);
        }
      })
      .catch((err) => {
        console.log(err);
        showError(err, toast);
      });
  };

  return (
    <div
      className={
        "bg-white-color px-10 py-5 rounded-[16px] flex justify-between items-center w-full my-4 flex-wrap"
      }
    >
      <div className={"flex items-center justify-center gap-5"}>
        <AiOutlineFileText className={"text-[26px]"} />
        <div className={"flex flex-col gap-2"}>
          <p className={"font-semibold text-base"}>{`Report ID ${
            report.id
          } (${convertDate(
            report.createdAt,
            "UTC",
            Intl.DateTimeFormat().resolvedOptions().timeZone,
            "D-MMM-YYYY",
          )})`}</p>
          <span>{report.title}</span>
        </div>
      </div>
      <div className={"flex gap-5 items-center"}>
        <Toast ref={toast} />
        <button
          className={"smallBtn hover:bg-secondary-hover transition-colors"}
          onClick={handleOpen}
        >
          View
        </button>
        <BiTrash
          className={
            "text-[26px] text-danger-color cursor-pointer hover:text-red-300 transition-colors"
          }
          onClick={confirm}
        />
        <Toast ref={toastB} />
        <Toast ref={toastC} position="bottom-center" />
      </div>
      <ReportModal
        openAssignModal={selectedReport}
        handleCloseModal={handleCloseModal}
        details={report}
        userRole={UserRole.Admin}
      />
    </div>
  );
}
