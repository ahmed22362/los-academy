'use client';

import { CustomFlowbiteTheme, Label, Modal, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import LoadingButton from '../../loadingButton';
import Cookies from 'universal-cookie';

export default function EditPlanModal({openAssignModal, handleCloseModal, planDetails, updateComponent}: 
    {
        openAssignModal: boolean;
        handleCloseModal: () => void;
        planDetails: any;
        updateComponent: () => void
    }) {

    const modalRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState<boolean | any>(planDetails.active);
    const toast = useRef<Toast>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const cookies = new Cookies()
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
        setIsProcessing(true)
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/plan/${planDetails.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.get("token")}`
            },
            body: JSON.stringify({
                active: status,
            }),
        }).then(response => response.json()).then(data => {
          if(data.status === "success") {
            showSuccess()
            updateComponent()
          } else {
            showError()
          }
          setIsProcessing(false)
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
                <Label htmlFor="status" value="Plan Active" />
              </div>
              <Select id="status" value={status} onChange={(e) => setStatus(e.target.value)} >
                <option value={'true'}>Active</option>
                <option value={'false'}>Inactive</option>
              </Select>
              {/* <TextInput id="title" defaultValue={planDetails.title} onChange={(e) => setStatus(e.target.value)} type='text' /> */}
            </div>
            <div className="w-full">
            <LoadingButton 
                title='Save Changes'
                isProcessing={isProcessing}
                customStyle='text-white bg-secondary-color hover:bg-secondary-hover rounded-full py-2 px-5 transition-colors'
                action={updateStudent}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
