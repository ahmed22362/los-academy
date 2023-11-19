import React from "react";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { Calendar, CalendarProps } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import PrimaryButton from "../../components/PrimaryButton";
import { Toast } from "primereact/toast";

function BookPaidSession({ setOpenBookModal }: any) {
  const [datetime12h, setDateTime12h] = useState<Nullable<Date> | any>(null);

  const toast = useRef<Toast>(null);
  const cookie = new Cookies();
  const url = process.env.NEXT_PUBLIC_APIURL;
  const token = cookie.get("token");

  const handleBookClick = () => {
    if (
      !datetime12h ||
      !Array.isArray(datetime12h) ||
      datetime12h.length === 0
    ) {
      showErrorMessage("Please select at least one date for booking.");
      return;
    }
    if (datetime12h && Array.isArray(datetime12h) && datetime12h.length > 0) {
      const selectedDates = datetime12h.map((date) => date.toISOString());

      const requestBody = {
        sessionDates: selectedDates,
      };

      fetch(`${url}/session/paid/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status == "success") {
            showSuccessMessage("Booking successful");
            setTimeout(() => {
              setOpenBookModal(false);
            }, 3000);
          } else {
            showErrorMessage(data.message);
            setTimeout(() => {
              setOpenBookModal(false);
            }, 3000);
          }

          // Process the response as needed
        })
        .catch((error) => {
          console.error("Error fetching Paid sessions:", error);
        });
    }
  };

  const showSuccessMessage = (message: any) => {
    toast?.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };

  const showErrorMessage = (message: any) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };

  useEffect(() => {
    console.log(datetime12h);
  }, [datetime12h]);

  return (
    <div className="m-auto flex justify-center flex-col items-center gap-5">
      <Calendar
        value={datetime12h}
        onChange={(e: CalendarProps | any) => setDateTime12h(e.value)}
        showTime
        hourFormat="12"
        style={{
          outline: "4px solid var(--secondary-color)",
          borderRadius: "16px",
        }}
        inline
        selectionMode="multiple"
      />
      <div>
        <PrimaryButton
          onClick={handleBookClick}
          ourStyle="bg-secondary-color hover:bg-[#3b369a] text-white w-[250px]	py-3 border rounded-3xl text-md px-10	 transition-all	duration-500 "
          text="Book Paid Sessions"
        />
      </div>
      <Toast ref={toast} />
    </div>
  );
}

export default BookPaidSession;
