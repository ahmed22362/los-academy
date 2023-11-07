'use client';

import { convertDateTimeZone } from '@/helpers/convertDateAndTime';
import { CustomFlowbiteTheme, Modal } from 'flowbite-react';
import jsPDF from 'jspdf';
import { useEffect, useRef } from 'react';


export default function ReportModal({openAssignModal, handleCloseModal, details}: 
    {
        openAssignModal: boolean;
        handleCloseModal: () => void;
        details: string | any
    }) {

    const modalRef = useRef<HTMLDivElement>(null);
    
    const downloadPdf = () => {
        const doc: any = new jsPDF()
        // Set properties for the PDF, such as title and author
        doc.setProperties({
            title: 'Report',
            author: 'Your Name',
        });

            // Add content to the PDF
        doc.setFontSize(12);

            // Title
        doc.text(20, 20, `Report Title: ${details.title}`);

            // Content list
        const contentList = [
            `Grade: ${details.grade}`,
            `Arabic: ${details.arabic === null ? "Not Available" : details.arabic}`,
            `Islamic: ${details.islamic === null ? "Not Available" : details.islamic}`,
            `Quran: ${details.quran === null ? "Not Available" : details.quran}`,
        ];

        doc.setFontSize(10);
        let y = 40;
        contentList.forEach((item) => {
            doc.text(20, y, item);
            y += 10;
        });

        // Teacher Comment
        y += 10;
        doc.setFontSize(12);
        doc.text(20, y, 'Teacher Comment:');
        y += 10;
        doc.setFontSize(10);
        doc.text(40, y, details.comment);

        // Session Info
        y += 40;
        doc.setFontSize(12);
        doc.text(20, y, 'Session Info');

        const sessionInfoList = [
            `Session ID: ${details.sessionId}`,
            `Session Date: ${convertDateTimeZone(details.session.sessionDate, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "D-MMM-YYYY")}`,
            `Create at: ${convertDateTimeZone(details.createdAt, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "D-MMM-YYYY")}`,
        ];

        doc.setFontSize(10);
        y += 10;
        sessionInfoList.forEach((item) => {
            doc.text(40, y, item);
            y += 10;
        });

        // Save the PDF with a file name
        doc.save('report.pdf');
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | any) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal();
          }
        };

        if (openAssignModal) {
          document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openAssignModal, handleCloseModal]);
    
      if (!openAssignModal) {
        return null;
      }

      const modalTheme: CustomFlowbiteTheme['modal'] = {
        header: {
          base: "flex items-start justify-between rounded-t px-5 py-2"
        }
      }

  return (
    <>
      <Modal ref={modalRef} show={openAssignModal} onClose={handleCloseModal} size={"3xl"}>
        <Modal.Header theme={modalTheme.header}>Report Details {details.id}:</Modal.Header>
        <Modal.Body>
            <div className="flex flex-col items-start justify-center gap-3">
                <h3 className='text-black-color-one text-center font-semibold text-md'>Report Title: {details.title}</h3>
                <ul className="ps-5">
                    <li><b>Grade:</b> {details.grade}</li>
                    <li><b>Arabic:</b> {details.arabic === null ? "Not Available" : details.arabic}</li>
                    <li><b>Islamic:</b> {details.islamic === null ? "Not Available" : details.islamic}</li>
                    <li><b>Quran:</b> {details.quran === null ? "Not Available" : details.quran}</li>
                </ul>
                <p className="flex flex-col">
                    <b>Teacher Comment:</b> 
                    <q className="ps-5">{details.comment}</q>
                </p>
                <div>
                    <h6 className="pb-1 text-black-color-one font-semibold text-md">Session Info</h6>
                    <ul className="ps-5">
                        <li>Session ID: {details.sessionId}</li>
                        <li>Session Date: {convertDateTimeZone(details.session.sessionDate, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "D-MMM-YYYY")}</li>
                        <li>Create at: {convertDateTimeZone(details.createdAt, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "D-MMM-YYYY")}</li>
                    </ul>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <button
                    className="text-white bg-gray-two-color hover:bg-gray-three-color rounded-full py-2 px-5 transition-colors"
                    onClick={downloadPdf}
                >Download as pdf</button>
            </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
