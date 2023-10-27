'use client';

import {CustomFlowbiteTheme, Sidebar} from 'flowbite-react';

export default function OurSideBar() {

    const customTheme: CustomFlowbiteTheme['sidebar'] = {
        root: {
            inner: "h-full overflow-y-auto overflow-x-hidden rounded py-4 px-3 bg-white",
        },
        item: {
            base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:text-white hover:bg-secondary-color",
            active: "bg-secondary-color text-white"
        }
    }


    return (
        <Sidebar aria-label="Default sidebar example" theme={customTheme}>
            <Sidebar.Items>
                <Sidebar.ItemGroup className={"text-center"}>
                    <Sidebar.Item
                        href="/admin"
                        theme={customTheme.item}
                        active={true}
                    >
                        <p>
                            Dashboard
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        href="/admin/teachers"
                        theme={customTheme.item}
                    >
                        <p>
                            Teachers
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        theme={customTheme.item}
                        href="/admin/students"
                    >
                        <p>
                            Students
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        theme={customTheme.item}
                        href="/admin/material"
                    >
                        <p>
                            Material
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        theme={customTheme.item}
                        href="/admin/transactions"
                    >
                        <p>
                            Transactions
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        theme={customTheme.item}
                        href=""
                    >
                        <p>
                            Sign In
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        theme={customTheme.item}
                        href="#"
                    >
                        <p>
                            Sign Up
                        </p>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}