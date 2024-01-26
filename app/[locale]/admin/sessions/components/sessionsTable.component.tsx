"use client";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import SessionComboBox from "./sessionComboBox";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { convertDateTimeZone } from "@/utilities";
import getDateAfter from "@/utilities/getDateAfterDuration";
import StatusBadge from "../../../../../utilities/StatusBadge";
import {
  renderTableBody,
  renderTableHead,
} from "@/app/[locale]/components/genericTableComponent/table.component";
import { Session } from "@/types";

export default function SessionsTable() {
  const [allSessions, setAllSessions]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const [totalRecord, setTotalRecords] = useState<number>(1);

  const headersMapping: Record<string, keyof Session | string> = {
    "#ID": "id",
    "Teacher Name": "SessionInfo.teacher.name",
    "Student Name": "SessionInfo.user.name",
    "Date Time": "sessionDate",
    "Session Duration": "sessionDuration",
    Type: "type",
    Status: "status",
  };

  const fetchAllSessions = (limit: number, page: number) => {
    setIsLoading(true);
    let url = `${process.env.NEXT_PUBLIC_APIURL}/session`;
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
      .then((data) => {
        const sorted = data.data.sort((a: any, b: any) => {
          return (
            new Date(a.sessionDate).getTime() -
            new Date(b.sessionDate).getTime()
          );
        });
        setAllSessions(sorted);
        setTotalRecords(data.length);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    fetchAllSessions(event.rows, event.first / event.rows + 1);
  };
  useEffect(() => {
    fetchAllSessions(rows, 1);
  }, []);
  const renderMobileCardComponent = (session: Session, index: number) => (
    <div key={index} className="bg-white space-y-3 p-4 rounded-lg shadow">
      <div className="flex items-center space-x-2 text-sm">
        <div>
          <span className="text-blue-500 font-bold hover:underline">
            #{session.id}
          </span>
          <span className="text-sm text-gray-700">{` ${session.SessionInfo.user.name} with ${session.SessionInfo.teacher.name}`}</span>
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
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="p-5">
          <SessionComboBox updateComponent={fetchAllSessions} />
          {allSessions && allSessions.length > 0 ? (
            <>
              {" "}
              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <Table>
                  {renderTableHead(Object.keys(headersMapping))}
                  {renderTableBody({
                    headersValues: Object.values(headersMapping),
                    idValueName: "id",
                    data: allSessions,
                  })}
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {allSessions.map((session: any, index: number) =>
                  renderMobileCardComponent(session, index),
                )}
              </div>
            </>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
              There are no sessions for now!
            </div>
          )}
          <div className="card mt-4">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={totalRecord}
              rowsPerPageOptions={[10, 20, 30]}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
