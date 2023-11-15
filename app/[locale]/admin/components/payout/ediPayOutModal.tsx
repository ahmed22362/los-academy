'use client';

import { CustomFlowbiteTheme, Label, Modal, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import Cookies from 'universal-cookie';
export default function EditPayOutModal({openAssignModal, handleCloseModal, payoutDetails, updateComponent}: 
    {
        openAssignModal: boolean;
        handleCloseModal: () => void;
        payoutDetails: any;
        updateComponent: () => void
    }) {

    const modalRef = useRef<HTMLDivElement>(null);
    const [name, setName] = useState(payoutDetails.name);
    const [email, setEmail] = useState(payoutDetails.email);
    const [phone, setPhone] = useState(payoutDetails.phone);
    const [availableFreeSession, setAvailableFreeSession] = useState(payoutDetails.role);
    const [age, setAge] = useState(payoutDetails.sessionCost);
    const [password, setPassword] = useState('');
    const [remainSessions, setRemainSessions] = useState(payoutDetails.remainSessions);
    const [gender, setGender] = useState(payoutDetails.gender);
    const toast = useRef<Toast>(null);
    const cookies = new Cookies();
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
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/user/${payoutDetails.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.get("token")}`
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                availableFreeSession: availableFreeSession,
                remainSessions: remainSessions,
                age: age,
                password: password,
                gender: gender
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
        <Modal.Header theme={modalTheme.header}>Edit Student: {payoutDetails.id}</Modal.Header>
        <Modal.Body>
        <div className="space-y-6">
        <Toast ref={toast} />
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Student Name" />
              </div>
              <TextInput id="name" defaultValue={payoutDetails.name} onChange={(e) => setName(e.target.value)} type='text' />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Student Email" />
              </div>
              <TextInput id="email" defaultValue={payoutDetails.email} onChange={(e) => setEmail(e.target.value)} type="email" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="gender" value="Student Gender" />
              </div>
              <Select id="gender" defaultValue={payoutDetails.gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" value="Student Phone" />
              </div>
              <TextInput id="phone" defaultValue={payoutDetails.phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="availableFreeSession" value="Available Free Session" />
              </div>
              <TextInput id="availableFreeSession" type="text" defaultValue={payoutDetails.availableFreeSession} onChange={(e) => setAvailableFreeSession(e.target.value)} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Update Student Password" />
              </div>
              <TextInput id="password" type="text" placeholder='update password' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="age" value="Age" />
              </div>
              <TextInput id="age" type="text" defaultValue={payoutDetails.age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="remainSessions" value="Remain Sessions" />
              </div>
              <TextInput id="remainSessions" type="text" defaultValue={payoutDetails.remainSessions} onChange={(e) => setRemainSessions(e.target.value)} />
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
