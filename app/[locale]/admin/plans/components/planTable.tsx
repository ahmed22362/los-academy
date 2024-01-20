"use client";

import { Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import PlanComboBox from "./planComboBox";
import FetchPlanData from "./deletePlanData";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import {
  renderTableBody,
  renderTableHead,
} from "@/app/[locale]/components/genericTableComponent/table.component";
interface Plan {
  id: number;
  title: string;
  sessionDuration: number;
  sessionsCount: number;
  sessionsPerWeek: number;
  price: number;
  recommended: boolean;
  discount: number;
  active: boolean;
}
export default function PlanTable() {
  const [allPlans, setAllPlan]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(1);

  const headersMapping: Record<string, keyof Plan> = {
    "#ID": "id",
    Title: "title",
    "Session Duration": "sessionDuration",
    "Sessions Count": "sessionsCount",
    "Sessions Per Week": "sessionsPerWeek",
    Price: "price",
    Recommended: "recommended",
    Discount: "discount",
    Status: "active",
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    fetchAllPlans(event.rows, event.first / event.rows + 1);
  };
  const fetchAllPlans = (limit?: number, page?: number) => {
    setIsLoading(true);
    let url = `${process.env.NEXT_PUBLIC_APIURL}/plan`;
    if (limit !== undefined) {
      url += `?limit=${limit}`;
      if (page !== undefined) {
        url += `&page=${page}`;
      }
    } else if (page !== undefined) {
      url += `?page=${page}`;
    }
    console.log(url);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("here is sorted plan");
        const sortedData = data.data.sort((x: any, y: any) => x.id - y.id);
        setAllPlan(sortedData);
        setTotalRecords(data.length);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAllPlans(rows, 1);
  }, []);

  const renderUpdateComponent = (plan: Plan) => (
    <FetchPlanData
      key={plan.id}
      planData={plan}
      updateComponent={fetchAllPlans}
    />
  );

  const renderCardComponent = (plan: Plan, index: number) => (
    <div key={index} className="bg-white space-y-3 p-4 rounded-lg shadow">
      <div className="flex items-center space-x-2 text-sm">
        <div>
          <span className="text-blue-500 font-bold hover:underline">
            #{plan.id}
          </span>
        </div>
        <div className="text-gray-500">{`Plan: ${plan.title}`}</div>
      </div>
      <div className="text-sm text-gray-700">
        {`This plan offers: `}
        <strong>{plan.sessionsCount}</strong>
        {` Sessions with Duration `}
        <strong>{plan.sessionDuration}</strong>
        {` And `}
        <strong>{plan.sessionsPerWeek}</strong>
        {` Sessions per week!`}
        {` With Price: `}
        <strong>{plan.price} $</strong>
      </div>
      <div className="text-sm text-gray-700 w-fit flex justify-center items-center gap-4">
        {`This Plan Recommended?   `}
        <Recommend recommended={plan.recommended} />
      </div>
      <div className="text-sm text-gray-700 w-fit  flex justify-center items-center gap-4">
        {`Plan Status? `}
        <Active active={plan.active} />
      </div>
      <div className="text-sm font-medium text-black flex justify-center items-center">
        {renderUpdateComponent(plan)}
      </div>
    </div>
  );
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="p-5">
          <PlanComboBox updateComponent={fetchAllPlans} />
          {allPlans && allPlans.length > 0 ? (
            <>
              {" "}
              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <Table>
                  {renderTableHead(Object.keys(headersMapping), false, true)}
                  {renderTableBody({
                    headersValues: Object.values(headersMapping),
                    idValueName: "id",
                    data: allPlans,
                    renderUpdateComponent: (plan: Plan) =>
                      renderUpdateComponent(plan),
                  })}
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {allPlans.map((plan: any, index: number) =>
                  renderCardComponent(plan, index),
                )}
              </div>
            </>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
              There are no Plans, Add One!
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

export function Recommend({ recommended }: { recommended: boolean }) {
  return recommended === true ? (
    <p className="bg-success-color text-white px-2 py-1 rounded-full font-semibold w-fit p-3">
      Yes
    </p>
  ) : (
    <p className="bg-danger-color text-white px-2 py-1 rounded-full font-semibold w-fit p-3">
      No
    </p>
  );
}

export function Active({ active }: { active: boolean }) {
  return active === true ? (
    <p className="bg-success-color text-white px-4 py-1 rounded-full font-semibold w-fit p-3">
      Active
    </p>
  ) : (
    <p className="bg-danger-color text-white px-4 py-1 rounded-full font-semibold w-fit p-3">
      Inactive
    </p>
  );
}
