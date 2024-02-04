"use client";

import { Student } from "@/types";
import { useEffect, useState } from "react";

export const fetchEndPoint = <T,>(endPoint: String, token: string) => {
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/${endPoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
