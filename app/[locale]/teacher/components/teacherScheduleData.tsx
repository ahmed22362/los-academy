"use client";

import { useEffect, useState } from 'react';
import RescheduleModal from './requestRescheduleModal';
import { convertDateTimeZone } from '@/utilities';
function TeacherScheduleData({data}: {data: any}) {

    const [openModal, setOpenModal]: any = useState(false);

    const session = data && data;
    const userName = session && session.SessionInfo && session.SessionInfo.user && session.SessionInfo.user.name || "name not found :)";

    const convertDate = convertDateTimeZone;
    useEffect(() => {
        console.log(session)
        console.log(userName)
    },[])
    const handleOpenModal = () => {
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    };


  return (
                <div className={"py-5 px-4 bg-white-color rounded-[16px] my-4 flex gap-3 font-semibold flex-wrap"}>
                    <p>Session ID: {session.id}</p>
                    <span>{convertDate(session.sessionDate, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "MM/DD/YYYY hh:mm A")}</span>
                    <p>{`with ${userName}`}</p>
                    <button className='smallBtn hover:bg-secondary-hover transition-colors'
                    onClick={handleOpenModal}
                    >Reschedule</button>
                    <RescheduleModal 
                        openAssignModal={openModal} 
                        handleCloseModal={handleCloseModal} 
                        session={session}
                    />
                </div> 
            )
}

export default TeacherScheduleData