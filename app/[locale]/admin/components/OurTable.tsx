'use client';

import {CustomFlowbiteTheme, Spinner, Table} from 'flowbite-react';
import { useEffect, useState } from 'react';
import FetchTeacherData from './fetchTeacherData';


export default function OurTable() {
    const [allTeachers, setAllTeachers]: any = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const customTheme: CustomFlowbiteTheme['table'] = {
        head: {
            base: "group/head text-xs uppercase text-black-color-one bg-white-color p-[15px]",
            cell: {
                base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-white-color px-6 py-3"
            }
        }
    }

    const fetchAllTechers = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json()).then(data => {
            // console.log(data.data)
            setAllTeachers(data.data)
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })
    };

    useEffect(() => {
        fetchAllTechers()
    }, [])

    // const rerenderTable = () => {
    //     fetchAllTechers()
    // }

    return (
        <div className={"px-5 py-4"}>
        <Table>
            <Table.Head theme={customTheme.head}>
                <Table.HeadCell theme={customTheme.head}>
                    #ID
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Name
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Student no.
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Role
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Joined
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Sessions Completed
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Session Cost
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Contact
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    <span className={"sr-only"}>opt</span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {isLoading ? (
                    <Table.Row>
                    <td><Spinner size="xl" /></td>
                    </Table.Row>
                 ) :
             (allTeachers && allTeachers.map((teacher: any) => {
                    return(
                        <FetchTeacherData key={teacher.id} teacherData={teacher} updateComponent={fetchAllTechers}/>
                    )
                }))
            }
            </Table.Body>
        </Table>
        </div>
    )
}