'use client';

import {CustomFlowbiteTheme, Datepicker, Modal} from 'flowbite-react';
import {useState} from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import {Calendar} from "primereact/calendar";
import {Nullable} from "primereact/ts-helpers";



export default function PriceModal({handleOpen, handleCloseModal}: {
    handleOpen: string; handleCloseModal: () => void }) {
    const [dateValue, setDateValue] = useState<Nullable<Date>>(new Date());

  const customeTheme: CustomFlowbiteTheme['modal'] = {
    body: {
      base: "p-4 flex-1 overflow-auto"
    },
    header: {
      base: "flex items-start justify-between rounded-t border-none",
    }
  }

  return (
    <>
      <Modal show={true} onClose={handleCloseModal} size={"5xl"}>
        <Modal.Header theme={customeTheme.header}></Modal.Header>
        <Modal.Body theme={customeTheme.body}>
            <div className={"flex flex-col justify-center items-center gap-8"}>
            <h2>Choose Your Date</h2>
            <Calendar inline value={dateValue} onChange={(e) => {
                setDateValue(e.value)
                console.log(e.value)}}
                      showTime
                      hourFormat="12"
                      className={"border-4 border-secondary-color rounded-xl"}></Calendar>
                <button className={
                    "bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] w-52 h-12 my-auto px-16 rounded-full"
                }
                >Confirm</button>
            </div>
            </Modal.Body>
      </Modal>
    </>
  )
}
