'use client';

import {CustomFlowbiteTheme, Spinner, Table} from 'flowbite-react';
import { useEffect, useState } from 'react';
import MatrialComboBox from './matrialComboBox';
import FetchMatrialData from './fetchMatrialData';
import Cookies from 'universal-cookie';

export default function MatrialTable() {
    const [allMatrial, setAllMatrial]: any = useState([])
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

    const fetchAllMatrials = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/material`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.get("token")}`
            },
        }).then(response => response.json()).then(data => {
            console.log(data)
            setAllMatrial(data.data)
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })
    };

    useEffect(() => {
        fetchAllMatrials()
    }, [])

    return (
        <>
        <MatrialComboBox  updateComponent={fetchAllMatrials}/>
        <div className={"px-5 py-4"}>
        <Table>
            <Table.Head theme={customTheme.head}>
                <Table.HeadCell theme={customTheme.head}>
                    #ID
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Resource Title
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Course
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Age
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Added on
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Status
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Download
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
             (allMatrial && allMatrial.map((matrial: any, index: number) => {
                    return(
                        <FetchMatrialData key={index} matrialData={matrial} updateComponent={fetchAllMatrials}/>
                    )
                }))
            }
            </Table.Body>
        </Table>
        </div>
        </>
    )
}