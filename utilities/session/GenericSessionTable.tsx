"use client";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { convertDateTimeZone } from "@/utilities";
import getDateAfter from "@/utilities/getDateAfterDuration";
import {
  renderTableBody,
  renderTableHead,
} from "@/app/[locale]/components/genericTableComponent/table.component";
import { Session } from "@/types";

export default function GenericSessionsTable({
  headersMapping,
  fetchFunction,
  renderSearchBox,
  totalRecords,
  allSessions,
  renderMobileCardComponent,
  isLoading,
  renderUpdateComponent,
}: {
  headersMapping: Record<string, keyof Session | string>;
  fetchFunction: (limit?: number, page?: number) => void;
  renderSearchBox: () => JSX.Element;
  totalRecords: number;
  allSessions: Session[];
  renderMobileCardComponent: (data: any, index?: number) => JSX.Element;
  isLoading: boolean;
  renderUpdateComponent?: (session: Session) => JSX.Element;
}) {
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    fetchFunction(event.rows, event.first / event.rows + 1);
  };
  useEffect(() => {
    fetchFunction();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="p-5">
          {renderSearchBox()}
          {allSessions && allSessions.length > 0 ? (
            <>
              {" "}
              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <Table>
                  {renderTableHead(
                    Object.keys(headersMapping),
                    false,
                    renderUpdateComponent ? true : false,
                  )}
                  {renderTableBody({
                    headersValues: Object.values(headersMapping),
                    idValueName: "id",
                    data: allSessions,
                    renderUpdateComponent: renderUpdateComponent
                      ? (session: Session) => renderUpdateComponent(session)
                      : undefined,
                  })}
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {allSessions.map((session: any, index: number) =>
                  renderMobileCardComponent(session, index),
                )}
              </div>
            </>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
              There are no sessions for now!
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
