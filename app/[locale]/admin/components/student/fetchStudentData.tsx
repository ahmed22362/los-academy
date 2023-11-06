"use client"
import {CustomFlowbiteTheme, Table} from 'flowbite-react';
import {LiaPhoneSolid} from "react-icons/lia";
import {GoMail} from "react-icons/go";
import {BsTrash} from "react-icons/bs";
import { BiSolidEditAlt } from 'react-icons/bi';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import EditStudentModal from './editStuedntModal';


export default function FetchStudentData({studentData, updateComponent} : {studentData: any; updateComponent: () => void}) {
    const [handleModal, setHandleModal] = useState(false)
    const toast = useRef<Toast>(null);

    const showError = () => {
        toast.current?.show({severity:'error', summary: 'Error', detail:'Deleted Success', life: 3000});
    }
    
    const student = studentData


    const openModal = () => {
        setHandleModal(true)
    }

    const closeModal = () => {
        setHandleModal(false)
    }

    const removeTeacher = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/user/${student.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json()).then(data => {
            console.log(data)
            updateComponent()
            showError()
        }).catch(err => {
            console.log(err)
        })
    }

  return (

    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center">
        
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {student.id.slice(-4)}
            </Table.Cell>
            <Table.Cell>
                {student.name}
            </Table.Cell>
            <Table.Cell>
                {student.gender || "not available"}
            </Table.Cell>
            <Table.Cell>
                {student.age || "not available"}
            </Table.Cell>
            <Table.Cell>
                {student.availableFreeSession || "not available"}
            </Table.Cell>
            <Table.Cell>
            {student.remainSessions}
            </Table.Cell>
            <Table.Cell>
                <div className="flex flex-row justify-between gap-3">
                    <LiaPhoneSolid className={"text-2xl cursor-pointer"} 
                        onClick={() => {
                            location.href = `https://wa.me/+2${student.phone}`
                        }}
                    />
                   <Link href={`mailto:${student.email}`}> <GoMail className={"text-2xl cursor-pointer"} /></Link>
                </div>
            </Table.Cell>
            <Table.Cell>
                <div className="flex flex-row justify-between gap-4">
                    <Toast ref={toast} />
                    <BiSolidEditAlt className={"text-2xl cursor-pointer"} style={{color: "green"}} onClick={openModal}/>
                    <BsTrash className={"text-2xl cursor-pointer"} style={{color: "red"}} onClick={removeTeacher}/>
                    <EditStudentModal openAssignModal={handleModal} handleCloseModal={closeModal} studentDetails={student} updateComponent={updateComponent} />
                </div>
            </Table.Cell>
        </Table.Row>
  )
}
