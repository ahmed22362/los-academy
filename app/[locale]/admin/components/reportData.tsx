"use client";

import { AiOutlineFileText } from 'react-icons/ai';
import { BsFileEarmarkArrowDown } from 'react-icons/bs';
import { convertDateTimeZone } from '@/helpers/convertDateAndTime';
import ReportModal from './reportModal';
import { useState } from 'react';

export default function ReportData({data}:{data: any}) {

    const reports = data && data;
    const convertDate = convertDateTimeZone;
    const [selectedReport, setselectedReport]: any = useState(false);
    const handleOpen = () => {
        setselectedReport(true);
    };
    const handleCloseModal = () => {
        setselectedReport(false);
    };

  return (
        <div className={"bg-white-color px-10 py-5 rounded-[16px] flex justify-between items-center w-full my-4 flex-wrap"}>
            <div className={"flex items-center justify-center gap-5"}>
                <AiOutlineFileText className={"text-[26px]"}/>
                <div className={"flex flex-col gap-2"}>
                    <p className={"font-semibold text-base"}>{`Report ID ${reports.id} (${convertDate(reports.createdAt, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "D-MMM-YYYY")})`}</p>
                    <span>{reports.title}</span>
                </div>
            </div>
            <div className={"flex gap-5 items-center"}>
                <button className={"smallBtn"}
                    onClick={handleOpen}
                    >View</button>
                <BsFileEarmarkArrowDown className={"text-[26px]"}/>
            </div>
            <ReportModal openAssignModal={selectedReport} handleCloseModal={handleCloseModal} details={reports}/>
        </div>
  )
}
