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
    const [isIamHere, setIsIamHere] = useState(true)
    const [isJoin, setIsJoin] = useState(false)
    const [isAbsentAndTaken, setIsAbsentAndTaken] = useState(false)
    const [endMessage, setEndMessage] = useState(false)
    const [sesstionLink, setSesstionLink] = useState('')
    const [started, setIsStarted] = useState(false)
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
    // console.log(timeDifference)
    // Convert milliseconds to seconds
    const secondsDifference = Math.max(0, Math.floor(timeDifference / 1000));
    // handle start the counter
    // useEffect(() => {
    //     console.log(sessionDate)
    //     console.log(currentDate)
    //     console.log(timezoneOffset)
    //     console.log(timeDifference)
    //     console.log(secondsDifference)
    // }, [])
    const handleIAmHereClick = () => {
        if(!started) {
            setCountdownSeconds(secondsDifference);
            setIsStarted(true)
        }
        
    };

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


    // update Component Based on Sessios Status 

    // const stateOfComponent = () => {

    //     if(upComingSession.status === 'ongoing') {
    //         handleIAmHereClick()
    //     } 

    // }

    // Update session attendance For Teacher

    const handleUpdateAttendance = () => {
        console.log(upComingSession.id)
        handleIAmHereClick()
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
                // handleIAmHereClick()
                showSuccess(data.message)
                setIsIamHere(false)
                setIsJoin(true)
            } else {
                showError(data.message)
            }
        }).catch(err => {
            console.log(err)
            showError(err.message)
        })
    }

    const updateSessionStatus = (status: string) => {
        console.log({
            sessionId: upComingSession.id,
            status: status.toString()
        })
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/status`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.get("token")}`,
            },
            body: JSON.stringify({
                sessionId: upComingSession.id,
                status: status.toString()
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(status !== 'ongoing') {
                showSuccess(data.message)
                setIsAbsentAndTaken(false)
                setEndMessage(true)
                setIsIamHere(false)
                setSesstionLink("")
            } 
            if(data.status === 'success') {
                showSuccess(data.message)
            }
        }).catch(err => {
            console.log(err)
            showError(err.message)
        })
    }
    const generateMeetingLink = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/generateLink`, {
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
                setIsJoin(false)
                updateSessionStatus('ongoing')
                setSesstionLink(data.data.meetingLink)
                setIsAbsentAndTaken(true)
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
            <span>
                    {
                        started === false ?
                        "":
                        countdownSeconds > 0 
                        ? `Session will start in ${formatTime(countdownSeconds)}` 
                        : "Session has started"
                    }
            </span>
            <span className="text-success-color font-semibold">
                    {
                        endMessage === false ?
                        "":
                        "Session has ended"
                    }
            </span>
                {sesstionLink && sesstionLink ? <Link href={sesstionLink} target="_blank" className="text-success-color font-semibold flex items-center justify-center mb-2 hover:underline">Click To Redirect To Session</Link> : ""}
            </div>
            {/* 
                // first step click on i am here will request attendance teacher to session
                    - update session status to ongoing 
                // click on join button to send requset to generate session link
                // show two buttons absent and taken and every button will update session status by send request api
            
            */}
            {
                isJoin ?
                (            
                    <button 
                        className={"smallBtn hover:bg-secondary-hover transition-colors"}
                        onClick={generateMeetingLink}
                        >Join</button>
                ) :
                isAbsentAndTaken ?
                (
                <div className="flex items-center justify-center gap-3 mt-3">
                    <button 
                        className={"smallBtn text-danger-color bg-white-color border-[1px] border-danger-color hover:bg-danger-color hover:text-white transition-colors"}
                        onClick={() => updateSessionStatus('absent')}
                    >Absent</button>
                    <button 
                        className={"smallBtn text-success-color bg-white-color border-[1px] border-success-color hover:bg-success-color hover:text-white transition-colors"}
                        onClick={() => {
                            updateSessionStatus('taken')
                            const timerReport = setTimeout(() => {
                                handleOpen()
                            }, 2000)
                            return () => clearTimeout(timerReport)
                            }}
                    >Taken</button>
                </div>
                ) : 
                (
                    <button 
                    className={"smallBtn hover:bg-secondary-hover transition-colors"} 
                    onClick={handleUpdateAttendance}
                    >I am Here</button>
                )
            }
            <AddReportModal 
                sessionID={upComingSession.id}
                openAssignModal={openModal}
                handleCloseModal={handleClose}
            
            />
        </div>
    )
}
