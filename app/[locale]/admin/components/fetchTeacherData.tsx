"use client"
import {CustomFlowbiteTheme, Table} from 'flowbite-react';
import {LiaPhoneSolid} from "react-icons/lia";
import {GoMail} from "react-icons/go";
import {BsTrash} from "react-icons/bs";
import { BiSolidEditAlt } from 'react-icons/bi';
import Link from 'next/link';

export default function FetchTeacherData(data: any) {
    const teacher = data && data
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {teacher.data.id.slice(-4)}
            </Table.Cell>
            <Table.Cell>
                {teacher.data.name}
            </Table.Cell>
            <Table.Cell>
                2
            </Table.Cell>
            <Table.Cell>
                {teacher.data.role}
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
                            location.href = `https://wa.me/+2${teacher.data.phone}`
                        }}
                    />
                   <Link href={`mailto:${teacher.data.email}`}> <GoMail className={"text-2xl cursor-pointer"} /></Link>
                </div>
            </Table.Cell>
            <Table.Cell>
                <div className="flex flex-row justify-between gap-4">
                    <BiSolidEditAlt className={"text-2xl"} style={{color: "green"}}/>
                    <BsTrash className={"text-2xl"} style={{color: "red"}}/>
                </div>
            </Table.Cell>
        </Table.Row>
  )
}
