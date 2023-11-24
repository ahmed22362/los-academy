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
    useEffect(() => {
      console.log(details)
    }, [])
    const modalRef = useRef<HTMLDivElement>(null);
    
    const downloadPdf = () => {
      
      const doc: any = new jsPDF()
        // Set properties for the PDF, such as title and author
      
      // Set properties for the document
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(18);
      doc.text('Grade Report', 105, 15, { align: 'center' });

            // Content list
        const contentList = [
            `TotalGrade: ${details.grade}`, 
            details.arabic === null ? '' : 'Arabic: ' + details.arabic,
            details.arabicComment === '' ? '' : 'Arabic Comment: ' + details.arabicComment,
            details.islamic === null ? '' : 'Islamic: ' + details.islamic,
            details.islamicComment === '' ? '' : 'Islamic Comment: ' + details.islamicComment,
            details.quran === null ? '' : 'Quran: ' + details.quran,
            details.quranComment === '' ? '' : 'Quran Comment: ' + details.quranComment,
        ];

        doc.setFontSize(10);
        let y = 40;
        contentList.forEach((item) => {
            const itemLines = doc.splitTextToSize(item, 180); // Adjust the width as needed
            doc.text(20, y, itemLines);
            y += itemLines.length * 6 + 5;
        });

        // Teacher Comment
        y += 10;
        doc.setFontSize(12);
        doc.text(20, y, 'Teacher Comment:');
        y += 10;
        doc.setFontSize(10);

        const teacherCommentLines = doc.splitTextToSize(details.comment, 180); // Adjust the width as needed
        doc.text(40, y, teacherCommentLines);
        y += teacherCommentLines.length * 6 + 5; // Adjust line height and spacing

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
        <Modal.Header theme={modalTheme.header}>Report Details (ID: {details.id})</Modal.Header>
        <Modal.Body>
            <div className="flex flex-col items-start justify-center gap-3">
                <h3 className='text-black-color-one text-center font-semibold text-md'></h3>
                <ul className="ps-5">
                    <li className="text-center"><b>Total Grade:</b> <span className="capitalize">{details.grade}</span></li>
                    {details.arabic === null ? "" : (<li><b>Arabic:</b> <span className="capitalize">{details.arabic}</span> </li>)}
                    {details.arabicComment === '' ? "" : (<li><b>Arabic Comment:</b> <br/>{details.arabicComment} </li>)}
                    <hr className="font-bold h-[2px]"/>
                    <hr className="font-bold h-[2px]"/>
                    {details.islamic === null ? "" : (<li><b>Islamic:</b> <span className="capitalize">{details.islamic}</span> </li>)}
                    {details.islamicComment === '' ? "" : (<li><b>Islamic Comment:</b> <br/>{details.islamicComment} </li>)}
                    <hr className="font-bold h-[2px]"/>
                    <hr className="font-bold h-[2px]"/>
                    {details.quran === null ? "" : (<li><b>Quran:</b> <span className="capitalize">{details.quran}</span> </li>)}
                    {details.quranComment === '' ? "" : (<li><b>Quran Comment:</b> <br/>{details.quranComment} </li>)}
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
