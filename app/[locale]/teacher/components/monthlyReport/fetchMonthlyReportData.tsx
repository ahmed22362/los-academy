"use client"

import {Table} from 'flowbite-react';
import {LiaPhoneSolid} from "react-icons/lia";
import {GoMail} from "react-icons/go";
import {BsTrash} from "react-icons/bs";
import { BiSolidEditAlt } from 'react-icons/bi';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';



export default function FetchMonthlyReportsData({reportData, updateComponent} : {reportData: any; updateComponent: () => void}) {
    const [handleModal, setHandleModal] = useState(false)
    const report = reportData
    // Toast reference
    // const [visible, setVisible] = useState(false);
    // const toast = useRef<Toast>(null);
    // const toastB = useRef<Toast>(null);
    // const toastC = useRef<Toast>(null);
    // const showError = () => {
    //     toast.current?.show({severity:'error', summary: 'Error', detail:'Deleted Success', life: 3000});
    // }
    

    // Modal Handling
    // const openModal = () => {
    //     setHandleModal(true)
    // }
    // const closeModal = () => {
    //     setHandleModal(false)
    // }
    // // Delete Confirmation
    // const clear = () => {
    //     toastC.current?.clear();
    //     setVisible(false);
    // };

    // Confirm Delete Student

    // const confirm = () => {
    //     if (!visible) {
    //         setVisible(true);
    //         toastC.current?.clear();
    //         toastC.current?.show({
    //             severity: 'warn',
    //             sticky: true,
    //             content: (
    //                 <div className="flex flex-column align-items-center" style={{ flex: '1' }}>
    //                    <div className="flex flex-col">
    //                    <div className="text-center">
    //                         <i className="pi pi-exclamation-triangle" style={{ fontSize: '3rem' }}></i>
    //                         <div className="font-bold text-xl my-3">Are you sure you want to delete?</div>
    //                     </div>
    //                     <div className="flex gap-4 items-center justify-center">
    //                         <button 
    //                             className="bg-danger-color hover:bg-red-400 transition-colors text-white px-5 py-2 rounded-xl" 
    //                             onClick={() => {
    //                                             confirmDelete()
    //                                             clear()
    //                                         }}
    //                         >Yes</button>
    //                         <button 
    //                             className='bg-primary-color hover:bg-blue-900 transition-colors text-white px-5 py-2 rounded-xl' 
    //                             onClick={() => clear()}
    //                         >No</button>
    //                     </div>
    //                    </div>
    //                 </div>
    //             )
    //         });
    //     }
    // };

    // const confirmDelete = () => {

    //     fetch(`${process.env.NEXT_PUBLIC_APIURL}/user/${student.id}`, {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     }).then(response => response.json()).then(data => {
    //         // console.log(data)
    //         updateComponent()
    //         showError()
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

  return (

    <Table.Row key={report.id} className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {report.id.slice(-4)}
            </Table.Cell>
            <Table.Cell>
                {report.name}
            </Table.Cell>
            <Table.Cell>
                {report.gender}
            </Table.Cell>
            <Table.Cell>
                {report.age}
            </Table.Cell>
            <Table.Cell>
                {report.availableFreeSession}
            </Table.Cell>
            <Table.Cell>
            {report.remainSessions}
            </Table.Cell>
            <Table.Cell>
                <div className="flex flex-row items-center justify-center gap-3">
                   <Link href={`mailto:${report.email}`}> <GoMail className={"text-2xl cursor-pointer"} /></Link>
                </div>
            </Table.Cell>
        </Table.Row>
  )
}