"use client";

import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import moment from "moment-timezone";
import { Spinner } from "flowbite-react";
import SessionDetails from "./RequestDetails";
export default function FreeSessionsTable({ isAdmin }: { isAdmin: boolean }) {
  const [totalFree, setTotalFree] = useState([]);
  const [selectedSession, setSelectedSession]: any = useState(null);
  const [loading, setLoading] = useState(true);

  const cookies = new Cookies();

  const convertDateTimeZone = (
    inputTime: moment.MomentInput,
    inputTimezone: string,
    outputTimezone: string,
    ourFormat: string,
  ) => {
    const convertedTime = moment(inputTime)
      .tz(inputTimezone)
      .clone()
      .tz(outputTimezone);
    return convertedTime.format(ourFormat);
  };

  const totalFreeSessions = () => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/free/available`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTotalFree(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    totalFreeSessions();
  }, []);

  const rerenderComponent = () => {
    totalFreeSessions();
  };

  const handleAssignSession = (session: any) => {
    setSelectedSession(session);
  };
  const handleCloseModal = () => {
    setSelectedSession(null);
  };

  return (
    <div className={"w-full mb-5"}>
      <h3 className={"adminBoxTitle responsiveText"}>Free Sessions Requests</h3>
      <div className={"adminBox mt-4 flex flex-col w-[390px] mx-auto"}>
        {loading ? (
          <Spinner />
        ) : totalFree && totalFree.length > 0 ? (
          totalFree.map((freeRequest: any, index: number) => (
            <SessionDetails
              key={index}
              request={freeRequest}
              handleAssignSession={handleAssignSession}
              selectedSession={selectedSession}
              handleCloseModal={handleCloseModal}
              rerenderComponent={rerenderComponent}
              isAdmin={isAdmin}
            />
          ))
        ) : (
          <p className="p-3 bg-warning-color text-white w-fit rounded-full font-bold">
            There are no free requests for now!
          </p>
        )}
      </div>
    </div>
  );
}
