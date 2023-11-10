'use client';

import {CustomFlowbiteTheme, Spinner, Table} from 'flowbite-react';
import { useEffect, useState } from 'react';
import PayOutComboBox from './payOutComboBox';
import FetchPayOutData from './fetchPayOutData';
import Cookies from 'universal-cookie';



export default function PayOutTable() {
    const [allPayOuts, setAllPayOuts]: any = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const cookies = new Cookies()

    const customTheme: CustomFlowbiteTheme['table'] = {
        head: {
            base: "group/head text-xs uppercase text-black-color-one bg-white-color p-[15px] text-center",
            cell: {
                base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-white-color px-6 py-3"
            }
        }
    }

    const fetchAllPayOuts = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/payout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.get('token')}`
            },
        }).then(response => response.json()).then(data => {
            console.log(data)
            setAllPayOuts(data.data)
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })
    };

    useEffect(() => {
        fetchAllPayOuts()
    }, [])

    return (
        <>
        <PayOutComboBox  updateComponent={fetchAllPayOuts}/>
        <div className={"px-5 py-4"}>
        <Table>
            <Table.Head theme={customTheme.head}>
                <Table.HeadCell theme={customTheme.head}>
                    #ID
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Teacher Name
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Date
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Amount
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Status
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    options
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {isLoading ? (
                    <Table.Row>
                    <td><Spinner size="xl" /></td>
                    </Table.Row>
                 ) :
             (allPayOuts > 0 ? allPayOuts.map((payOut: any, index: number) => {
                    return(
                        <FetchPayOutData key={index} payOutData={payOut} updateComponent={fetchAllPayOuts}/>
                    )
                })
                : <p className="p-3">No Transactions</p>
                )
            }
            </Table.Body>
        </Table>
        </div>
        </>
    )
}