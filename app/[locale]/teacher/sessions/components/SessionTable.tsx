"use client";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useState } from "react";
import Cookies from "universal-cookie";
import { convertDateTimeZone } from "@/utilities";
import getDateAfter from "@/utilities/getDateAfterDuration";
import StatusBadge from "../../../../../utilities/StatusBadge";
import { Session } from "@/types";
import GenericSessionsTable from "@/utilities/session/GenericSessionTable";
import GenericComboBox from "@/app/[locale]/components/genericTableComponent/genericSearchBox.component";

export default function SessionsTable() {
  const [allSessions, setAllSessions]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const [totalRecord, setTotalRecords] = useState<number>(1);

  const headersMapping: Record<string, keyof Session | string> = {
    "#ID": "id",
    "Student Name": "sessionInfo.user.name",
    "Date Time": "sessionDate",
    "Session Duration": "sessionDuration",
    Type: "type",
    Status: "status",
  };

  const fetchAllSessions = (limit?: number, page?: number) => {
    setIsLoading(true);
    let url = `${process.env.NEXT_PUBLIC_APIURL}/teacher/sessions`;
    if (limit !== undefined) {
      url += `?limit=${limit}`;
      if (page !== undefined) {
        url += `&page=${page}`;
      }
    } else if (page !== undefined) {
      url += `?page=${page}`;
    }
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);

        const sorted = res.data.sort((a: any, b: any) => {
          return (
            new Date(a.sessionDate).getTime() -
            new Date(b.sessionDate).getTime()
          );
        });
        setAllSessions(sorted);
        setTotalRecords(res.length);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const renderMobileCardComponent = (session: Session, index?: number) => (
    <div key={index} className="bg-white space-y-3 p-4 rounded-lg shadow">
      <div className="flex items-center space-x-2 text-sm">
        <div>
          <span className="text-blue-500 font-bold hover:underline">
            #{session.id}
          </span>
          <span className="text-sm text-gray-700">{` ${session.sessionInfo.user.name}`}</span>
        </div>
      </div>
      <div className="text-sm text-gray-700">
        {`From: 
  ${convertDateTimeZone(
    session.sessionDate,
    "UTC",
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    "YYYY-MM-DD h:mm A",
  )} To ${convertDateTimeZone(
          getDateAfter(session.sessionDate, session.sessionDuration),
          "UTC",
          Intl.DateTimeFormat().resolvedOptions().timeZone,
          "YYYY-MM-DD h:mm A",
        )} `}
      </div>
      <div className="text-sm text-gray-700"> Type: {session.type}</div>
      <span className="text-sm text-gray-700 w-fit m-auto">
        {" "}
        Status: {<StatusBadge status={session.status} />}
      </span>
    </div>
  );
  const renderSearchBox = () => <GenericComboBox />;
  return (
    <GenericSessionsTable
      headersMapping={headersMapping}
      fetchFunction={fetchAllSessions}
      renderSearchBox={renderSearchBox}
      totalRecords={totalRecord}
      allSessions={allSessions}
      renderMobileCardComponent={renderMobileCardComponent}
      isLoading={isLoading}
    />
  );
}
