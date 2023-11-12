'use client';

import { CustomFlowbiteTheme, Modal } from 'flowbite-react';
import ModalOne from './CoursesModalBody/ModalOne';
import ModalTwo from './CoursesModalBody/ModalTwo';
import ModalThree from './CoursesModalBody/ModalThree';
import { useRef, useEffect } from 'react';


export default function ModalCourse({handleOpen, handleCloseModal, modalTarget}: {
  
  handleOpen: string; handleCloseModal: () => void; modalTarget: number}) {
    
    const modalRef = useRef<HTMLDivElement>(null);
    
    const customeTheme: CustomFlowbiteTheme['modal'] = {
      body: {
        base: "p-4 flex-1 overflow-auto"
      },
      header: {
        base: "flex items-start justify-between rounded-t border-none",
      }
    }

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent | any) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          handleCloseModal();
        }
      };

      if (handleOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [handleOpen, handleCloseModal]);
  
    if (!handleOpen) {
      return null;
    }




  return (
    <>
      <Modal ref={modalRef} show={true} onClose={handleCloseModal} size={"5xl"}>
        <Modal.Header theme={customeTheme.header}></Modal.Header>
        <Modal.Body theme={customeTheme.body}>
          <div className='flex flex-row justify-between items-center flex-wrap'>
            {modalTarget === 1 && <ModalOne />}
            {modalTarget === 2 && <ModalTwo />}
            {modalTarget === 3 && <ModalThree />}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
