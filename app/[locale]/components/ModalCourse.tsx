'use client';

import { CustomFlowbiteTheme, Modal } from 'flowbite-react';
import ModalOne from './CoursesModalBody/ModalOne';
import ModalTwo from './CoursesModalBody/ModalTwo';
import ModalThree from './CoursesModalBody/ModalThree';
import { useRef, useEffect } from 'react';
import PrimaryButton from './PrimaryButton';
import { useRouter } from 'next/navigation';


export default function ModalCourse({handleOpen, handleCloseModal, courseDetails}: {
  
  handleOpen: string; handleCloseModal: () => void; courseDetails: any}) {
    
    const modalRef = useRef<HTMLDivElement>(null);
    const course = courseDetails && courseDetails
    const router = useRouter()
    useEffect(() => {
      console.log(course)
    }, [])


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
          <div className='flex flex-col w-[550px]'>
        <h2 className="text-black-color-one text-3xl font-bold mb-6">{course.title}</h2>
        <p className="text-black-color-two text-md font-normal mb-2">
            {course.description}
        </p>
    </div>
    <div className='flex flex-col gap-5'>
      <hr />
      <p>
        {course.details}
      </p>
        
        <PrimaryButton text={"Enroll Now"} 
          onClick={() => {router.push('/login')}}
          ourStyle={
            "bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors \
            text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] py-2.5 px-12 shadow rounded-full w-fit m-auto"
            } />
        </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
