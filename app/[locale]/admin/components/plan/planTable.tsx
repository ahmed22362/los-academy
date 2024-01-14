"use client";

import { CustomFlowbiteTheme, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import PlanComboBox from "./planComboBox";
import FetchPlanData from "./fetchPlanData";
import Cookies from "universal-cookie";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

export default function PlanTable() {
  const [allPlans, setAllPlan]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const customTheme: CustomFlowbiteTheme["table"] = {
    head: {
      base: "group/head text-xs uppercase text-black-color-one bg-white-color p-[15px] text-center",
      cell: {
        base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-white-color px-6 py-3",
      },
    },
  };
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  const getPaginatedData = () => {
    const endIndex = first + rows;
    return allPlans.slice(first, endIndex);
  };
  const displayedPlans = getPaginatedData();
  const fetchAllPlans = () => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/plan`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.data.sort((x: any, y: any) => x.id - y.id);
        console.log(sortedData);
        setAllPlan(sortedData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAllPlans();
  }, []);

  const updateComponent = () => {
    fetchAllPlans();
  };

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
                  <Table.Head theme={customTheme.head}>
                    <Table.HeadCell theme={customTheme.head}>
                      #ID
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Title
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Session Duration
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Sessions Count
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Sessions Per Week
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Price
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Recommended
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Discount
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      Status
                    </Table.HeadCell>
                    <Table.HeadCell theme={customTheme.head}>
                      options
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y divide-gray-100">
                    {displayedPlans.map((plan: any, index: number) => (
                      <Table.Row
                        key={index}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {plan.id}
                        </Table.Cell>
                        <Table.Cell>{plan.title}</Table.Cell>
                        <Table.Cell>{plan.sessionDuration}</Table.Cell>
                        <Table.Cell>{plan.sessionsCount}</Table.Cell>
                        <Table.Cell>{plan.sessionsPerWeek}</Table.Cell>
                        <Table.Cell>{plan.price}$</Table.Cell>
                        <Table.Cell>
                          <Recommend recommended={plan.recommended} />
                        </Table.Cell>
                        <Table.Cell>{plan.discount}</Table.Cell>
                        <Table.Cell>
                          <Active active={plan.active} />
                        </Table.Cell>
                        <Table.Cell>
                          <FetchPlanData
                            key={index}
                            planData={plan}
                            updateComponent={updateComponent}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {displayedPlans.map((plan: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white space-y-3 p-4 rounded-lg shadow"
                  >
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
                    <div className="text-sm text-gray-700 w-fit w-fit flex justify-center items-center gap-4">
                      {`Plan Status? `}
                      <Active active={plan.active} />
                    </div>
                    <div className="text-sm font-medium text-black flex justify-center items-center">
                      {
                        <FetchPlanData
                          key={index}
                          planData={plan}
                          updateComponent={updateComponent}
                        />
                      }
                    </div>
                  </div>
                ))}
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
              totalRecords={allPlans.length ?? 0}
              rowsPerPageOptions={[10, 20, 30]}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </>
  );
}

function Recommend({ recommended }: { recommended: boolean }) {
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

function Active({ active }: { active: boolean }) {
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
