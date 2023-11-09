'use client';

import {CustomFlowbiteTheme, Datepicker, Modal} from 'flowbite-react';
import {useEffect, useState, useRef} from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import {Calendar} from "primereact/calendar";
import {Nullable} from "primereact/ts-helpers";
import { Label, Radio } from 'flowbite-react';



export default function PriceModal({handleOpen, handleCloseModal, targetComponent}: {
    handleOpen: boolean; handleCloseModal: () => void, targetComponent: number }) {
    const [dateValue, setDateValue] = useState<Nullable<Date>>(new Date());
    const modalRef = useRef<HTMLDivElement>(null);
    
  const customeTheme: CustomFlowbiteTheme['modal'] = {
    body: {
      base: "p-4 flex-1 overflow-auto"
    },
    header: {
      base: "flex items-start justify-between rounded-t border-none",
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (handleOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
}, [handleOpen, handleCloseModal]);
  if (!handleOpen) {
    return null;
  }


  return (
    <>
      <Modal ref={modalRef} show={handleOpen} onClose={handleCloseModal} size={"5xl"} id={"ourModal"}>
        <Modal.Header theme={customeTheme.header}></Modal.Header>
        <Modal.Body theme={customeTheme.body}>
            <div className={"flex flex-col justify-center items-center gap-8"}>
                {targetComponent === 1 ? (
                    <>
                        <fieldset
                            className="flex max-w-md flex-col gap-4"
                            id="radio"
                        >
                            <legend className="mb-4">
                                Create the plan that’s right for you
                            </legend>
                            <div className={"flex flex-row gap-4"}>
                            <div className="flex items-center gap-2">
                                <Radio
                                    defaultChecked
                                    id="united-state"
                                    name="countries"
                                    value="USA"
                                />
                                <Label htmlFor="united-state">
                                    United States
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Radio
                                    id="germany"
                                    name="countries"
                                    value="Germany"
                                />
                                <Label htmlFor="germany">
                                    Germany
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Radio
                                    id="spain"
                                    name="countries"
                                    value="Spain"
                                />
                                <Label htmlFor="spain">
                                    Spain
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Radio
                                    id="uk"
                                    name="countries"
                                    value="United Kingdom"
                                />
                                <Label htmlFor="uk">
                                    United Kingdom
                                </Label>
                            </div>
                            </div>
                        </fieldset>
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
                    </>
                ) : (
                    <>
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
                </>
                )}
            </div>
            </Modal.Body>
      </Modal>
    </>
  )
}
