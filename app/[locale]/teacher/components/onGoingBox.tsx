"use client";

import useCountDown from "@/helpers/useCountDown";
import Link from "next/link";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import AddReportModal from "./addReportModal";
import { convertDateTimeZone } from "@/helpers/convertDateAndTime";

export default function OnGoingBox(session: any) {

    const upComingSession = session.session && session.session
    
    // handle buttons

    const [isJoin, setIsJoin] = useState(false)

    const [countdownSeconds, setCountdownSeconds] = useState(0);
    const cookies = new Cookies()
    const toast = useRef<any>(null);
    const [openModal, setOpenModal] = useState(false)
    const convertTimeZone = convertDateTimeZone
    const handleOpen = () => {
        setOpenModal(true)
    }
    const handleClose = () => {
        setOpenModal(false)
    }
    const showSuccess = (message: string) => {
        
        toast.current?.show({severity:'success', summary: 'Success', detail: message, life: 3000});
    }
    const showError = (message: string) => {
        toast.current?.show({severity:'error', summary: 'Error', detail: message, life: 4000});
    }

    // Convert session time to a Date object
    const sessionDate: any = convertTimeZone(upComingSession.sessionDate, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "MMM D,YYYY h:mm A");
    // console.log(sessionDate)
    const ourSessionDate = new Date(sessionDate)
    // Get the current time
    const currentDate: any = new Date();
     // Get the timezone offset in minutes and convert it to milliseconds
     const timezoneOffset = currentDate.getTimezoneOffset() * 60 * 1000;
    // Calculate the time difference in milliseconds
    const timeDifference = ourSessionDate.getTime() - currentDate.getTime();

    // Convert milliseconds to seconds
    const secondsDifference = Math.max(0, Math.floor(timeDifference / 1000));


    // Counter down Functionality
    useEffect(() => {
        let timeoutId: any;
        const handleCountdown = () => {
            if (countdownSeconds > 0) {
                setCountdownSeconds((prevSeconds) => prevSeconds - 1);
                timeoutId = setTimeout(handleCountdown, 1000);
            }
        };

        if (countdownSeconds > 0) {
            timeoutId = setTimeout(handleCountdown, 1000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [countdownSeconds]);

    // Format time in minutes and seconds
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleUpdateAttendance = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/updateTeacherAttendance`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.get("token")}`,
            },
            body: JSON.stringify({
                sessionId: upComingSession.id
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.status === 'success') {
                showSuccess(data.message)
            } else {
                showError(data.message)
            }
        }).catch(err => {
            console.log(err)
            showError(err.message)
        })
    }

   

    

    return(
        <div className={"bg-white-color p-5 rounded-[16px] "}>
            <Toast ref={toast} />
            <h3 className="mb-3">Session with: <b>{upComingSession && upComingSession.SessionInfo.user.name}</b></h3>
            <div className={"flex flex-col items-start text-md font-semibold text-[black-color-one]"}>
    
            </div>
 
            <AddReportModal 
                sessionID={upComingSession.id}
                openAssignModal={openModal}
                handleCloseModal={handleClose}
            
            />
        </div>
    )
}
