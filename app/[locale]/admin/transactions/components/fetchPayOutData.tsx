"use client";

import { Table } from "flowbite-react";

import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import { convertDateTimeZone } from "@/utilities";
import { MdCheck } from "react-icons/md";
import { showError, showSuccess } from "@/utilities/toastMessages";

export default function FetchPayOutData({
  payOutData,
  updateComponent,
}: {
  payOutData: any;
  updateComponent: () => void;
}) {
  const payout = payOutData;
  const cookies = new Cookies();
  // Toast reference
  const toast = useRef<Toast>(null);

  const acceptRequest = () => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/payout/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify({
        requestId: payout.id,
        status: "done",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          showSuccess(data.message, toast);
          updateComponent();
        } else {
          showError(data.message, toast);
        }
      })
      .catch((err) => {
        console.log(err);
        showError(err.message, toast);
      });
  };

  return (
    <div className="flex flex-row justify-center items-center gap-4">
      <Toast ref={toast} />
      {payout.status === "pending" ? (
        <button
          onClick={acceptRequest}
          className={`px-3 py-2 bg-secondary-color hover:bg-secondary-hover transition-colors text-white rounded-full font-semibold`}
        >
          Accept Request
        </button>
      ) : (
        <p className="px-4 py-2 bg-success-color text-white rounded-full font-semibold flex items-center justify-center gap-1 capitalize">
          accepted <MdCheck style={{ fontSize: "20px" }} />
        </p>
      )}
    </div>
  );
}
