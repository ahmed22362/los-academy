'use client';

import { CustomFlowbiteTheme, Label, Modal, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { PiStudentBold } from 'react-icons/pi';
import Cookies from 'universal-cookie';

export default function AddPlanModal({openAssignModal, handleCloseModal, updateComponent}: 
    {
        openAssignModal: boolean;
        handleCloseModal: () => void;
        updateComponent: () => void
    }) {

    const modalRef = useRef<HTMLDivElement>(null);
    const [title, setTitle] = useState('');
    const [sessionDuration, setSessionDuration] = useState<any>(null);
    const [sessionsCount, setSessionsCount] = useState<any>(null);
    const [sessionsPerWeek, setSessionsPerWeek] = useState<any>(null);
    const cookies = new Cookies();
    const toast = useRef<Toast>(null);
    const showSuccess = () => {
        toast.current?.show({severity:'success', summary: 'Success', detail:'Add Success', life: 3000});
    }
    const showError = () => {
        toast.current?.show({severity:'error', summary: 'Error', detail:'Add failed make sure all fields are correct', life: 4000});
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
          base: "flex items-start justify-between rounded-t px-5 py-2 w-full",
          title: "w-full flex items-center gap-4 text-2xl font-semibold"
        }
      }

      const addPlan = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/plan`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.get("token")}`
            },
            body: JSON.stringify({
                title: title,
                sessionDuration: sessionDuration,
                sessionsCount: sessionsCount,
                sessionsPerWeek: sessionsPerWeek,
                type: 'standard',
            }),
        }).then(response => response.json()).then(data => {
            console.log(data)
          if(data.status === "success") {
            showSuccess()
            updateComponent()
          } else {
            showError()
          }
        }).catch(err => {
          console.log(err)
        })
      }

  return (
      <Modal ref={modalRef} show={openAssignModal} onClose={handleCloseModal} size={"3xl"}>
         <Modal.Header theme={modalTheme.header}>
            Add Plan <PiStudentBold />
          </Modal.Header>
        <Modal.Body>
        <div className="space-y-6">
        <Toast ref={toast} />
        <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Plan Title" />
              </div>
              <TextInput id="title" placeholder='Plan Title' onChange={(e) => setTitle(e.target.value)} type='text' />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="sessionDuration" value="Session Duration" />
              </div>
              <TextInput id="sessionDuration" placeholder='Session Duration' onChange={(e) => setSessionDuration(e.target.value)} type="number" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="sessionsCount" value="Sessions Count" />
              </div>
              <TextInput id="sessionsCount" placeholder='Session Count' onChange={(e) => setSessionsCount(e.target.value)} type="number" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="sessionsPerWeek" value="Sessions Per Week" />
              </div>
              <TextInput id="sessionsPerWeek" placeholder='Sessions Per Week' onChange={(e) => setSessionsPerWeek(e.target.value)} type="number" />
            </div>
            <div className="w-full">
                <button
                    onClick={addPlan}
                    type="submit"
                    className="text-white bg-secondary-color hover:bg-secondary-hover rounded-full py-2 px-5 transition-colors"
                >
                  Add
                </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
  )
}
