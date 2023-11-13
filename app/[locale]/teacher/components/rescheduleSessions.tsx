"use client"

import { useEffect, useState } from "react";
import SessionData from "./sessionData";
import Cookies from "universal-cookie";
import { Spinner } from "flowbite-react";

export default function RescheduleSessions() {
  const [allSessions, setAllSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const getReschedualSession = async () => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher/myRescheduleRequests?status=pending`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies.get("token")}`,
      },
    }).then((response) => response.json())
    .then((data) => {
      console.log(data);
      setAllSessions(data.data);
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }


  useEffect(() => {
    getReschedualSession()
  }, [])

  return (
    <div className={"adminBox w-full flex-col my-5"}>
      <h3 className={"adminBoxTitle"}>Reschedule Sessions</h3>
      <div className="w-full flex-col gap-2 h-[200px] scrollAction ">
        {isLoading 
          ? 
            (<Spinner />) 
            :
              allSessions && allSessions.length > 0 ? allSessions.map((report: any, index: number) => {
            return (
                <SessionData data={report} key={index} updateComponent={getReschedualSession}/>
            )
            }) : <p className="p-3 bg-warning-color text-white w-fit rounded-full mt-2 font-bold">No Sessions</p>}
        </div>
    </div>
  )
}

