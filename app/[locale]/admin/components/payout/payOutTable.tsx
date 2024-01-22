"use client";

import { CustomFlowbiteTheme, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import PayOutComboBox from "./payOutComboBox";
import FetchPayOutData from "./fetchPayOutData";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { convertDateTimeZone } from "@/utilities";
import StatusBadge from "@/utilities/StatusBadge";

export default function PayOutTable() {
  const [allPayOuts, setAllPayOuts]: any = useState([]);
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
    return allPayOuts.slice(first, endIndex);
  };
  const displayedPayOuts = getPaginatedData();

  const customTheme: CustomFlowbiteTheme["table"] = {
    head: {
      base: "group/head text-xs uppercase text-black-color-one bg-white-color p-[15px] text-center",
      cell: {
        base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-white-color px-6 py-3",
      },
    },
  };

  const fetchAllPayOuts = () => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/payout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllPayOuts(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAllPayOuts();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="p-5">
          <PayOutComboBox updateComponent={fetchAllPayOuts} />
          {allPayOuts && allPayOuts.length > 0 ? (
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
                      Date Time
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Amount
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Status
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      options
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y divide-gray-100">
                    {displayedPayOuts.map((payout: any, index: number) => (
                      <Table.Row
                        key={payout.id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {payout.id}
                        </Table.Cell>
                        <Table.Cell>{payout.teacher.name}</Table.Cell>
                        <Table.Cell>
                          {convertDateTimeZone(
                            payout.createdAt,
                            "UTC",
                            Intl.DateTimeFormat().resolvedOptions().timeZone,
                            "YYYY-MM-DD h:mm A",
                          )}
                        </Table.Cell>
                        <Table.Cell>{payout.amount}$</Table.Cell>
                        <Table.Cell>
                          <StatusBadge status={payout.status} />
                        </Table.Cell>
                        <FetchPayOutData
                          key={index}
                          payOutData={payout}
                          updateComponent={fetchAllPayOuts}
                        />
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {displayedPayOuts.map((payout: any, index: number) => (
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
                          #{payout.id}
                        </a>
                      </div>
                      <div className="text-gray-500">{payout.name}</div>
                    </div>
                    <div className="text-sm text-gray-700">{payout.course}</div>
                    <div className="text-sm text-gray-700">{payout.age}</div>
                    <div className="text-sm font-medium text-black flex justify-center items-center">
                      {
                        <FetchPayOutData
                          key={index}
                          payOutData={payout}
                          updateComponent={fetchAllPayOuts}
                        />
                      }
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
              There are no Transactions, Add One!
            </div>
          )}
        </div>
      )}
    </>
  );
}
