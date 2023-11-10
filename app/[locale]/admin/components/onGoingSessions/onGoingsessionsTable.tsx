'use client';

import {CustomFlowbiteTheme, Spinner, Table} from 'flowbite-react';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import OnGoingSessionComboBox from './onGoingsessionComboBox';
import FetchOnGoingSessionData from './onGoingfetchSessionData';


export default function OnGoingSesstionsTable() {
    const [allSessions, setAllSessions]: any = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const cookies = new Cookies();
    const customTheme: CustomFlowbiteTheme['table'] = {
        head: {
            base: "group/head text-xs uppercase text-black-color-one bg-white-color p-[15px] text-center",
            cell: {
                base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-white-color px-6 py-3"
            }
        }
    }

    const fetchAllSessions = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/?status=ongoing`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.get("token")}`
            },
        }).then(response => response.json()).then(data => {
            console.log(data)
            const sorted = data.data.sort((a: any, b: any) => {
                return new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime();
            })
            setAllSessions(sorted)
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })
    };

    useEffect(() => {
        fetchAllSessions()
    }, [])

    return (
        <>
        <OnGoingSessionComboBox  updateComponent={fetchAllSessions}/>
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
                    Student Name
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Date
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Time
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Type
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Status
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {isLoading ? (
                    <Table.Row>
                    <td><Spinner size="xl" /></td>
                    </Table.Row>
                 ) :
             (allSessions && allSessions.map((session: any, index: number) => {
                    return(
                        <FetchOnGoingSessionData key={index} sessionData={session} updateComponent={fetchAllSessions}/>
                    )
                }))
            }
            </Table.Body>
        </Table>
        </div>
        </>
    )
}