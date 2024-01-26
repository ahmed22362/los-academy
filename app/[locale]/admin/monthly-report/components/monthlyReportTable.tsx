"use client";

import { Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import MonthlyReportCombBox from "./monthlyReportCombBox";
import FetchMonthlyReportsData from "./MonthlyReportOptions";
import { convertDateTimeZone } from "@/utilities";
import {
  renderTableBody,
  renderTableHead,
} from "@/app/[locale]/components/genericTableComponent/table.component";
import { MonthlyReport } from "@/types";

export default function MonthlyReportTable() {
  const [allReports, setAllReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    getMonthlyReport(event.rows, event.first / event.rows + 1);
  };

  const headerMapping = {
    "#Report ID": "id",
    "Student Name": "user.name",
    "Teacher Name": "teacher.name",
    "Report Date": "createdAt",
  };
  const getMonthlyReport = (limit?: number, page?: number) => {
    setIsLoading(true);
    let url = `${process.env.NEXT_PUBLIC_APIURL}/monthlyReport`;
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
    getMonthlyReport(rows, 1);
  }, []);

  const updateComponent = () => {
    getMonthlyReport();
  };
  const renderUpdateComponent = (report: MonthlyReport) => (
    <FetchMonthlyReportsData
      key={report.id}
      reportData={report}
      updateComponent={updateComponent}
    />
  );
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
                  {renderTableHead(Object.keys(headerMapping), false, true)}
                  {renderTableBody({
                    headersValues: Object.values(headerMapping),
                    idValueName: "id",
                    data: allReports,
                    renderUpdateComponent: (report: MonthlyReport) =>
                      renderUpdateComponent(report),
                  })}
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {allReports.map((report: any, index: number) => (
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
                      {}
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
