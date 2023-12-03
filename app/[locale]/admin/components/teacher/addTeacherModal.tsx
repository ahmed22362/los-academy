'use client';

import { CustomFlowbiteTheme, Label, Modal, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { GiTeacher } from 'react-icons/gi';
import LoadingButton from '../loadingButton';
import Cookies from 'universal-cookie';

export default function AddTeacherModal({openAssignModal, handleCloseModal, updateComponent}: 
    {
        openAssignModal: boolean;
        handleCloseModal: () => void;
        updateComponent: () => void
    }) {

    const modalRef = useRef<HTMLDivElement>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [naionalID, setNationalID] = useState('');
    const [cost, setCost] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmaon, setPasswordConfirmation] = useState('');
    const toast = useRef<Toast>(null);
    const [isProcessing, setIsProcessing] = useState(false)
    const cookies = new Cookies()

    const showSuccess = (msg: string) => {
        toast.current?.show({severity:'success', summary: 'Success', detail: msg, life: 3000});
    }
    const showError = (msg: string) => {
        toast.current?.show({severity:'error', summary: 'Error', detail: msg, life: 4000});
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
          base: "flex items-start justify-between rounded-t px-5 py-2",
          title: "w-full flex items-center gap-4 text-2xl font-semibold"
        }
      }

    const addTeacher = () => {

        setIsProcessing(true)
        
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.get("token")}`
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                nationalId: naionalID,
                password: password,
                passwordConfirmation: passwordConfirmaon,
                role: role,
                sessionCost: parseInt(cost)
            }),
        }).then(response => response.json()).then(data => {
            console.log(data)
          if(data.status === "success") {
            showSuccess(data.message)
            updateComponent()
          } else {
            showError(data.message)
          }
          setIsProcessing(false)
        }).catch(err => {
          console.log(err)
          showError(err)
          setIsProcessing(false)
        })
      }

  return (
      <Modal ref={modalRef} show={openAssignModal} onClose={handleCloseModal} size={"3xl"}>
         <Modal.Header theme={modalTheme.header}>
            Add Teacher
            <GiTeacher />
          </Modal.Header>
        <Modal.Body>
        <div className="space-y-6">
        <Toast ref={toast} />
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Teacher Name" />
              </div>
              <TextInput id="name" placeholder={"Name"} onChange={(e) => setName(e.target.value)} type='text' />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Teacher Email" />
              </div>
              <TextInput id="email" placeholder={"Email"} onChange={(e) => setEmail(e.target.value)} type="email" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" value="Teacher Phone" />
              </div>
              <TextInput id="phone" placeholder={'Phone'} onChange={(e) => setPhone(e.target.value)} type="tel" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="role" value="Role" />
              </div>
              <Select id="role" placeholder={'Select Role'} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nationalID" value="National ID" />
              </div>
              <TextInput id="nationalID" type="text" placeholder={"National ID is unique"} onChange={(e) => setNationalID(e.target.value)} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput id="password" type="text" placeholder={"It's recommended to use a strong passord"} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="passwordConfirm" value="Password Confirmation" />
              </div>
              <TextInput id="passwordConfirm" type="text" placeholder={"make sure you enter the same password"} onChange={(e) => setPasswordConfirmation(e.target.value)} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="cost" value="Cost" />
              </div>
              <TextInput id="cost" type="number" placeholder={"Cost currency is USD / $"} onChange={(e: any) => setCost(e.target.value)} />
            </div>
            <div className="w-full">
              <LoadingButton
                title={"Add Teacher"} 
                isProcessing={isProcessing}
                customStyle={"text-white bg-secondary-color hover:bg-secondary-hover rounded-full py-2 px-5 transition-colors"}
                action={addTeacher}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
  )
}
