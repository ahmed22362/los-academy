import React, { useRef, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { Calendar, CalendarProps } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { Toast } from "primereact/toast";
import Cookies from "universal-cookie";
import { Modal } from "flowbite-react";
import BannerComponent from "./Banner";
interface RescheduleSessionProps {
  openRescheduleModal: boolean;
  sessionId: string;
  fromTeacherRequest?: boolean; // Making fromTeacherRequest optional
}
function RescheduleSession({
  setOpenRescheduleModal,
  openRescheduleModal,
  sessionId,
  fromTeacherRequest,
}: any) {
  const [selectedStartDate, setSelectedStartDate] = useState<
    Nullable<Date> | any
  >(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Nullable<Date> | any>(
    null
  );
  const toast = useRef<Toast>(null);
  const cookie = new Cookies();

  const showSuccess = (msg: any) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: msg,
      life: 5000,
    });
  };

  const showError = (msg: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 5000,
    });
  };

  const handleReschedule = () => {
    if (!selectedStartDate || !selectedEndDate) {
      showError("Please select both first date and end second date.");
      return;
    }

    const rescheduleData = {
      sessionId: sessionId,
      newDatesOptions: [
        selectedStartDate.toISOString(),
        selectedEndDate.toISOString(),
      ],
    };

    // Perform API request to reschedule session using rescheduleData
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/user/requestReschedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.get("token")}`,
      },
      body: JSON.stringify(rescheduleData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Session rescheduled successfully", data);

        // Handle success response
        if (data.status === "success") {
          showSuccess(`${data.message}`);
          // Close the modal after a successful reschedule
          setTimeout(() => {
            setOpenRescheduleModal(false);
          }, 4000);
        } else {
          showError(`${data.message}`);
        }
       
      })
      .catch((error) => {
        // Handle error
        console.error("Error rescheduling session:", error);
        showError("Error rescheduling session. Please try again.");
      });
  };

  return (
    <>
      <Modal
        show={openRescheduleModal}
        className="block space-y-0 md:flex md:space-y-0 md:space-x-4 "
        size={"xl"}
        onClose={() => setOpenRescheduleModal(false)}
      >
        <Modal.Header className="p-0 m-0 border-0"></Modal.Header>
        <Modal.Body>
          <div className="banner">
            {fromTeacherRequest && (
              <BannerComponent
                message={
                  "You have declined your teacher rescheduling request so you should suggest two times for your teatcher"
                }
                header={"Sessions Rescheduling"}
                animation={""}
                fromTeacherRequest={true}
              />
            )}
          </div>
          <div className="flex justify-center flex-col items-center gap-5">
            <Calendar
              panelClassName="h-fit lg:mt-[300px]"
              value={selectedStartDate}
              onChange={(e: CalendarProps | any) =>
                setSelectedStartDate(e.value)
              }
              showTime
              hourFormat="12"
              style={{
                outline: "4px solid var(--secondary-color)",
                borderRadius: "",
                width: "100%",
              }}
              placeholder="Select First Avilable Date and Time"
            />
            <Calendar
              panelClassName="h-fit lg:mt-[250px]"
              value={selectedEndDate}
              onChange={(e: CalendarProps | any) => setSelectedEndDate(e.value)}
              showTime
              hourFormat="12"
              style={{
                outline: "4px solid var(--secondary-color)",
                borderRadius: "",
                width: "100%",
              }}
              placeholder="Select Second Avilable Date and Time"
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
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RescheduleSession;
