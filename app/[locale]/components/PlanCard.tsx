'use client';

import { Card, CustomFlowbiteTheme } from "flowbite-react";
import PrimaryButton from './PrimaryButton'
import { useState } from "react";
import PriceModal from "./PriceModal/PriceModal";
function PlanCard({title, price, f1, f2, f3, f4, f5, btn}: any) {
  
  const [openModal, setOpenModal] = useState<string | undefined>(undefined);
  const handleOpenModal = () => {
        setOpenModal('default');
    };

    const handleCloseModal = () => {
        setOpenModal(undefined);
    };


  const customTheme: CustomFlowbiteTheme = {
    card: {
      root: {
        children: "flex h-full flex-col justify-center gap-2 p-6",
      }
    }
  }

  return (
    <Card theme={customTheme.card} className=" h-[450px] w-[300]">
      { 
            openModal === 'default' && 
            <PriceModal
                handleOpen={openModal} 
                handleCloseModal={handleCloseModal} />
        }
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-2xl font-semibold tracking-tight">
          {price}
        </span>
      </div>
      <ul className="my-7 space-y-5 h-[200px]">
        <li className="flex space-x-3 rtl:gap-2">
        <i className="bi bi-check-circle-fill text-sky-600"></i>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            {f1}
          </span>
        </li>
        <li className="flex space-x-3 rtl:gap-2">
        <i className="bi bi-check-circle-fill text-sky-600"></i>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            {f2}
          </span>
        </li>
        <li className="flex space-x-3 rtl:gap-2">
        <i className="bi bi-check-circle-fill text-sky-600"></i>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            {f3}
          </span>
        </li>
        <li className="flex space-x-3 decoration-gray-500 rtl:gap-2">
        <i className="bi bi-check-circle-fill text-sky-600"></i>
          <span className="text-base font-normal leading-tight text-gray-500">
            {f4}
          </span>
        </li>
        <li className="flex space-x-3 decoration-gray-500 rtl:gap-2">
        <i className="bi bi-check-circle-fill text-sky-600"></i>
          <span className="text-base font-normal leading-tight text-gray-500">
            {f5}
          </span>
        </li>
      </ul>
      <PrimaryButton 
        ourStyle="bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] py-4 px-12 shadow rounded-full w-50 mx-auto mt-5 max-md:py-2.5 max-md:px-10 max-md:w-45"
        text={btn}
        onClick={handleOpenModal}
      />
    </Card>
  )
}

export default PlanCard