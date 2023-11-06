'use client';

import { Dropdown, Modal } from 'flowbite-react';
import Image from 'next/image';
import { CustomFlowbiteTheme } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';

export default function sessionsModal({opensessionsModal, handleCloseModal}: 
    {
        opensessionsModal: boolean;
        handleCloseModal: () => void;
    }) {

      const modalRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        const handleClickOutside = (event: MouseEvent | any) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal();
          }
        };
    
        if (opensessionsModal) {
          document.addEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [opensessionsModal, handleCloseModal]);
    
      if (!opensessionsModal) {
        return null;
      }

      const customTheme: CustomFlowbiteTheme['dropdown'] = {
        floating: {
          base: "w-fit",
          item: {
            base: "bg-white-color",
          },
          style: {
            light: "bg-white-color"
          }
        },
        
        inlineWrapper: "flex justify-between w-[260px] items-center px-5 py-3 rounded-full bg-white-color"
      }
      const modalTheme: CustomFlowbiteTheme['modal'] = {
        header: {
          base: "flex items-start justify-between rounded-t p-5"
        }
      }
  return (
    <>
      <Modal ref={modalRef} show={opensessionsModal} onClose={handleCloseModal} size={"lg"}>
        <Modal.Header theme={modalTheme.header}>Assign to this Student :</Modal.Header>
        <Modal.Body>
            <div className="flex items-center gap-5">
                <Image src={'/vectors/feedback3.svg'} alt={'student'} width={50} height={50} />
                <span className='text-black-one-color'>Student Name</span>
            </div>
            <div className="flex flex-col my-5 gap-3">
              <h4 className="adminBoxTitle">This Teacher: </h4>
              
            </div>
            <div className="flex justify-center items-center">
                <button
                    className="text-white bg-gray-two-color hover:bg-gray-three-color rounded-full py-2 px-5 transition-colors"
                >Assign</button>
            </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
