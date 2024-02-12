"use client";

import { CustomFlowbiteTheme, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import PayOutComboBox from "./payOutComboBox";
import FetchPayOutData from "./fetchPayOutData";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

export default function PayOutTable() {
  const [allPayOuts, setAllPayOuts]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(1);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    fetchAllPayOuts(event.rows, event.first / event.rows + 1);
  };

  const customTheme: CustomFlowbiteTheme["table"] = {
    head: {
      base: "group/head text-xs uppercase text-black-color-one bg-white-color p-[15px] text-center",
      cell: {
        base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-white-color px-6 py-3",
      },
    },
  };

  const fetchAllPayOuts = (limit: number = 10, page: number = 1) => {
    let url = `${process.env.NEXT_PUBLIC_APIURL}/teacher/myPayouts`;
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
        setAllPayOuts(data.data);
        setTotalRecords(data.length);
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
      <PayOutComboBox />
      <div className={"px-5 py-4"}>
        <Table>
          <Table.Head theme={customTheme.head}>
            <Table.HeadCell theme={customTheme.head}>#PayoutID</Table.HeadCell>
            <Table.HeadCell theme={customTheme.head}>Date</Table.HeadCell>
            <Table.HeadCell theme={customTheme.head}>Amount</Table.HeadCell>
            <Table.HeadCell theme={customTheme.head}>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {isLoading ? (
              <Table.Row>
                <td>
                  <Spinner size="xl" />
                </td>
              </Table.Row>
            ) : allPayOuts && allPayOuts.length > 0 ? (
              allPayOuts.map((payOut: any, index: number) => {
                return <FetchPayOutData payOutData={payOut} key={index} />;
              })
            ) : (
              <tr>
                <td className="p-5">There is No Transactions</td>
              </tr>
            )}
          </Table.Body>
        </Table>
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
    </>
  );
}
