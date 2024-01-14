"use client";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { CustomFlowbiteTheme, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import SessionComboBox from "./sessionComboBox";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { convertDateTimeZone } from "@/utilities";
import getDateAfter from "@/utilities/getDateAfterDuration";
import StatusBadge from "../../../../../utilities/StatusBadge";

export default function SessionsTable() {
  const [allSessions, setAllSessions]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(5);
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    console.log(first, rows);
    fetchAllSessions(event.rows, event.first / event.rows + 1);
  };
  const customTheme: CustomFlowbiteTheme["table"] = {
    head: {
      base: "group/head text-xs uppercase text-black-color-one bg-white-color p-[15px] text-center",
      cell: {
        base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-white-color px-6 py-3",
      },
    },
  };

  const fetchAllSessions = (limit: number, page: number) => {
    fetch(`http://localhost:8080/api/v1/session?limit=${limit}&page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
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
    fetchAllSessions(rows, 1);
  }, []);

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
                      Date Time
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Session Duration
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Type
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Status
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y divide-gray-100">
                    {allSessions.map((session: any, index: number) => (
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
                        <Table.Cell>{session.sessionDuration} Mins</Table.Cell>
                        <Table.Cell>{session.type}</Table.Cell>
                        <Table.Cell>
                          <StatusBadge status={session.status} />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {allSessions.map((session: any, index: number) => (
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
                    <div className="text-sm text-gray-700">
                      {`From: 
                    ${convertDateTimeZone(
                      session.sessionDate,
                      "UTC",
                      Intl.DateTimeFormat().resolvedOptions().timeZone,
                      "YYYY-MM-DD h:mm A",
                    )} To ${convertDateTimeZone(
                        getDateAfter(
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
                    <span className="text-sm text-gray-700 w-fit m-auto">
                      {" "}
                      Status: {<StatusBadge status={session.status} />}
                    </span>
                  </div>
                ))}
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
              totalRecords={allSessions.length ?? 0}
              rowsPerPageOptions={[5, 10, 15]}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
