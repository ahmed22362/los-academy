'use client';

import {CustomFlowbiteTheme, Spinner, Table} from 'flowbite-react';
import { useEffect, useState } from 'react';
import PlanComboBox from './planComboBox';
import FetchPlanData from './fetchPlanData';


export default function PlanTable() {
    const [allPlans, setAllPlan]: any = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const customTheme: CustomFlowbiteTheme['table'] = {
        head: {
            base: "group/head text-xs uppercase text-black-color-one bg-white-color p-[15px] text-center",
            cell: {
                base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-white-color px-6 py-3"
            }
        }
    }

    const fetchAllPlans = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/plan`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json()).then(data => {
            const sortedData = data.data.sort((x: any, y: any) => x.id - y.id)
            console.log(sortedData)
            setAllPlan(sortedData)
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })
    };

    useEffect(() => {
        fetchAllPlans()
    }, [])

    return (
        <>
        <PlanComboBox  updateComponent={fetchAllPlans}/>
        <div className={"px-5 py-4"}>
        <Table>
            <Table.Head theme={customTheme.head}>
                <Table.HeadCell theme={customTheme.head}>
                    #ID
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Title
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Session Duration
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Sessions Count
                </Table.HeadCell>
                <Table.HeadCell theme={customTheme.head}>
                    Sessions Per Week
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
             (allPlans && allPlans.length > 0 ? allPlans.map((plan: any, index: number) => {
                    return(
                        <FetchPlanData key={index} planData={plan} updateComponent={fetchAllPlans}/>
                    )
                }):
                    (<p className='p-3'>There is no plans</p>)
                )
            }
            </Table.Body>
        </Table>
        </div>
        </>
    )
}