"use client";

import { Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import CoursesComboBox from "./coursesComboBox";
import FetchCoursesData from "./deleteCoursesData";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { Course } from "@/types";
import {
  renderTableBody,
  renderTableHead,
} from "@/app/[locale]/components/genericTableComponent/table.component";

export default function CoursesTable() {
  const [allCourses, setAllCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecord, setTotalRecords] = useState(1);

  const headersMapping: Record<string, keyof Course | string> = {
    "#ID": "id",
    Title: "title",
    Description: "description",
    Details: "details",
    "Created At": "createdAt",
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    fetchAllCourses(event.rows, event.first / event.rows + 1);
  };

  const fetchAllCourses = (limit?: number, page?: number) => {
    setIsLoading(true);
    let url = `${process.env.NEXT_PUBLIC_APIURL}/course`;
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
        setAllCourses(res.data);
        setTotalRecords(res.length);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);
  const renderMobileCardComponent = (course: Course) => (
    <div key={course.id} className="bg-white space-y-3 p-4 rounded-lg shadow">
      <div className="flex items-center space-x-2 text-sm">
        <div>
          <span className="text-blue-500 font-bold hover:underline">
            #{course.id}
          </span>
        </div>
        <div className="text-gray-500">{course.title}</div>
      </div>
      <div className="text-sm text-gray-700">{course.description}</div>
      <div className="text-sm text-gray-700">
        {course.details.length > 20
          ? course.details.substring(0, 100) + "..."
          : course.details}
      </div>
      <div className="text-sm font-medium text-black flex justify-center items-center">
        {
          <FetchCoursesData
            key={course.id}
            coursesData={course}
            updateComponent={fetchAllCourses}
          />
        }
      </div>
    </div>
  );
  const renderUpdateComponent = (course: Course) => (
    <FetchCoursesData
      key={course.id}
      coursesData={course}
      updateComponent={fetchAllCourses}
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
          <CoursesComboBox updateComponent={fetchAllCourses} />
          {allCourses && allCourses.length > 0 ? (
            <>
              {" "}
              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <Table>
                  {renderTableHead(Object.keys(headersMapping), false, true)}
                  {renderTableBody({
                    headersValues: Object.values(headersMapping),
                    idValueName: "id",
                    data: allCourses,
                    renderUpdateComponent: (course: Course) =>
                      renderUpdateComponent(course),
                  })}
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {allCourses.map((course: any, index: number) =>
                  renderMobileCardComponent(course),
                )}
              </div>
            </>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
              There are no Courses, Add One!
            </div>
          )}
          <div className="card mt-4">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={totalRecord ?? 0}
              rowsPerPageOptions={[10, 20, 30]}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
