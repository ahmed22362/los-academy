"use client";

import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import AddReportModal from "./addReportModal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Spinner } from "flowbite-react";
import { convertDateTimeZone } from "@/utilities";

export default function OnGoingBox(session: any) {

    const upComingSession = session.session && session.session

    const [onGoingSession, setOnGoingSession]: any = useState<any>([]);
    const [lastTakenSession, setLastTakenSession]: any = useState<any>([]);
    const [countdownSeconds, setCountdownSeconds] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const cookies = new Cookies()
    const toast = useRef<any>(null);
    const [openModal, setOpenModal] = useState(false)
    const router = useRouter();
    const sessionDuration = onGoingSession && onGoingSession.sessionDuration

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
    
    const ourSessionDate = new Date(sessionDate)

    // Get the current time
    const currentDate: any = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = ourSessionDate.getTime() - currentDate.getTime();

    // Convert the time difference to seconds
    const seconds = Math.floor(timeDifference / 1000);

    useEffect(() => {
            setCountdownSeconds(seconds);
    }, []);

    // Counter down Functionality
    useEffect(() => {

        let timeoutId: any;
        const handleCountdown = () => {
            if ( countdownSeconds > 0) {
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
    const getOngoing = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher/ongoingSession`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.get("token")}`
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setOnGoingSession(data.data)
            if(data.data.length > 0) {
                setCountdownSeconds(parseInt(data.data[0].sessionDuration) * 60)
            }
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
       })
       }
    const getLastTakenSession = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher/myLatestTakenSession`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.get("token")}`
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.data[0].hasReport)   
            setLastTakenSession(data.data[0])
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
       })
    }
        useEffect(() => {
            getLastTakenSession()
        }, [])

       useEffect(() => {
            if(countdownSeconds <= 0) {
                const time = setTimeout(() => {
                    getOngoing()
                    clearTimeout(time)
                }, 5000)
            }
       }, [countdownSeconds])
       
       useEffect(() => {
        getOngoing()
       }, [])

    return(
        <div className={"bg-white-color p-5 rounded-[16px] "}>
            <Toast ref={toast} />
            {isLoading ? <Spinner /> : 
                onGoingSession && onGoingSession.length > 0 ? onGoingSession.map((session: any, index: number) => {
                    return (
                        <div key={index}>
                            <h4 className="mb-1">session {session.SessionInfo.user.name} <b className="text-success-color">starting ..</b></h4>
                            <span className="mb-2">Timer of session : {formatTime(countdownSeconds)}</span><br/>
                            <Link
                                target="_blank"
                                className="smallBtn mt-2 hover:bg-secondary-hover transition-colors"
                                onClick={handleUpdateAttendance}
                                href={session.meetingLink}
                                >Join Meeting Now !!
                            </Link>
                         {/* {countdownSeconds === 0 && <button
                            className="smallBtn hover:bg-secondary-hover transition-colors"
                            onClick={handleOpen}
                            >
                            Add Report +
                        </button>}    */}
                        {/* <AddReportModal 
                            sessionID={session.id}
                            openAssignModal={openModal}
                            handleCloseModal={handleClose}
                        /> */}
                        </div>
                    )
                }) :  
                lastTakenSession && lastTakenSession.hasReport === false ? 
                <div>
                     <h4 className="mb-3">add report for the last session with {lastTakenSession && lastTakenSession.SessionInfo.user.name}</h4>
                     <button
                        className="smallBtn hover:bg-secondary-hover transition-colors"
                        onClick={handleOpen}
                        >
                        Add Report +
                    </button>
                    <AddReportModal 
                        sessionID={lastTakenSession && lastTakenSession.id}
                        openAssignModal={openModal}
                        handleCloseModal={handleClose}
                    />     
                </div> :
                upComingSession ? 
                (<>
                    {countdownSeconds > 0 && countdownSeconds < 3600 && <h5>Timer: {formatTime(countdownSeconds)}</h5>}
                    <h3 className="mb-3">The Next Session with: <b>{upComingSession && upComingSession.SessionInfo.user.name}</b></h3>
                    <span>start at : {convertDateTimeZone(upComingSession.sessionDate, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "MM/DD/YYYY hh:mm A")}</span>
                </>) 
                : 
                (<p className="p-3 bg-warning-color text-white w-fit rounded-full mt-2 font-bold">No Sessions</p>)
            }   

    </div>
    )
}
