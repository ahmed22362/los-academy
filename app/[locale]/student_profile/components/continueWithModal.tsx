import React, { useRef, useState } from "react";
import { Button, Modal } from "flowbite-react";
import Cookies from "universal-cookie";
import { Calendar, CalendarProps } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { Toast } from "primereact/toast";

function ContinueWithModal({
  openContinueWithModal,
  setOpenContinueWithModal,
}: any) {
  const cookie = new Cookies();
  const url = process.env.NEXT_PUBLIC_APIURL;
  const token = cookie.get("token");
  const [continueWithFirstDate, setContinueWithFirstDate] = useState<
    Nullable<Date> | any
  >(null);
  const [continueWithSecondDate, setContinueWithSecondDate] = useState<
    Nullable<Date> | any
  >(null);
  const toast = useRef<Toast>(null);

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
  const placeDates = () => {
    console.log("placeDates function is triggered");

    if (!continueWithFirstDate || !continueWithSecondDate) {
      showError("Please select both start date and end date.");
      return;
    }

    const rescheduleData = {
      sessionDates: [
        continueWithFirstDate.toISOString(),
        continueWithSecondDate.toISOString(),
      ],
    };

    fetch(`${url}/session/placeSessionDates`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rescheduleData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.status === "success") {
          window.history.replaceState(null, '', '/student_profile')
          showSuccess("session with this teacher placed successfully");
          console.log("POST request successful:", data);
          if (typeof window !== "undefined") {
            localStorage.setItem("confirmDialog", "false");
          }
          setTimeout(() => {
            setOpenContinueWithModal(false);
          }, 3000);
        } else {
          console.error(data);
          showError(data.message);
          window.history.replaceState(null, '', '/student_profile')

        }
        setTimeout(() => {
          setOpenContinueWithModal(false);
        }, 3000);
      })
      .catch((error) => {
        window.history.replaceState(null, '', '/student_profile')

        console.error("Error during POST request:", error);
        setTimeout(() => {
          setOpenContinueWithModal(false);
        }, 3000);
      });
  };

  return (
    <div>
      <Toast ref={toast} />
      <Modal
        show={openContinueWithModal}
        className="block space-y-0 md:flex md:space-y-0 md:space-x-4 "
        size={"xl"}
        onClose={() => setOpenContinueWithModal(false)}
      >
        <Modal.Header className="p-0 m-0 border-0"></Modal.Header>

        <Modal.Body>
          <div>
            <h3 className="font-semibold text-lg mb-3">Book Sessions</h3>
            <div className="flex flex-col gap-5">
              <h4>Now You Should Please Your Session Dates That Avilible To You</h4>
              <div className="taps flex justify-center  h-1/2">
                <Calendar
                panelClassName="h-fit lg:mt-[250px]"
                  value={continueWithFirstDate}
                  onChange={(e: CalendarProps | any) =>
                    setContinueWithFirstDate(e.value)
                  }
                  showTime
                  hourFormat="12"
                  style={{
                    outline: "4px solid var(--secondary-color)",
                    width: "100%",
                  }}
                  placeholder="Select First Avilable Date and Time"
                />
              </div>
              <div className="taps flex justify-center h-1/2">
                <Calendar
                panelClassName="h-fit lg:mt-[250px]"
                  value={continueWithSecondDate}
                  onChange={(e: CalendarProps | any) =>
                    setContinueWithSecondDate(e.value)
                  }
                  showTime
                  hourFormat="12"
                  style={{
                    outline: "4px solid var(--secondary-color)",
                    width: "100%",
                  }}
                  placeholder="Select First Avilable Date and Time"
                />
              </div>
              <button
                onClick={placeDates}
                className=" max-md-px-1 py-2 px-5 w-fit text-sm font-semibold transition-colors text- shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] h-10   rounded-full mx-auto max-md:px-4 max-md:w-45"
              >
                Continue
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ContinueWithModal;
