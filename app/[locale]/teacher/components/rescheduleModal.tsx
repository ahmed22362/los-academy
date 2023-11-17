"use client";

import { CustomFlowbiteTheme, Datepicker, Label, Modal } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import LoadingButton from '../../admin/loadingButton';
import { useRouter } from 'next/navigation';
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";

export default function RescheduleModal(
    {
        openAssignModal,
        handleCloseModal, 
        session
    }: 
    {
        openAssignModal: boolean;
        handleCloseModal: () => void;
        session: any;
    }) {

        const modalRef = useRef<HTMLDivElement>(null);
        const cookies = new Cookies();
        const [message, setMessage] = useState('')
        const sessionData = session && session
        const [isProcessing, setIsProcessing] = useState(false)
        const [rangeDate, setRangeDate] = useState<Nullable<(Date | null)[]> | any>(null);
        const router = useRouter()

    const modalTheme: CustomFlowbiteTheme['modal'] = {
      header: {
        base: "flex items-start justify-between rounded-t p-5"
      }
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

          const reschduleRequest = () => {
            setIsProcessing(true)
            fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher/requestReschedule`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookies.get("token")}`
                },
                
                body: JSON.stringify({
                  sessionId: sessionData.id,
                  newDateStartRange: rangeDate[0],
                  newDateEndRange: rangeDate[1]
                })
                
            }).then(response => response.json()).then(data => {
              console.log(data)
                setMessage(data.status)
                if(data.status === 'success') {
                    router.refresh()
                }
                setIsProcessing(false)
                setInterval(() => {
                  setMessage('')
                }, 4000)
            }).catch(err => console.log(err))
          }



  return (
    <Modal ref={modalRef} show={openAssignModal} onClose={handleCloseModal} size={"2xl"}>
        <Modal.Header theme={modalTheme.header}>Reschedule Session :</Modal.Header>
        {message ? 
          (<span className={`${message === 'fail' ? 
            'bg-danger-color': 'bg-success-color'} text-center py-4 px-8 text-green-100`}>
                {message === 'fail' ? 'Reschedule Fail' 
                :
                'Reschedule Success'}</span>) : (<></>)}
        <Modal.Body>
            <div className='m-auto flex flex-col items-center justify-center'>
              <div className="mb-2 block">
                <Label htmlFor="rengeDateEnd" value="Select Range Date " />
              </div>
              <Calendar
                    inline
                    value={rangeDate} 
                    onChange={(e) => {
                    setRangeDate(e.value)
                  }}
                    showTime
                    hourFormat="12"
                    selectionMode="range"
                    className={"border-[5px] border-secondary-color rounded-xl"}
                
              />
            <div className="w-full mt-3 flex items-center justify-center">
              <LoadingButton 
                title={"Reschdeule Session"}
                action={reschduleRequest}
                customStyle={"text-white bg-secondary-color hover:bg-secondary-hover rounded-full py-2 px-5 transition-colors"}
                isProcessing={isProcessing}
              />
            </div>
            </div>
    </Modal.Body>
  </Modal>
  )
}

