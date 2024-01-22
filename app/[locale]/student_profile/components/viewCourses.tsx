import React, { useEffect, useState } from "react";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import Cookies from "universal-cookie";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Select from 'react-select'

interface Course {
  id: number;
  title: string;
  description: string;
  details: string;
  stripeProductId: string | null;
}

function ViewCourses({ setSelectedCourses, selectedCourses }: any) {
  const cookie = new Cookies();

  const [courses, setCourses] = useState<Course[]>([]);
  // const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Make a GET request to the course/ endpoint
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/course/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the courses state with the retrieved data
        setCourses(data.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const options = courses?.map((course) => ({
    value: course.title,
    label: course.title,
  }));

  return (
    <div className="card flex justify-content-center mt-4 w-full">
      <span className=" text-lg w-full ">
        {/* <MultiSelect
          value={selectedCourses}
          onChange={(e) => setSelectedCourses(e.target.value)}
          options={options}
          optionLabel="label"
          maxSelectedLabels={3}
          className="w-full  border mt-2"
        /> */}
         <Select
    defaultValue={selectedCourses}
    isMulti
    name="Courses"
    options={options}
    onChange={(selectedOptions) => {
      const selectedCourseNames = selectedOptions.map(option => option.value);
      setSelectedCourses(selectedCourseNames);
    }}    className="basic-multi-select"
    classNamePrefix="select"
  />
        {/* <label htmlFor="ms-courses" className="text-[18px] mb-2">
          Select Courses:
        </label> */}
      </span>
    </div>
  );
}

export default ViewCourses;
