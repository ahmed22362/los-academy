"use client";

import { Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import PayOutComboBox from "./payOutComboBox";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import StatusBadge from "@/utilities/StatusBadge";
import { Payout, Teacher } from "@/types";
import {
  renderTableBody,
  renderTableHead,
} from "@/app/[locale]/components/genericTableComponent/table.component";
import { convertDateTimeZone } from "@/utilities";
import FetchPayoutData from "./deletePayoutData";
import { fetchEndPoint } from "@/utilities/fetchDataFromApi";

export default function PayOutTable() {
  const [allPayOuts, setAllPayOuts]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();

  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const [totalRecord, setTotalRecords] = useState(1);
  const teachers = fetchEndPoint<Teacher>("teacher", cookies.get("token"));

  const headersMapping: Record<string, keyof Payout | string> = {
    "#ID": "id",
    "Teacher Name": "teacher.name",
    "Date Time": "createdAt",
    "Amount In $": "amount",
    Status: "status",
  };
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    fetchAllPayOuts(event.rows, event.first / event.rows + 1);
  };

  const fetchAllPayOuts = (limit: number = 10, page: number = 1) => {
    setIsLoading(true);
    let url = `${process.env.NEXT_PUBLIC_APIURL}/payout`;
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
  const renderMobileCardComponent = (payout: Payout) => (
    <div key={payout.id} className="bg-white space-y-3 p-4 rounded-lg shadow">
      <div className="flex items-center space-x-2 text-sm">
        <div>
          <a href="#" className="text-blue-500 font-bold hover:underline">
            #{payout.id}
          </a>
        </div>
        <div className="text-gray-500">{payout.teacher.name}</div>
      </div>
      <div className="text-sm text-gray-700">
        Payed out amount {payout.amount}$
      </div>
      <div className="text-sm text-gray-700">
        At:{" "}
        {convertDateTimeZone(
          payout.createdAt,
          "UTC",
          Intl.DateTimeFormat().resolvedOptions().timeZone,
          "YYYY-MM-DD h:mm A",
        )}
      </div>
      <span className="text-sm text-gray-700 w-fit m-auto">
        {" "}
        Status: {<StatusBadge status={payout.status} />}
      </span>{" "}
      <div className="text-sm font-medium text-black flex justify-center items-center">
        {renderUpdateOptions(payout)}
      </div>
    </div>
  );
  const renderUpdateOptions = (payout: Payout) => (
    <FetchPayoutData
      key={payout.id}
      payout={payout}
      updateComponent={fetchAllPayOuts}
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
          <PayOutComboBox
            updateComponent={fetchAllPayOuts}
            teachers={teachers}
          />
          {allPayOuts && allPayOuts.length > 0 ? (
            <>
              {" "}
              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <Table>
                  {renderTableHead(Object.keys(headersMapping), false, true)}
                  {renderTableBody({
                    headersValues: Object.values(headersMapping),
                    idValueName: "id",
                    data: allPayOuts,
                    renderUpdateComponent: (payout: Payout) =>
                      renderUpdateOptions(payout),
                  })}
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {allPayOuts.map((payout: Payout, index: number) =>
                  renderMobileCardComponent(payout),
                )}
              </div>
            </>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
              There are no Payouts, Add One!
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
