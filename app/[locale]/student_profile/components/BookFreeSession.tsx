import React from "react";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { Calendar, CalendarProps } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { Toast } from "primereact/toast";
import ViewCourses from "./viewCourses";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import BookSessionsCalendar from "./bookSessionsCalendar";

function BookFreeSession({ setOpenBookModal }: any) {
  const [datetime12h, setDateTime12h] = useState<Nullable<Date> | any>(
    null
  );
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router=useRouter();
  const toast = useRef<Toast>(null);
  const cookie = new Cookies();

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
  const handleBookFreeClick = () => {
    if (
      !datetime12h ||
      !Array.isArray(datetime12h) ||
      datetime12h.length === 0
    ) {
      showErrorMessage("Please select at least one date for booking.");
      return;
    }

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
      console.log(requestBody);
      
      setIsProcessing(true);
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/free/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.get("token")}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsProcessing(false);
        if (data.status === "success") {
          showSuccessMessage("Booking Free Session successful");
          setTimeout(() => {
            setOpenBookModal(false);
            router.refresh();
          }, 4000);
        } else {
          setIsProcessing(false);
          showErrorMessage(data?.message);
        }
      })
      .catch((error) => {
        // console.error("Error fetching Free sessions:", error);
        showErrorMessage("Booking failed");
      });
  };


  return (
    <div className=" flex justify-center flex-col items-center gap-5">
      <div className="courses w-full flex justify-center">
      <ViewCourses setSelectedCourses={setSelectedCourses} selectedCourses={selectedCourses} />
      </div>
     
      <BookSessionsCalendar datetime12h={datetime12h} setDateTime12h={setDateTime12h}/>
      <div>
      <Button
        onClick={handleBookFreeClick}
        color="purple"
        isProcessing={isProcessing}
        pill
        size="md"
        className={
          "bg-secondary-color hover:bg-[#3b369a] text-white 	py-2 border rounded-3xl text-md px-10	 transition-all	duration-500 "
        }
      >
        <p>Book Free Session</p>
      </Button>
       
      </div>
      <Toast ref={toast} />
    </div>
  );
}

export default BookFreeSession;