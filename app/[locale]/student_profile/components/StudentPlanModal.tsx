
'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { CustomFlowbiteTheme, Tabs } from "flowbite-react";
import { BsPeople, BsPerson,  } from "react-icons/bs";
import StudentPlane from './StudentPlane';
import PrimaryButton from '../../components/PrimaryButton';

export default function StudentPlan() {
  const [openModal, setOpenModal] = useState(false);

  const customeTheme: CustomFlowbiteTheme = {
    tab: {
      tablist: {
        base: "flex justify-center items-center m-auto w-auto bg-secondary-color rounded-full px-12 py-2",
        tabitem: {
          styles: {
            pills: {
              active: {
                on: "rounded-full bg-white focus:ring-0 text-black px-8 py-2",
                off: "rounded-full px-8 py-2 focus:ring-0 bg-secondary-color hover:bg-white hover:text-black text-white transition-colors",
              },
            },
          },
        },
      },
    },
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Toggle Plans modal</Button>
      <Modal   show={openModal} className='block space-y-0 md:flex md:space-y-0 md:space-x-4 ' size={'7xl'}  onClose={() => setOpenModal(false)}>
      <Modal.Header className='p-0 m-0 border-0'></Modal.Header>

        <Modal.Body >
          <div className="space-y-3 -translate-y-8">
            <div className={`modal_header flex justify-center align-center gap-4 font-bold text-center text-lg flex-col mt-0 pt-0`}>
            <h1 className='text-lg m-0 '>Choose the plan that works for you</h1>
            <div className='flex justify-center'>
            <div className='bg-secondary-color text-sm text-white py-2 px-4 w-fit text-center flex items-center gap-1  rounded-3xl'>
             <BsPerson/> 1 Kid
            </div>
            </div>
        </div>
           <div className="flex gap-5 justify-center pt-3">
           <StudentPlane
           planId={1}
                title="3 Days per Week"
                price={90}
                features={[
                  'Private one-to-one',
                  '15 mins',
                  '3 Classes per week',
                  '12 Classes Monthly',
                  'Professional & Qualified',
                ]}
              />
               <StudentPlane
               planId={2}
                title="4 Days per Week "
                price={120}
                recommended='Recommended'
                features={[
                  'Private one-to-one',
                  '30 mins',
                  '4 Classes per week',
                  '16 Classes Monthly',
                  'Professional & Qualified',
                ]}
              />
               <StudentPlane
                title="5 Days per Week "
                planId={3}
                price={200}
                features={[
                  'Private one-to-one',
                  '45 mins',
                  '5 Classes per week',
                  '20 Classes Monthly',
                  'Professional & Qualified',
                ]}
              />
                <StudentPlane
                title="Customize your Plan"
                price={50}
                features={[
                  'Fixed times',
                  'Fixed Prices',
                  'You can choose days',
                  'Private one-to-one',
                  'Professional & Qualified',
                ]}
              />
           </div>
           <div className="buttons flex gap-4 justify-center mt-8 mb-0">
           <PrimaryButton
           onClick={() => setOpenModal(false)}
                    text="Discard"
                    ourStyle="border-[--secondary-color]  border-2 hover:bg-[--secondary-color] text-red-500 font-medium hover:text-white	py-2 border rounded-3xl text-xl px-10	transition-all	duration-500 "
                  />
                  <PrimaryButton
                    text="Change"
                    ourStyle="bg-secondary-color hover:bg-[#3b369a] text-white	py-2 border rounded-3xl text-xl px-10	 transition-all	duration-500 "
                  />
           </div>
          </div>
        </Modal.Body>
        
      </Modal>
    </>
  );
}
