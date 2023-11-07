'use client';

import { CustomFlowbiteTheme, Label, Modal, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
export default function EditPlanModal({openAssignModal, handleCloseModal, planDetails, updateComponent}: 
    {
        openAssignModal: boolean;
        handleCloseModal: () => void;
        planDetails: any;
        updateComponent: () => void
    }) {

    const modalRef = useRef<HTMLDivElement>(null);
    const [title, setTitle] = useState(planDetails.title);
    const [sessionDuration, setSessionDuration] = useState(planDetails.sessionDuration);
    const [sessionsCount, setSessionsCount] = useState(planDetails.sessionsCount);
    const [sessionsPerWeek, setSessionsPerWeek] = useState(planDetails.sessionsPerWeek);
    const toast = useRef<Toast>(null);
    const showSuccess = () => {
        toast.current?.show({severity:'success', summary: 'Success', detail:'Updated Success', life: 3000});
    }
    const showError = () => {
        toast.current?.show({severity:'error', summary: 'Error', detail:'Updated failed make sure all fields are correct', life: 4000});
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

      const updateStudent = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/plan/${planDetails.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                sessionDuration: sessionDuration,
                sessionsCount: sessionsCount,
                sessionsPerWeek: sessionsPerWeek
            }),
        }).then(response => response.json()).then(data => {
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
    <>
      <Modal ref={modalRef} show={openAssignModal} onClose={handleCloseModal} size={"3xl"}>
        <Modal.Header theme={modalTheme.header}>Edit Plan: {planDetails.id}</Modal.Header>
        <Modal.Body>
        <div className="space-y-6">
        <Toast ref={toast} />
            <div>
            <div className="mb-2 block">
                <Label htmlFor="title" value="Plan Title" />
              </div>
              <TextInput id="title" defaultValue={planDetails.title} onChange={(e) => setTitle(e.target.value)} type='text' />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="sessionDuration" value="Session Duration" />
              </div>
              <TextInput id="sessionDuration" defaultValue={planDetails.sessionDuration} onChange={(e) => setSessionDuration(e.target.value)} type="text" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="sessionsCount" value="Sessions Count" />
              </div>
              <TextInput id="sessionsCount" defaultValue={planDetails.sessionsCount} onChange={(e) => setSessionsCount(e.target.value)} type="text" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="sessionsPerWeek" value="Sessions Per Week" />
              </div>
              <TextInput id="sessionsPerWeek" defaultValue={planDetails.sessionsPerWeek} onChange={(e) => setSessionsPerWeek(e.target.value)} type="text" />
            </div>
            <div className="w-full">
                <button
                    onClick={updateStudent}
                    type="submit"
                    className="text-white bg-secondary-color hover:bg-secondary-hover rounded-full py-2 px-5 transition-colors"
                >
                  Save
                </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
