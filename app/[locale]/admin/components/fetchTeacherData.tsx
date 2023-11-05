"use client"
import {CustomFlowbiteTheme, Table} from 'flowbite-react';
import {LiaPhoneSolid} from "react-icons/lia";
import {GoMail} from "react-icons/go";
import {BsTrash} from "react-icons/bs";
import { BiSolidEditAlt } from 'react-icons/bi';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import EditTeacherModal from './editTeacherModal';

export default function FetchTeacherData({teacherData, updateComponent} : {teacherData: any; updateComponent: () => void}) {
    const [handleModal, setHandleModal] = useState(false)
    // Craete Toast Message After Delete success
    
    const teacher = teacherData

    useEffect(() => {
        console.log(teacher)
    })

    const openModal = () => {
        setHandleModal(true)
    }

    const closeModal = () => {
        setHandleModal(false)
    }

    const removeTeacher = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher/${teacher.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json()).then(data => {
            console.log(data)
            updateComponent()
        }).catch(err => {
            console.log(err)
        })
    }

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {teacher.id.slice(-4)}
            </Table.Cell>
            <Table.Cell>
                {teacher.name}
            </Table.Cell>
            <Table.Cell>
                2
            </Table.Cell>
            <Table.Cell>
                {teacher.role}
            </Table.Cell>
            <Table.Cell>
                Sep 5,2022
            </Table.Cell>
            <Table.Cell>
                20
            </Table.Cell>
            <Table.Cell>
                10$
            </Table.Cell>
            <Table.Cell>
                <div className="flex flex-row justify-between gap-3">
                    <LiaPhoneSolid className={"text-2xl cursor-pointer"} 
                        onClick={() => {
                            location.href = `https://wa.me/+2${teacher.phone}`
                        }}
                    />
                   <Link href={`mailto:${teacher.email}`}> <GoMail className={"text-2xl cursor-pointer"} /></Link>
                </div>
            </Table.Cell>
            <Table.Cell>
                <div className="flex flex-row justify-between gap-4">
                    <BiSolidEditAlt className={"text-2xl cursor-pointer"} style={{color: "green"}} onClick={openModal}/>
                    <BsTrash className={"text-2xl cursor-pointer"} style={{color: "red"}} onClick={removeTeacher}/>
                    <EditTeacherModal openAssignModal={handleModal} handleCloseModal={closeModal} teacherDetails={teacher} />
                </div>
            </Table.Cell>
        </Table.Row>
  )
}
