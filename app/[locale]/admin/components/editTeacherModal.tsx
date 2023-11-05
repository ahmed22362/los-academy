'use client';

import { CustomFlowbiteTheme, Modal } from 'flowbite-react';
import React from 'react';
import { useEffect, useRef } from 'react';


export default function EditTeacherModal({openAssignModal, handleCloseModal, teacherDetails}: 
    {
        openAssignModal: boolean;
        handleCloseModal: () => void;
        teacherDetails: any
    }) {

    const modalRef = useRef<HTMLDivElement>(null);

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
        <Modal.Header theme={modalTheme.header}>Report Details {teacherDetails.id}:</Modal.Header>
        <Modal.Body>
            <div className="flex flex-col items-start justify-center gap-3">
            </div>
            <div className="flex justify-center items-center">
                <button
                    className="text-white bg-gray-two-color hover:bg-gray-three-color rounded-full py-2 px-5 transition-colors"
                >Download as pdf</button>
            </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
