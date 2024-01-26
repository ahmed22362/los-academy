"use client";

import { Course } from "@/types";
import { useEffect, useState } from "react";

export const getCourses = () => {
  const [data, setData] = useState<Course[]>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/course`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setData(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return data;
};
