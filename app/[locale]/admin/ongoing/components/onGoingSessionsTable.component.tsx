"use client";

import { Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import OnGoingSessionComboBox from "./onGoingSessionsComboBox";
import MeetingLink from "./MeetingLink";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { convertDateTimeZone } from "@/utilities";
import getDateAfterDuration from "@/utilities/getDateAfterDuration";
import { Session } from "@/types";
import {
  renderTableBody,
  renderTableHead,
} from "@/app/[locale]/components/genericTableComponent/table.component";

export default function OnGoingSessionsTable() {
  const [allSessions, setAllSessions]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const [totalRecord, setTotalRecords] = useState<number>(1);
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    fetchAllSessions(event.rows, event.first / event.rows + 1);
  };

  const headersMapping: Record<string, keyof Session | string> = {
    "#ID": "id",
    "Teacher Name": "sessionInfo.teacher.name",
    "Student Name": "sessionInfo.user.name",
    "Start Time": "sessionDate",
    "End Time": "sessionDate",
    Type: "type",
  };

  const fetchAllSessions = (limit: number, page: number) => {
    setIsLoading(true);
    let url = `${process.env.NEXT_PUBLIC_APIURL}/session?status=ongoing`;
    if (limit !== undefined) {
      url += `&limit=${limit}`;
      if (page !== undefined) {
        url += `&page=${page}`;
      }
    } else if (page !== undefined) {
      url += `&page=${page}`;
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
        console.log(data);
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

  useEffect(() => {
    fetchAllSessions(rows, 1);
  }, []);
  const renderMobileCardComponent = (session: Session) => (
    <div key={session.id} className="bg-white space-y-3 p-4 rounded-lg shadow">
      <div className="flex items-center space-x-2 text-sm">
        <div>
          <span className="text-blue-500 font-bold hover:underline">
            #{session.id}
          </span>
          <span className="text-sm text-gray-700">{` ${session.sessionInfo.user.name} with ${session.sessionInfo.teacher.name}`}</span>
        </div>
      </div>
      <div>
        {`From: 
      ${convertDateTimeZone(
        session.sessionDate,
        "UTC",
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        "YYYY-MM-DD h:mm A",
      )} To- ${convertDateTimeZone(
          getDateAfterDuration(session.sessionDate, session.sessionDuration),
          "UTC",
          Intl.DateTimeFormat().resolvedOptions().timeZone,
          "YYYY-MM-DD h:mm A",
        )} `}
      </div>
      <div className="text-sm text-gray-700"> Type: {session.type}</div>
      <div className="text-sm font-medium text-black flex justify-center items-center">
        {<MeetingLink key={session.id} session={session} />}
      </div>
    </div>
  );
  const renderMeetingComponent = (session: Session) => (
    <MeetingLink session={session} key={session.id} />
  );
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="p-5">
          <OnGoingSessionComboBox />
          {allSessions && allSessions.length > 0 ? (
            <>
              {" "}
              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <Table>
                  {renderTableHead(Object.keys(headersMapping), false, true)}
                  {renderTableBody({
                    headersValues: Object.values(headersMapping),
                    idValueName: "id",
                    data: allSessions,
                    renderUpdateComponent: (session: Session) =>
                      renderMeetingComponent(session),
                  })}
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {allSessions.map((session: Session, index: number) =>
                  renderMobileCardComponent(session),
                )}
              </div>
            </>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
              There are no OnGoing sessions for now!
            </div>
          )}
          <div className="card mt-4">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={totalRecord ?? 1}
              rowsPerPageOptions={[10, 20, 30]}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
