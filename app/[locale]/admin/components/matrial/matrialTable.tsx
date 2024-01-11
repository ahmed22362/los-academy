"use client";

import { CustomFlowbiteTheme, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import MatrialComboBox from "./matrialComboBox";
import FetchMatrialData from "./fetchMatrialData";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

export default function MatrialTable() {
  const [allMartial, setAllMatrial]: any = useState([]);
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
    return allMartial.slice(first, endIndex);
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
  const convertTime = convertDateTimeZone;

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="p-5">
          <MatrialComboBox updateComponent={fetchAllMaterials} />
          {allMartial && allMartial.length > 0 ? (
            <>
              {" "}
              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <Table>
                  <Table.Head theme={customTheme.head}>
                    <Table.HeadCell theme={customTheme.head}>
                      #ID
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Resource Title
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Course
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Up to Age
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Added on
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Status
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Download
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      options
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y divide-gray-100">
                    {displayedMaterials.map((martial: any, index: number) => (
                      <Table.Row
                        key={martial.id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {martial.id}
                        </Table.Cell>
                        <Table.Cell>{martial.name}</Table.Cell>
                        <Table.Cell>{martial.course}</Table.Cell>
                        <Table.Cell>{martial.age}</Table.Cell>
                        <Table.Cell>
                          {convertTime(
                            martial.createdAt,
                            "UTC",
                            Intl.DateTimeFormat().resolvedOptions().timeZone,
                            "MMM D,YYYY h:mm A",
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          {martial.status === "new Arrival" ? (
                            <div className="bg-danger-color p-2 rounded-full text-white font-semibold capitalize">
                              {martial.status}
                            </div>
                          ) : martial.status === "active" ? (
                            <div className="bg-success-color p-2 rounded-full text-white font-semibold capitalize">
                              {martial.status}
                            </div>
                          ) : (
                            <div className="bg-warning-color p-2 rounded-full text-white font-semibold capitalize">
                              {martial.status}
                            </div>
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex items-center justify-center">
                            <Link
                              href={martial.b2Link}
                              download={martial.b2Link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <GrDocumentDownload className="text-2xl cursor-pointer" />
                            </Link>
                          </div>
                        </Table.Cell>
                        <FetchMatrialData
                          key={index}
                          martialData={martial}
                          updateComponent={fetchAllMaterials}
                        />
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {displayedMaterials.map((material: any, index: number) => (
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
                          #{material.id}
                        </a>
                      </div>
                      <div className="text-gray-500">{material.name}</div>
                    </div>
                    <div className="text-sm text-gray-700">
                      {material.course}
                    </div>
                    <div className="text-sm text-gray-700">{material.age}</div>
                    <div className="text-sm font-medium text-black flex justify-center items-center">
                      {
                        <FetchMatrialData
                          key={index}
                          martialData={material}
                          updateComponent={fetchAllMaterials}
                        />
                      }
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
              There are no Materials, Add One!
            </div>
          )}
        </div>
      )}
    </>
  );
}
