'use client';

import { CustomFlowbiteTheme, Modal } from 'flowbite-react';
import ModalOne from './CoursesModalBody/ModalOne';
import ModalTwo from './CoursesModalBody/ModalTwo';
import ModalThree from './CoursesModalBody/ModalThree';

export default function ModalCourse({handleOpen, handleCloseModal, modalTarget}: {
  
  handleOpen: string; handleCloseModal: () => void; modalTarget: number}) {

    const customeTheme: CustomFlowbiteTheme['modal'] = {
      body: {
        base: "p-4 flex-1 overflow-auto"
      },
      header: {
        base: "flex items-start justify-between rounded-t border-none",

      }
    }
  return (
    <>
      <Modal show={true} onClose={handleCloseModal} size={"5xl"}>
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
