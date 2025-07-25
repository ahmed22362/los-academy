import React from "react";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { Calendar, CalendarProps } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { Toast } from "primereact/toast";
import ViewCourses from "./viewCourses";
import { Button } from "flowbite-react";
import BookSessionsCalendar from "./bookSessionsCalendar";

function BookPaidSession({ setOpenBookModal }: any) {
  const [datetime12h, setDateTime12h] = useState<Nullable<Date> | any>(
    null
  );  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const toast = useRef<Toast>(null);
  const cookie = new Cookies();

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

      const selectedCourseTitles = selectedCourses?.map((course) => course.toString().toLowerCase());
      if(selectedCourseTitles.length==0){
        showErrorMessage("you should select at least one course");
        return 0;
      }
      const requestBody = {
        sessionDates: selectedDates,
        courses: selectedCourseTitles,
      };
      setIsProcessing(true);
      fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/paid/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("token")}`,
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsProcessing(false);
          if (data.status == "success") {
            showSuccessMessage("Booking successful");
            setTimeout(() => {
              setOpenBookModal(false);
            }, 3000);
          } else {
            showErrorMessage(data.message);
          setIsProcessing(false);
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
      life: 5000,
    });
  };

  const showErrorMessage = (message: any) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 5000,
    });
  };


  return (
    <div className="m-auto flex justify-center flex-col items-center gap-5">
       <div className="courses w-full flex justify-center">
       <ViewCourses setSelectedCourses={setSelectedCourses} selectedCourses={selectedCourses} />
      </div>
      {/* <Calendar
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
      /> */}
     <BookSessionsCalendar datetime12h={datetime12h} setDateTime12h={setDateTime12h}/>
      <div>
      <Button
        onClick={handleBookClick}
        color="purple"
        isProcessing={isProcessing}
        pill
        size="md"
        className={
          "bg-secondary-color hover:bg-[#3b369a] text-white 	py-2 border rounded-3xl text-md px-10	 transition-all	duration-500 "
        }
      >
        <p>Book Paid Sessions</p>
      </Button>
     
      </div>
      
      <Toast ref={toast} />
    </div>
  );
}

export default BookPaidSession;
