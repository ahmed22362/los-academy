"use client"

import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import OnGoingBox from "./onGoingBox";
import { Spinner } from "flowbite-react";

export default function FetchingUpComingSessions() {
    const [sessions, setAllSessions] = useState<any>([]);
    
    const [isLoading, setIsLoading] = useState(true);
    const cookies = new Cookies();
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
            setAllSessions(data.data)
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getUpComingSession()
    }, [])

  return (
    <section>
        <div className={"flex-col justify-start items-center gap-[16px] h-[240px] text-center adminBox"}>
            <h3 className={"adminBoxTitle"}>Are you here and ready for the session ?</h3>
            {isLoading ? <Spinner /> : (sessions && sessions.length > 0 ? sessions.map((session: any, index: number) => (
                
                <OnGoingBox session={session} key={index}/>)
            )
            : 
            (
                <p className="p-3 bg-warning-color text-white w-fit rounded-full mt-2 font-bold">No Upcoming Sessions for now </p>
            )
                )}
{/* 
            {onGoingSession && onGoingSession.length > 0 ? onGoingSession.map((session: any, index: number) => {

                return (
                    <div>
                        <Link href={session.meetingLink} className="text-success-color hover:underline" target="_blank">Goin Meeting</Link>
                    </div>
                )
            }   
            ) : ""} */}
        </div>
    </section>
  )
}
