"use client";

import { CustomFlowbiteTheme, Spinner, Table } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import ContinuitySearchBox from "./GenericSearchBox";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import StatusCard from "./statusCard.component";
import { showError, showSuccess } from "@/utilities/toastMessages";
export interface Status {
  sessionInfoId: number;
  sessionDate: string;
  continueStatus: string | null;
  userName: string;
  userEmail: string;
  teacherName: string;
  teacherEmail: string;
}

export default function StatusTable() {
  const [allStatus, setAllStatus] = useState<Status[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);

  const toast = useRef<Toast>(null);

  const cookies = new Cookies();
  const customTheme: CustomFlowbiteTheme["table"] = {
    head: {
      base: "group/head text-xs uppercase text-black-color-one bg-white-color p-[15px] text-center",
      cell: {
        base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-white-color px-6 py-3",
      },
    },
  };

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const headersMapping: Record<string, keyof Status> = {
    ID: "sessionInfoId",
    "Session Date": "sessionDate",
    "User Name": "userName",
    "User Email": "userEmail",
    "Teacher Name": "teacherName",
    "Teacher Email": "teacherEmail",
    "Will Continue": "continueStatus",
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    fetchAllStatus(event.rows, event.first / event.rows + 1);
  };

  const fetchAllStatus = (limit: number, page: number) => {
    fetch(
      `${process.env.NEXT_PUBLIC_APIURL}/session/continueAbstract?limit=${limit}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((res) => {
        if (res.status) setAllStatus(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        showError("Error while fetching data", toast);
        console.log("here in catch!");
      });
  };
  useEffect(() => {
    fetchAllStatus(rows, 1);
  }, []);

  const updateStatus = (statusId: number, newStatus: string) => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/updateSessionContinuity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify({
        status:
          newStatus.length === 0 ? null : newStatus === "true" ? true : false,
        sessionInfoId: statusId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((res) => {
        if (res.data) {
          setAllStatus(
            allStatus.map((status) =>
              status.sessionInfoId === statusId
                ? { ...status, continueStatus: newStatus }
                : status,
            ),
          );
          showSuccess("Status Updated Successfully", toast);
        }
      })
      .catch((err) => {
        console.log(err);
        showError("Error while updating status", toast);
      });
  };

  const idClasses =
    "whitespace-nowrap font-medium text-gray-900 text-center dark:text-white";
  const renderTableHead = () => (
    <Table.Head theme={customTheme.head}>
      {Object.keys(headersMapping).map((header, index) => (
        <Table.HeadCell key={index} theme={customTheme.head}>
          {header}
        </Table.HeadCell>
      ))}
    </Table.Head>
  );
  const renderContinueCell = (status: any) => {
    return (
      <div className="text-sm text-gray-700 w-fit mx-auto  flex items-center justify-center gap-4">
        <select
          className="rounded-md"
          defaultValue={
            status.continueStatus === true
              ? "true"
              : status.continueStatus === false
              ? "false"
              : ""
          }
          onChange={(e) => {
            setSelectedStatusId(status.sessionInfoId);
            updateStatus(status.sessionInfoId, e.target.value);
          }}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
          <option value="">No Response</option>
        </select>
      </div>
    );
  };
  const renderTableRow = (status: Status, index: number) => (
    <Table.Row
      key={index}
      className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
    >
      {Object.values(headersMapping).map((header, index) => (
        <Table.Cell
          key={index}
          className={header === "sessionInfoId" ? idClasses : ""}
        >
          {header === "continueStatus"
            ? renderContinueCell(status)
            : status[header]}
        </Table.Cell>
      ))}
    </Table.Row>
  );

  const renderStatusCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
      {allStatus.map((status: Status, index: number) => (
        <StatusCard key={index} status={status} />
      ))}
    </div>
  );

  const renderNoStatusMessage = () => (
    <div className="bg-yellow-100 text-black-800 p-4 rounded-md">
      There are no Status yet!
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <ContinuitySearchBox />
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="">
          {allStatus && allStatus.length > 0 ? (
            <>
              {" "}
              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <Table>
                  {renderTableHead()}
                  <Table.Body className="divide-y divide-gray-100">
                    {allStatus.map((status: any, index: number) =>
                      renderTableRow(status, index),
                    )}
                  </Table.Body>
                </Table>
              </div>
              {renderStatusCards()}
            </>
          ) : (
            renderNoStatusMessage()
          )}
          <div className="card mt-4">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={allStatus?.length ?? 0}
              rowsPerPageOptions={[10, 20, 30]}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
