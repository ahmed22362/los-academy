"use client";

import { convertDateTimeZone } from "@/helpers/convertDateAndTime";
import Cookies from "universal-cookie";
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import AcceptRescheduleModal from "./acceptReschedule";

export default function sessionData({data, updateComponent}:{data: any, updateComponent: () => void}) {

    const session = data && data;

    const convertDate = convertDateTimeZone;
    
    const cookies = new Cookies()

    const toast = useRef<Toast>(null);
    const [openModal, setOpenModal] = useState(false)
    const showSuccess = () => {
        
        toast.current?.show({severity:'success', summary: 'Success', detail:'Accepted Success', life: 3000});
    
    }
    const showError = () => {
        toast.current?.show({severity:'error', summary: 'Error', detail:'Deny Success', life: 4000});
      }

      const handleOpenModal = () => {
        setOpenModal(true)
      }

      const handleCloseModal = () => {
        setOpenModal(false)
      }

    // const acceptDate = () => {
    //     fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/accept-reschedule`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${cookies.get("token")}`,
    //         },
    //         body: JSON.stringify({
    //             rescheduleRequestId: session.id
    //         })
    //     }).then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //         showSuccess()
    //         updateComponent()
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }
    const denyDate = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/decline-reschedule`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.get("token")}`,
            },
            body: JSON.stringify({
                rescheduleRequestId: session.id
            })
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            showError()
            updateComponent()
        }).catch(err => {
            console.log(err)
        })
    }

    return (
    <div className={"bg-white-color px-10 py-5 rounded-[16px] flex flex-col gap-2 items-center w-full my-4 flex-wrap"}>
        <Toast ref={toast} />
        <span>Session ID: {session.sessionId}</span>
        <div className={"flex flex-col gap-2"}>
            <p className={"font-semibold text-base"}>{`Old Date:(${convertDate(session.oldDate, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "D-MMM-YYYY hh:mm A")})`}</p>
            <p className={"font-semibold text-base"}>New Date Range :</p>
            <span>From: {convertDate(session.newDateStartRange, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "D-MMM-YYYY hh:mm A")}</span>
            <span>To: {convertDate(session.newDateEndRange, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "D-MMM-YYYY hh:mm A")}</span>
        </div>
        <div className={"flex gap-5 items-center"}>
            <button className={"smallBtn bg-success-color hover:bg-green-300"}
                onClick={handleOpenModal}
                >Accept
            </button>
            <button className={"smallBtn bg-danger-color hover:bg-red-300"}
                onClick={denyDate}
                >Deny
            </button>
            <AcceptRescheduleModal
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                session={session}
                updateComponent={updateComponent}
            />
        </div>
    </div>
  )
}
