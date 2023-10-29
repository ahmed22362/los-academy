'use client';

import {CustomFlowbiteTheme, Table} from 'flowbite-react';
import {LiaPhoneSolid} from "react-icons/lia";
import {GoMail} from "react-icons/go";
import {BsTrash} from "react-icons/bs";

export default function OurTable() {

    const customTheme: CustomFlowbiteTheme['table'] = {
        head: {
            base: "group/head text-xs uppercase text-black-color-one bg-white-color p-[15px]",
            cell: {
                base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-white-color px-6 py-3"
            }
        }
    }


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
                    Subject
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
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                       100
                    </Table.Cell>
                    <Table.Cell>
                        Salma
                    </Table.Cell>
                    <Table.Cell>
                        2
                    </Table.Cell>
                    <Table.Cell>
                        Arabic
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
                        <div className="flex flex-row justify-between">
                            <LiaPhoneSolid className={"text-2xl"}/>
                            <GoMail className={"text-2xl"} />
                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        <div className="flex flex-row justify-between">
                            <BsTrash className={"text-2xl"} style={{color: "red"}}/>
                        </div>
                    </Table.Cell>
                </Table.Row><Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                       100
                    </Table.Cell>
                    <Table.Cell>
                        Salma
                    </Table.Cell>
                    <Table.Cell>
                        2
                    </Table.Cell>
                    <Table.Cell>
                        Arabic
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
                        <div className="flex flex-row justify-between">
                            <LiaPhoneSolid className={"text-2xl"}/>
                            <GoMail className={"text-2xl"} />
                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        <div className="flex flex-row justify-between">
                            <BsTrash className={"text-2xl"} style={{color: "red"}}/>
                        </div>
                    </Table.Cell>
                </Table.Row><Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                       100
                    </Table.Cell>
                    <Table.Cell>
                        Salma
                    </Table.Cell>
                    <Table.Cell>
                        2
                    </Table.Cell>
                    <Table.Cell>
                        Arabic
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
                        <div className="flex flex-row justify-between">
                            <LiaPhoneSolid className={"text-2xl"}/>
                            <GoMail className={"text-2xl"} />
                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        <div className="flex flex-row justify-between">
                            <BsTrash className={"text-2xl"} style={{color: "red"}}/>
                        </div>
                    </Table.Cell>
                </Table.Row><Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                       100
                    </Table.Cell>
                    <Table.Cell>
                        Salma
                    </Table.Cell>
                    <Table.Cell>
                        2
                    </Table.Cell>
                    <Table.Cell>
                        Arabic
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
                        <div className="flex flex-row justify-between">
                            <LiaPhoneSolid className={"text-2xl"}/>
                            <GoMail className={"text-2xl"} />
                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        <div className="flex flex-row justify-between">
                            <BsTrash className={"text-2xl"} style={{color: "red"}}/>
                        </div>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
        </div>
    )
}