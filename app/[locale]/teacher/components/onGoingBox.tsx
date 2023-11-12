"use client";

import useCountDown from "@/helpers/useCountDown";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function OnGoingBox() {

    const [countdownSeconds, setCountdownSeconds] = useState(0);
    const cookies = new Cookies()
    const ourSessionDate = "2023-11-10T18:30:00.000Z"; // up coming session
    // Convert session time to a Date object
    const sessionDate: any = new Date(ourSessionDate);
    // console.log(sessionDate)
    // Get the current time
    const currentDate: any = new Date();
     // Get the timezone offset in minutes and convert it to milliseconds
     const timezoneOffset = currentDate.getTimezoneOffset() * 60 * 1000;
    // Calculate the time difference in milliseconds
    const timeDifference = sessionDate.getTime() - currentDate.getTime() + timezoneOffset;
    // Convert milliseconds to seconds
    const secondsDifference = Math.max(0, Math.floor(timeDifference / 1000));
    // handle start the counter
    const handleIAmHereClick = () => {
        setCountdownSeconds(secondsDifference);
    };

    const getUpComingSession = () => {

        fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher/upcomingSession`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.get("token")}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }


    // Counter down Functionality
    useEffect(() => {
        getUpComingSession()
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
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    return(
        <div className={"flex-col justify-center items-center gap-[16px] h-[240px] text-center adminBox"}>
            <h3 className={"adminBoxTitle"}>Are you here and ready for the session ?</h3>
            <div className={"bg-white-color p-5 rounded-[16px] "}>
                <div className={"flex flex-col items-start text-md font-semibold text-[black-color-one]"}>
                <span>
                        {countdownSeconds > 0 ? `Session will start in ${formatTime(countdownSeconds)}` : "Session has started"}
                </span>          
                </div>
                <button className={"smallBtn"} onClick={handleIAmHereClick}>I am Here</button>          
            </div>
        </div>
    )
}
