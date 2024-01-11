"use client";

import { CustomFlowbiteTheme, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import FetchTeacherData from "../teacher/fetchTeacherData";
import TeacherComboBox from "./teacherComboBox";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import ContactOptions from "./contactOptionsComonents";
import { convertDateTimeZone } from "@/utilities";

export default function TeacherTable() {
  const [allTeachers, setAllTeachers]: any = useState([]);
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
    return allTeachers.slice(first, endIndex);
  };
  const displayedTeachers = getPaginatedData();

  const customTheme: CustomFlowbiteTheme["table"] = {
    head: {
      base: "group/head text-xs uppercase text-black-color-one bg-white-color p-[15px] text-center",
      cell: {
        base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-white-color px-6 py-3",
      },
    },
  };

  const fetchAllTeachers = () => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher`, {
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

  useEffect(() => {
    fetchAllTeachers();
  }, []);

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
                  <Table.Head theme={customTheme.head}>
                    <Table.HeadCell theme={customTheme.head}>
                      #ID
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Name
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Role
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Sessions Completed
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Session Cost
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Joined Date
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Contact
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      options
                    </Table.HeadCell>
                  </Table.Head>

                  <Table.Body className="divide-y divide-gray-100">
                    {displayedTeachers.map((teacher: any, index: number) => (
                      <Table.Row
                        key={index}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {teacher.id.slice(-4)}
                        </Table.Cell>
                        <Table.Cell>{teacher.name}</Table.Cell>
                        <Table.Cell>{teacher.role}</Table.Cell>
                        <Table.Cell>{teacher.committedSessions}</Table.Cell>
                        <Table.Cell>{teacher.sessionCost}$</Table.Cell>
                        <Table.Cell>
                          {convertDateTimeZone(
                            teacher.createdAt,
                            "UTC",
                            Intl.DateTimeFormat().resolvedOptions().timeZone,
                            "YYYY-MM-DD",
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          <ContactOptions
                            phone={teacher.phone}
                            email={teacher.email}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <FetchTeacherData
                            key={index}
                            teacherData={teacher}
                            updateComponent={fetchAllTeachers}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {displayedTeachers.map((teacher: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white space-y-3 p-4 rounded-lg shadow"
                  >
                    <div className="flex items-center space-x-2 text-sm">
                      <div>
                        <span className="text-blue-500 hover:underline">
                          #{teacher.id.slice(-4)}
                        </span>
                      </div>
                      <div className="text-gray-500 font-bold">
                        {teacher.name}
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">{`Role: ${teacher.role}`}</div>
                    <div className="text-sm text-gray-700">{`Session Committed: ${teacher.committedSessions} With Session Cost of ${teacher.sessionCost}$ `}</div>
                    <div className="text-sm font-medium text-black flex justify-center items-center gap-4">
                      {
                        <>
                          <ContactOptions
                            email={teacher.email}
                            phone={teacher.phone}
                          />
                          <FetchTeacherData
                            key={index}
                            teacherData={teacher}
                            updateComponent={fetchAllTeachers}
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
              There are no Teachers, Add One!
            </div>
          )}
          <div className="card mt-4">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={allTeachers.length ?? 0}
              rowsPerPageOptions={[10, 20, 30]}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
