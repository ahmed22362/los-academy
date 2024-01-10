"use client";

import { CustomFlowbiteTheme, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import MonthlyReportCombBox from "./monthlyReportCombBox";
import FetchMonthlyReportsData from "./fetchMonthlyReportData";
import { convertDateTimeZone } from "@/utilities";

export default function MonthlyReportTable() {
  const [allReports, setAllReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const getPaginatedData = () => {
    const endIndex = first + rows;
    return allReports?.slice(first, endIndex) ?? allReports;
  };
  const displayedReports = getPaginatedData();

  const customTheme: CustomFlowbiteTheme["table"] = {
    head: {
      base: "group/head text-xs uppercase text-black-color-one bg-white-color p-[15px] text-center",
      cell: {
        base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-white-color px-6 py-3",
      },
    },
  };

  const getMonthlyReport = () => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/monthlyReport`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllReports(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getMonthlyReport();
  }, []);

  const updateComponent = () => {
    getMonthlyReport();
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="p-5">
          <MonthlyReportCombBox updateComponent={updateComponent} />
          {allReports && allReports.length > 0 ? (
            <>
              {" "}
              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <Table>
                  <Table.Head theme={customTheme.head}>
                    <Table.HeadCell theme={customTheme.head}>
                      #Report ID
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Student Name
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Report Date
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      options
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y divide-gray-100">
                    {displayedReports.map((report: any, index: number) => (
                      <Table.Row
                        key={report.id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {report.id}
                        </Table.Cell>
                        <Table.Cell>{report.userId}</Table.Cell>
                        <Table.Cell>
                          {convertDateTimeZone(
                            report.createdAt,
                            "UTC",
                            Intl.DateTimeFormat().resolvedOptions().timeZone,
                            "YYYY-MM-DD h:mm A",
                          )}
                        </Table.Cell>
                        <FetchMonthlyReportsData
                          key={index}
                          reportData={report}
                          updateComponent={updateComponent}
                        />
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {displayedReports.map((report: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white space-y-3 p-4 rounded-lg shadow"
                  >
                    <div className="flex items-center space-x-2 text-sm">
                      <div>
                        <span className="text-blue-500 font-bold hover:underline">
                          #{report.id}
                        </span>
                      </div>
                      <div className="text-gray-500">{report.userId}</div>
                    </div>
                    <div className="text-sm font-medium text-black flex justify-center items-center">
                      {convertDateTimeZone(
                        report.createdAt,
                        "UTC",
                        Intl.DateTimeFormat().resolvedOptions().timeZone,
                        "YYYY-MM-DD h:mm A",
                      )}
                    </div>
                    <div className="text-sm font-medium text-black flex justify-center items-center">
                      {
                        <FetchMonthlyReportsData
                          key={index}
                          reportData={report}
                          updateComponent={updateComponent}
                        />
                      }
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
              There are no Monthly Reports, Add One!
            </div>
          )}
        </div>
      )}
      <div className="card mt-4">
        <Paginator
          first={first}
          rows={rows}
          totalRecords={allReports.length}
          rowsPerPageOptions={[10, 20, 30]}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
