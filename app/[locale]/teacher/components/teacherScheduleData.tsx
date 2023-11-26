"use client";

import { useState } from 'react';
import { convertDateTimeZone } from './../../../../helpers/convertDateAndTime';
import RescheduleModal from './requestRescheduleModal';
function TeacherScheduleData({data}: {data: any}) {

    const [openModal, setOpenModal]: any = useState(false);

    const session = data && data;

    const convertDate = convertDateTimeZone;

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
                    <p>{`with ${session.SessionInfo.user.name}`}</p>
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