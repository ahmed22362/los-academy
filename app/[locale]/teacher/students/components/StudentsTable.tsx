"use client";

import { Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import {
  renderTableBody,
  renderTableHead,
} from "@/app/[locale]/components/genericTableComponent/table.component";
import { Student } from "@/types";
import GenericComboBox from "@/app/[locale]/components/genericTableComponent/genericSearchBox.component";

export default function StudentTable() {
  const [allStudents, setAllStudents]: any = useState([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);

  const headersMapping: Record<string, keyof Student> = {
    "#ID": "id",
    Name: "name",
    Gender: "gender",
    Age: "age",
    "Available Free Session": "availableFreeSession",
    "Remain Paid Sessions": "remainSessions",
  };

  const fetchAllStudents = (limit?: number, page?: number) => {
    setIsLoading(true);
    let url = `${process.env.NEXT_PUBLIC_APIURL}/teacher/myStudents`;
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
        setAllStudents(res.data);
        setTotalRecords(res.length);
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
    fetchAllStudents(event.rows, event.first / event.rows + 1);
  };
  useEffect(() => {
    fetchAllStudents(rows, 1);
  }, []);

  const renderMobileCardComponent = (student: Student, index: number) => (
    <div key={index} className="bg-white space-y-3 p-4 rounded-lg shadow">
      <div className="flex items-center space-x-2 text-sm">
        <div>
          <span className="text-blue-500 hover:underline">
            #{student.id.slice(-4)}
          </span>
        </div>
        <div className="text-gray-500 font-bold">
          {`${student.name} - ${student.gender} (${student.age} years)`}
        </div>
      </div>
      <div className="text-sm text-gray-700">{`Available free session: ${student.availableFreeSession}`}</div>
      <div className="text-sm text-gray-700">{`Remain Paid session: ${student.remainSessions}`}</div>
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
          <GenericComboBox />
          {allStudents && allStudents.length > 0 ? (
            <>
              {" "}
              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <Table>
                  {renderTableHead(Object.keys(headersMapping))}
                  {renderTableBody({
                    headersValues: Object.values(headersMapping),
                    idValueName: "id",
                    data: allStudents,
                  })}
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {allStudents.map((student: Student, index: number) =>
                  renderMobileCardComponent(student, index),
                )}
              </div>
            </>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
              There are no Students Yet, You can always add One!
            </div>
          )}
          <div className="card mt-4">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={totalRecords}
              rowsPerPageOptions={[10, 20, 30]}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
