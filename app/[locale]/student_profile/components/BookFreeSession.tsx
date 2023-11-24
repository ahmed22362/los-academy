import React from "react";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { Calendar, CalendarProps } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import PrimaryButton from "../../components/PrimaryButton";
import { Toast } from "primereact/toast";
import ViewCourses from "./viewCourses";

function BookFreeSession({ setOpenBookModal }: any) {
  const [freedatetime12h, setFreeDateTime12h] = useState<Nullable<Date> | any>(
    null
  );
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  const handleSelectCourses = (courses: any[]) => {
    setSelectedCourses(courses);
  };
  const toast = useRef<Toast>(null);
  const cookie = new Cookies();
  const url = process.env.NEXT_PUBLIC_APIURL;
  const token = cookie.get("token");

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
      !freedatetime12h ||
      !Array.isArray(freedatetime12h) ||
      freedatetime12h.length === 0
    ) {
      showErrorMessage("Please select at least one date for booking.");
      return;
    }

    const selectedDates = freedatetime12h.map((date) => date.toISOString());
    const selectedCourseTitles = selectedCourses.map((course) => course.title.toLowerCase());

      const requestBody = {
        sessionDates: selectedDates,
        courses: selectedCourseTitles,
      };

    fetch(`${url}/session/free/request`, {
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
        if (data.status === "success") {
          showSuccessMessage("Booking Free Session successful");
        } else {
          showErrorMessage(data.message);
        }
        setTimeout(() => {
          setOpenBookModal(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error fetching Free sessions:", error);
        showErrorMessage("Booking failed");
      });
  };

  useEffect(() => {
    console.log(freedatetime12h);
  }, [freedatetime12h]);

  return (
    <div className=" flex justify-center flex-col items-center gap-5">
       <div className="courses w-full flex justify-center">
        <ViewCourses onSelectCourses={handleSelectCourses}/>
      </div>
      <Calendar
        value={freedatetime12h}
        onChange={(e: CalendarProps | any) => setFreeDateTime12h(e.value)}
        showTime
        hourFormat="12"
        style={{
          outline: "4px solid var(--secondary-color)",
          borderRadius: "16px",
          width: "408px",
        }}
        inline
        selectionMode="multiple"
      />
      <div>
        <PrimaryButton
          onClick={handleBookFreeClick}
          ourStyle="bg-secondary-color hover:bg-[#3b369a] text-white w-[250px]	py-3 border rounded-3xl text-md px-10	 transition-all	duration-500 "
          text="Book Free Session"
        />
      </div>
      <Toast ref={toast} />
    </div>
  );
}

export default BookFreeSession;
