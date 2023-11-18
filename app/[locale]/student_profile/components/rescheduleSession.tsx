import React, { useRef, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { Calendar, CalendarProps } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import { Modal } from "flowbite-react";

function RescheduleSession({
  setopenRescheduleModal,
  openRescheduleModal,
  sessionId,
}: any) {
  // const [rescheduledatetime12h, setRescheduleDateTime12h] = useState<Nullable<Date> | any>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<
    Nullable<Date> | any
  >(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Nullable<Date> | any>(
    null
  );
  const [rescheduleStatus, setRescheduleStatus] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(true);
  const toast = useRef<Toast>(null);
  const cookie = new Cookies();
  const url = process.env.NEXT_PUBLIC_APIURL;
  const token = cookie.get("token");

  const showSuccess = (msg: any) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: msg,
      life: 3000,
    });
  };
  const showError = (msg: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 4000,
    });
  };
  // function
  const handleReschedule = () => {
    alert("in");
    if (!selectedStartDate || !selectedEndDate) {
      showError("Please select both start date and end date.");
      return;
    }
    const rescheduleData = {
      sessionId: sessionId,
      newDateStartRange: selectedStartDate.toISOString(),
      newDateEndRange: selectedEndDate.toISOString(),
    };

    // Perform API request to reschedule session using rescheduleData
    fetch(`${url}/user/requestReschedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rescheduleData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Session rescheduled successfully", data);
        setRescheduleStatus(`success`);
        // Handle success response
        if (data.status === "success") {
          setStatus(`${data?.data?.status}`);
          showSuccess(`${data.message}`);
          setRescheduleStatus(`${data.status}`);
        } else {
          showError(`${data.message}`);
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error rescheduling session:", error);
        showError("Error rescheduling session. Please try again.");
        setRescheduleStatus("error");
      });
  };

  const renderModalContent = () => {
    if (rescheduleStatus === "success") {
      return (
        <div>
          <p>Reschedule Requested successfully!</p>
        </div>
      );
    } else if (rescheduleStatus === "error") {
      return (
        <div>
          <p>Error rescheduling session. Please try again.</p>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center flex-col items-center gap-5">
          <Calendar
            value={selectedStartDate}
            onChange={(e: CalendarProps | any) => setSelectedStartDate(e.value)}
            showTime
            hourFormat="12"
            style={{
              outline: "4px solid var(--secondary-color)",
              borderRadius: "16px",
              width: "408px",
            }}
            placeholder="Select Start Date and Time"
          />
          <Calendar
            value={selectedEndDate}
            onChange={(e: CalendarProps | any) => setSelectedEndDate(e.value)}
            showTime
            hourFormat="12"
            style={{
              outline: "4px solid var(--secondary-color)",
              borderRadius: "16px",
              width: "408px",
            }}
            placeholder="Select End Date and Time"
          />
          <div>
            <PrimaryButton
              ourStyle="bg-secondary-color hover:bg-[#3b369a] text-white w-[250px] py-3 border rounded-3xl text-md px-10 transition-all duration-500"
              text="Reschedule Session"
              onClick={handleReschedule}
            />
          </div>
          <Toast ref={toast} />
        </div>
      );
    }
  };

  return (
    <>
      <Modal
        show={openRescheduleModal}
        className="block space-y-0 md:flex md:space-y-0 md:space-x-4 "
        size={"xl"}
        onClose={() => setopenRescheduleModal(false)}
      >
        <Modal.Header className="p-0 m-0 border-0"></Modal.Header>
        <Modal.Body>
          {showModal && <div>{renderModalContent()}</div>}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RescheduleSession;
