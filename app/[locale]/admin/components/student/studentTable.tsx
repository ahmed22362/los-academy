"use client";

import { CustomFlowbiteTheme, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import FetchStudentData from "./fetchStudentData";
import StudentComboBox from "./studentComboBox";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import ContactOptions from "./contactOptionsComponent";

export default function StudentTable() {
  const [allStudents, setAllStudents]: any = useState([]);
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
    return allStudents.slice(first, endIndex);
  };
  const displayedStudents = getPaginatedData();

  const customTheme: CustomFlowbiteTheme["table"] = {
    head: {
      base: "group/head text-xs uppercase text-black-color-one bg-white-color p-[15px] text-center",
      cell: {
        base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-white-color px-6 py-3",
      },
    },
  };

  const fetchAllStudents = () => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllStudents(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAllStudents();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="p-5">
          <StudentComboBox updateComponent={fetchAllStudents} />
          {allStudents && allStudents.length > 0 ? (
            <>
              {" "}
              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <Table>
                  <Table.Head theme={customTheme.head}>
                    <Table.HeadCell theme={customTheme.head}>
                      #ID
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Name
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Email
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Gender
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Age
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Available Free Session
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Remain Paid Sessions
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Contact
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      options
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y divide-gray-100">
                    {displayedStudents.map((student: any, index: number) => (
                      <Table.Row
                        key={index}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {student.id.slice(-4)}
                        </Table.Cell>
                        <Table.Cell>{student.name}</Table.Cell>
                        <Table.Cell>{student.email}</Table.Cell>
                        <Table.Cell>{student.gender}</Table.Cell>
                        <Table.Cell>{student.age}</Table.Cell>
                        <Table.Cell>{student.availableFreeSession}</Table.Cell>
                        <Table.Cell>{student.remainSessions}</Table.Cell>
                        <Table.Cell>
                          <ContactOptions
                            phone={student.phone}
                            email={student.email}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <FetchStudentData
                            key={index}
                            studentData={student}
                            updateComponent={fetchAllStudents}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {displayedStudents.map((student: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white space-y-3 p-4 rounded-lg shadow"
                  >
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
                    <div className="text-sm text-gray-700">{`Email: ${student.email}`}</div>
                    <div className="text-sm text-gray-700">{`Available free session: ${student.availableFreeSession}`}</div>
                    <div className="text-sm text-gray-700">{`Remain Paid session: ${student.remainSessions}`}</div>
                    <div className="text-sm font-medium text-black flex justify-center items-center gap-4">
                      {
                        <>
                          <ContactOptions
                            email={student.email}
                            phone={student.phone}
                          />
                          <FetchStudentData
                            key={index}
                            studentData={student}
                            updateComponent={fetchAllStudents}
                          />
                        </>
                      }
                    </div>
                  </div>
                ))}
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
              totalRecords={allStudents.length ?? 0}
              rowsPerPageOptions={[10, 20, 30]}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
