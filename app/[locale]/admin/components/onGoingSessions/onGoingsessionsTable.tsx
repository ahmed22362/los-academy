"use client";

import { CustomFlowbiteTheme, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import OnGoingSessionComboBox from "./onGoingSessionsComboBox";
import FetchOnGoingSessionData from "./fetchOnGoingSessionData";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { convertDateTimeZone } from "@/utilities";
import getDateAfterDuration from "@/utilities/getDateAfterDuration";

export default function OnGoingSessionsTable() {
  const [allSessions, setAllSessions]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const customTheme: CustomFlowbiteTheme["table"] = {
    head: {
      base: "group/head text-xs uppercase text-black-color-one bg-white-color p-[15px] text-center",
      cell: {
        base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-white-color px-6 py-3",
      },
    },
  };
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  const getPaginatedData = () => {
    const endIndex = first + rows;
    return allSessions.slice(first, endIndex);
  };
  const displayedSessions = getPaginatedData();
  const fetchAllSessions = () => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/?status=ongoing`, {
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
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="p-5">
          <OnGoingSessionComboBox updateComponent={fetchAllSessions} />
          {allSessions && allSessions.length > 0 ? (
            <>
              {" "}
              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <Table>
                  <Table.Head theme={customTheme.head}>
                    <Table.HeadCell theme={customTheme.head}>
                      #ID
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Teacher Name
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Student Name
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Start Time
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      End Time
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Type
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Meeting Link
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y divide-gray-100">
                    {displayedSessions.map((session: any, index: number) => (
                      <Table.Row
                        key={index}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {session.id}
                        </Table.Cell>
                        <Table.Cell>
                          {session.SessionInfo.teacher.name}
                        </Table.Cell>
                        <Table.Cell>{session.SessionInfo.user.name}</Table.Cell>
                        <Table.Cell>
                          {convertDateTimeZone(
                            session.sessionDate,
                            "UTC",
                            Intl.DateTimeFormat().resolvedOptions().timeZone,
                            "YYYY-MM-DD h:mm A",
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          {convertDateTimeZone(
                            getDateAfterDuration(
                              session.sessionDate,
                              session.sessionDuration,
                            ),
                            "UTC",
                            Intl.DateTimeFormat().resolvedOptions().timeZone,
                            "YYYY-MM-DD h:mm A",
                          )}
                        </Table.Cell>
                        <Table.Cell>{session.type}</Table.Cell>
                        <Table.Cell>
                          <FetchOnGoingSessionData
                            key={index}
                            sessionData={session}
                            updateComponent={fetchAllSessions}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {displayedSessions.map((session: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white space-y-3 p-4 rounded-lg shadow"
                  >
                    <div className="flex items-center space-x-2 text-sm">
                      <div>
                        <span className="text-blue-500 font-bold hover:underline">
                          #{session.id}
                        </span>
                        <span className="text-sm text-gray-700">{` ${session.SessionInfo.user.name} with ${session.SessionInfo.teacher.name}`}</span>
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
                        getDateAfterDuration(
                          session.sessionDate,
                          session.sessionDuration,
                        ),
                        "UTC",
                        Intl.DateTimeFormat().resolvedOptions().timeZone,
                        "YYYY-MM-DD h:mm A",
                      )} `}
                    </div>
                    <div className="text-sm text-gray-700">
                      {" "}
                      Type: {session.type}
                    </div>
                    <div className="text-sm font-medium text-black flex justify-center items-center">
                      {
                        <FetchOnGoingSessionData
                          key={index}
                          sessionData={session}
                          updateComponent={fetchAllSessions}
                        />
                      }
                    </div>
                  </div>
                ))}
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
              totalRecords={allSessions.length ?? 0}
              rowsPerPageOptions={[10, 20, 30]}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
