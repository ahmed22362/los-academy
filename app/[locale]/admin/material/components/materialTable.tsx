"use client";

import { Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import MartialComboBox from "./materialComboBox";
import { GrDocumentDownload } from "react-icons/gr";
import FetchMartialData from "./deleteMaterialData";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { Material } from "@/types";
import {
  renderTableBody,
  renderTableHead,
} from "@/app/[locale]/components/genericTableComponent/table.component";
import Link from "next/link";
import StatusBadge from "@/utilities/StatusBadge";

const headersMapping: Record<string, keyof Material> = {
  "#ID": "id",
  "Material Name": "name",
  Course: "course",
  Age: "age",
  "Created At": "createdAt",
  Status: "status",
  "Download Link": "b2Link",
};
export const renderLinkComponent = (link: string) => (
  <div className="flex items-center justify-center">
    <Link
      href={link ?? ""}
      download={link ?? ""}
      target="_blank"
      rel="noopener noreferrer"
    >
      <GrDocumentDownload className="text-2xl cursor-pointer" />
    </Link>
  </div>
);
export default function MaterialTable({ isTeacher }: { isTeacher?: boolean }) {
  const [allMaterial, setAllMartial]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(1);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    fetchAllMaterials(event.rows, event.first / event.rows + 1);
  };

  const fetchAllMaterials = (limit?: number, page?: number) => {
    setIsLoading(true);
    let url = `${process.env.NEXT_PUBLIC_APIURL}/material`;
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
        setAllMartial(data.data);
        setTotalRecords(data.length);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const renderUpdateComponent = (material: Material) => (
    <FetchMartialData
      key={material.id}
      martialData={material}
      updateComponent={fetchAllMaterials}
    />
  );

  const renderCardComponent = (material: Material) => (
    <div key={material.id} className="bg-white space-y-3 p-4 rounded-lg shadow">
      <div className="flex items-center space-x-2 text-sm">
        <div>
          <a href="#" className="text-blue-500 font-bold hover:underline">
            #{material.id}
          </a>
        </div>
        <div className="text-gray-500">{material.name}</div>
      </div>
      <div className="text-sm text-gray-700">{`The Material is for Course: ${material.course}`}</div>
      <div className="text-sm text-gray-700">{`And Suitable for students of Age: ${material.age} Years Old`}</div>
      <span className="text-sm text-gray-700">{`ًWith Status: `}</span>
      {<StatusBadge status={material.status} />}
      <div className="text-sm text-gray-700">{`And Can Downloaded from here :`}</div>
      {renderLinkComponent(material.b2Link)}
      {!isTeacher && (
        <div className="text-sm font-medium text-black flex justify-center items-center">
          {renderUpdateComponent(material)}
        </div>
      )}
    </div>
  );
  useEffect(() => {
    fetchAllMaterials(rows, 1);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="p-5">
          <MartialComboBox updateComponent={fetchAllMaterials} />
          {allMaterial && allMaterial.length > 0 ? (
            <>
              {" "}
              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <Table>
                  {renderTableHead(
                    Object.keys(headersMapping),
                    false,
                    !isTeacher,
                  )}
                  {renderTableBody({
                    headersValues: Object.values(headersMapping),
                    idValueName: "id",
                    data: allMaterial,
                    renderUpdateComponent: isTeacher
                      ? undefined
                      : (material: Material) => renderUpdateComponent(material),
                  })}
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {allMaterial.map((material: Material, index: number) =>
                  renderCardComponent(material),
                )}
              </div>
            </>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
              There are no Materials, Add One!
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
