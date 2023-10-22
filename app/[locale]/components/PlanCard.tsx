'use client';

import { Card, CustomFlowbiteTheme } from "flowbite-react";

function PlanCard({title, price, f1, f2, f3, f4, f5}: any) {
  
  const customTheme: CustomFlowbiteTheme = {
    card: {
      root: {
        children: "flex h-full flex-col justify-center gap-2 p-6",
      }
    }
  }
  
  return (
    <Card theme={customTheme.card} className=" h-[450px] w-[300]">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-2xl font-semibold tracking-tight">
          {price}
        </span>
      </div>
      <ul className="my-7 space-y-5 h-[200px]">
        <li className="flex space-x-3">
        <i className="bi bi-check-circle-fill text-sky-600"></i>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            {f1}
          </span>
        </li>
        <li className="flex space-x-3">
        <i className="bi bi-check-circle-fill text-sky-600"></i>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            {f2}
          </span>
        </li>
        <li className="flex space-x-3">
        <i className="bi bi-check-circle-fill text-sky-600"></i>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            {f3}
          </span>
        </li>
        <li className="flex space-x-3 decoration-gray-500">
        <i className="bi bi-check-circle-fill text-sky-600"></i>
          <span className="text-base font-normal leading-tight text-gray-500">
            {f4}
          </span>
        </li>
        <li className="flex space-x-3 decoration-gray-500">
        <i className="bi bi-check-circle-fill text-sky-600"></i>
          <span className="text-base font-normal leading-tight text-gray-500">
            {f5}
          </span>
        </li>
      </ul>
      <button
        className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
        type="button"
      >
        <p>
          Choose plan
        </p>
      </button>
    </Card>
  )
}

export default PlanCard