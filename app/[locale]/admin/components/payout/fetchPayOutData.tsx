"use client"

import {Table} from 'flowbite-react';

import { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import Cookies from 'universal-cookie';
import { convertDateTimeZone } from '@/helpers/convertDateAndTime';



export default function FetchPayOutData({payOutData, updateComponent} : {payOutData: any; updateComponent: () => void}) {
    const payout = payOutData
    const cookies = new Cookies();
    const convertTime = convertDateTimeZone
    // Toast reference
    const toast = useRef<Toast>(null);
    const showSuccess = () => {
        toast.current?.show({severity:'success', summary: 'Success', detail:'Updated Success', life: 3000});
    }

    const showError = () => {
        toast.current?.show({severity:'error', summary: 'Error', detail:'Updated failed try again later or contact support', life: 4000});
    }
    const acceptRequest = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/payout/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.get('token')}`
            },
            body: JSON.stringify({
                requestId: payout.id,
                status: "done"
            })
        }).then(response => response.json()).then(data => {
            console.log(data)
            if(data.status === 'success') {
                updateComponent()
                showSuccess()
            } else {
                showError()
            }
        }).catch(err => {
            console.log(err)
            showError()
        })
    }


  return (

    <Table.Row key={payout.id} className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {payout.id}
            </Table.Cell>
            <Table.Cell>
                {payout.teacher.name}
            </Table.Cell>
            <Table.Cell>
                {convertTime(payout.createdAt, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "YYYY-MM-DD h:mm A")}
            </Table.Cell>
            <Table.Cell>
                {payout.amount}$
            </Table.Cell>
            <Table.Cell>
            {payout.status === "pending" 
                ? 
                    <p className="p-2 bg-warning-color text-white rounded-full font-semibold">Pending</p>
                : 
                    payout.status === "failed" 
                ? 
                    <p className="p-2 bg-danger-color text-white rounded-full font-semibold">Failed</p> 
                : 
                    <p className="p-2 bg-success-color text-white rounded-full font-semibold">Successful</p>
                }
                </Table.Cell>
            <Table.Cell>
                <div className="flex flex-row justify-center items-center gap-4">
                    <Toast ref={toast} />
                    {payout.status === "pending" ?
                    <button
                        onClick={acceptRequest}
                        className={`px-3 py-2 bg-secondary-color hover:bg-secondary-hover transition-colors text-white rounded-full font-semibold`}
                    >Accept Request</button>
                    : <p className="p-2 bg-success-color text-white rounded-full font-semibold">accepted before</p>}
                </div>
            </Table.Cell>
        </Table.Row>
  )
}
