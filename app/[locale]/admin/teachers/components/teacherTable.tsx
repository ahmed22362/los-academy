"use client";

import { Spinner, Table } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import FetchTeacherData from "./deleteTeacherData";
import TeacherComboBox from "./teacherComboBox";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import ContactOptions from "./contactOptionsComonents";
import {
  renderTableBody,
  renderTableHead,
} from "@/app/[locale]/components/genericTableComponent/table.component";
import { convertDateTimeZone } from "@/utilities";
import { Teacher } from "@/types";

export default function TeacherTable() {
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);

  const headersMapping: Record<string, keyof Teacher> = {
    "#ID": "id",
    Name: "name",
    Role: "role",
    "Completed Mins": "committed_mins",
    "Hour Cost In $": "hour_cost",
    "Joined Date": "createdAt",
  };

  const fetchAllTeachers = (limit?: number, page?: number) => {
    let url = `${process.env.NEXT_PUBLIC_APIURL}/teacher`;
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
        setAllTeachers(data.data);
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
    fetchAllTeachers(event.rows, event.first / event.rows + 1);
    console.log(rows, first, allTeachers.length);
  };

  useEffect(() => {
    fetchAllTeachers(rows, 1);
  }, []);

  const renderUpdateComponent = (teacher: Teacher) => (
    <FetchTeacherData
      key={teacher.id}
      teacherData={teacher}
      updateComponent={fetchAllTeachers}
    />
  );
  const renderMobileCardComponent = (teacher: any, index: number) => (
    <div key={index} className="bg-white space-y-3 p-4 rounded-lg shadow">
      <div className="flex items-center space-x-2 text-sm">
        <div>
          <span className="text-blue-500 hover:underline">
            #{teacher.id.slice(-4)}
          </span>
        </div>
        <div className="text-gray-500 font-bold">{teacher.name}</div>
      </div>
      <div className="text-sm text-gray-700">{`Role: ${teacher.role}`}</div>
      <div className="text-sm text-gray-700">{`Committed Minuets: ${teacher.committed_mins} With Hour Cost of ${teacher.hour_cost}$ `}</div>
      <div className="text-sm text-gray-700">{`Joined: ${convertDateTimeZone(
        teacher.createdAt,
        "UTC",
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        "YYYY-MM-DD h:mm A",
      )}`}</div>
      <div className="text-sm font-medium text-black flex justify-center items-center gap-4">
        {
          <>
            <ContactOptions email={teacher.email} phone={teacher.phone} />
            <FetchTeacherData
              key={index}
              teacherData={teacher}
              updateComponent={fetchAllTeachers}
            />
          </>
        }
      </div>
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
          <TeacherComboBox updateComponent={fetchAllTeachers} />
          {allTeachers && allTeachers.length > 0 ? (
            <>
              {" "}
              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <Table>
                  {renderTableHead(Object.keys(headersMapping), true, true)}
                  {renderTableBody({
                    headersValues: Object.values(headersMapping),
                    idValueName: "id",
                    data: allTeachers,
                    contactOptions: true,
                    renderUpdateComponent: (teacher: Teacher) =>
                      renderUpdateComponent(teacher),
                  })}
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {allTeachers.map((teacher: any, index: number) =>
                  renderMobileCardComponent(teacher, index),
                )}
              </div>
            </>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
              There are no Teachers, Add One!
            </div>
          )}
          <div className="card mt-4">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={allTeachers?.length ?? rows}
              rowsPerPageOptions={[10, 20, 30]}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
