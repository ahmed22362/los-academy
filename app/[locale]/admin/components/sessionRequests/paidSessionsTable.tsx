"use client";

import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Spinner } from "flowbite-react";
import SessionDetails from "./RequestDetails";
export default function PaidSessionsTable({ isAdmin }: { isAdmin: boolean }) {
  const [totalPaid, setTotalPaid] = useState([]);
  const [selectedSession, setSelectedSession]: any = useState(null);
  const [loading, setLoading] = useState(true);

  const cookies = new Cookies();

  const totalPaidSession = () => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/paid/available`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTotalPaid(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    totalPaidSession();
  }, []);

  const rerenderComponent = () => {
    totalPaidSession();
  };

  const handleAssignSession = (session: any) => {
    setSelectedSession(session);
  };
  const handleCloseModal = () => {
    setSelectedSession(null);
  };

  return (
    <div className={"w-full my-5"}>
      <h3 className={"adminBoxTitle responsiveText"}>Paid Sessions Requests</h3>
      <div className={"adminBox mt-4 flex flex-col w-full mx-auto"}>
        {loading ? (
          <Spinner />
        ) : totalPaid && totalPaid.length > 0 ? (
          totalPaid.map((paidRequest: any, index: number) => (
            <SessionDetails
              key={index}
              request={paidRequest}
              handleAssignSession={handleAssignSession}
              selectedSession={selectedSession}
              handleCloseModal={handleCloseModal}
              rerenderComponent={rerenderComponent}
              isAdmin={isAdmin}
            />
          ))
        ) : (
          <p className="p-3 bg-warning-color text-white w-fit rounded-full font-bold text-align-center ">
            There Are no paid requests for now!
          </p>
        )}
      </div>
    </div>
  );
}
