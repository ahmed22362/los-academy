"use client";

import { CustomFlowbiteTheme, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import MatrialComboBox from "./matrialComboBox";
import FetchMatrialData from "./fetchMatrialData";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

export default function MatrialTable() {
  const [allMatrial, setAllMatrial]: any = useState([]);
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
    return allMatrial.slice(first, endIndex);
  };
  const displayedMaterials = getPaginatedData();
  const customTheme: CustomFlowbiteTheme["table"] = {
    head: {
      base: "group/head text-xs uppercase text-black-color-one bg-white-color p-[15px] text-center",
      cell: {
        base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-white-color px-6 py-3",
      },
    },
  };

  const fetchAllMaterials = () => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/material`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllMatrial(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAllMaterials();
  }, []);

  return (
    // <>
    // <div className={"px-5 py-4"}>
    // <Table>
    //     <Table.Body className="divide-y">
    //         {isLoading ? (
    //             <Table.Row>
    //             <td><Spinner size="xl" /></td>
    //             </Table.Row>
    //          ) :
    //             (allMatrial && allMatrial.length > 0 ? displaydSessions.map((matrial: any, index: number) => {
    //             return(
    //                 <FetchMatrialData key={index} matrialData={matrial} updateComponent={fetchAllMatrials}/>
    //             )
    //         }): (
    //             <p className="p-3">There is No Matrials</p>
    //         ))
    //     }
    //     </Table.Body>
    // </Table>
    // <div className="mt-4">
    //     <Paginator  first={first} rows={rows} totalRecords={allMatrial.length} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />        </div>
    // </div>
    // </>
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="p-5">
          <MatrialComboBox updateComponent={fetchAllMaterials} />
          <div className="overflow-auto rounded-lg shadow hidden md:block">
            <Table>
              <Table.Head theme={customTheme.head}>
                <Table.HeadCell theme={customTheme.head}>#ID</Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                  Resource Title
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>Course</Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                  Up to Age
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                  Added on
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>Status</Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                  Download
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                  options
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-gray-100">
                {allMatrial && allMatrial.length > 0 ? (
                  displayedMaterials.map((course: any, index: number) => (
                    <Table.Row
                      key={course.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {course.id}
                      </Table.Cell>
                      <Table.Cell>{course.title}</Table.Cell>
                      <Table.Cell>{course.description}</Table.Cell>
                      <Table.Cell className="hidden md:table-cell">
                        {course.details.length > 100
                          ? course.details.substring(0, 100) + "..."
                          : course.details}
                      </Table.Cell>
                      <Table.Cell>
                        {convertDateTimeZone(
                          course.createdAt,
                          "UTC",
                          Intl.DateTimeFormat().resolvedOptions().timeZone,
                          "YYYY-MM-DD h:mm A",
                        )}
                      </Table.Cell>
                      <FetchCoursesData
                        coursesData={course}
                        updateComponent={fetchAllCourses}
                      />
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <td colSpan={5} className="p-3 text-center">
                      No courses found
                    </td>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {displayCourses.map((course: any, index: number) => (
              <div
                key={index}
                className="bg-white space-y-3 p-4 rounded-lg shadow"
              >
                <div className="flex items-center space-x-2 text-sm">
                  <div>
                    <a
                      href="#"
                      className="text-blue-500 font-bold hover:underline"
                    >
                      #{course.id}
                    </a>
                  </div>
                  <div className="text-gray-500">{course.title}</div>
                  <div></div>
                </div>
                <div className="text-sm text-gray-700">
                  {course.description}
                </div>
                <div className="text-sm text-gray-700">
                  {course.details.length > 20
                    ? course.details.substring(0, 100) + "..."
                    : course.details}
                </div>
                <div className="text-sm font-medium text-black flex justify-center items-center">
                  {
                    <FetchCoursesData
                      key={index}
                      coursesData={course}
                      updateComponent={fetchAllCourses}
                    />
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
