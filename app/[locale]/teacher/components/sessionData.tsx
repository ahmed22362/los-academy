"use client";

import { convertDateTimeZone } from "@/helpers/convertDateAndTime";
import Cookies from "universal-cookie";

export default function sessionData({data, updateComponent}:{data: any, updateComponent: () => void}) {

    const session = data && data;
    const convertDate = convertDateTimeZone;
    const cookies = new Cookies()

    const acceptDate = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/accept-reschedule`, {
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
            updateComponent()
        }).catch(err => {
            console.log(err)
        })
    }
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
            updateComponent()
        }).catch(err => {
            console.log(err)
        })
    }

    return (
    <div className={"bg-white-color px-10 py-5 rounded-[16px] flex flex-col gap-2 items-center w-full my-4 flex-wrap"}>
        <span>{session.id}</span>
        <div className={"flex flex-col gap-2"}>
            <p className={"font-semibold text-base"}>{`Old Date(${convertDate(session.oldDate, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "D-MMM-YYYY")})`}</p>
            <p className={"font-semibold text-base"}>{`New Date(${convertDate(session.newDate, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "D-MMM-YYYY")})`}</p>
        </div>
        <div className={"flex gap-5 items-center"}>
            <button className={"smallBtn bg-success-color hover:bg-green-300"}
                onClick={acceptDate}
                >Accept
            </button>
            <button className={"smallBtn bg-danger-color hover:bg-red-300"}
                onClick={denyDate}
                >Deny
            </button>
        </div>
    </div>
  )
}
