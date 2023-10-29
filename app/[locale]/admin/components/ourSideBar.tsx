'use client';

import {CustomFlowbiteTheme, Sidebar} from 'flowbite-react';
import {usePathname} from "next/navigation";

export default function OurSideBar() {
    const pathName = usePathname();

    const customTheme: CustomFlowbiteTheme['sidebar'] = {
        root: {
            inner: "h-full overflow-y-auto overflow-x-hidden rounded py-4 px-3 bg-white",
        },
        item: {
            base: "flex items-center justify-center rounded-[1.5rem] px-[1rem] py-[0.8rem] text-base font-medium text-black-color-one hover:text-white hover:bg-secondary-color",
            active: "bg-secondary-color text-white shadow-2xl",
        },
    }


    return (
        <Sidebar aria-label="Default sidebar example" theme={customTheme} className={"w-[14rem] pt-[70px]"}>
            <Sidebar.Items>
                <Sidebar.ItemGroup className={"text-center"}>
                    <Sidebar.Item
                        href="/admin"
                        theme={customTheme.item}
                        active={pathName === "/admin"}
                    >
                        <p>
                            Dashboard
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        href="/admin/teachers"
                        theme={customTheme.item}
                        active={pathName === "/admin/teachers"}
                    >
                        <p>
                            Teachers
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        theme={customTheme.item}
                        href="/admin/students"
                        active={pathName === "/admin/students"}
                    >
                        <p>
                            Students
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        theme={customTheme.item}
                        href="/admin/material"
                        active={pathName === "/admin/Material"}
                    >
                        <p>
                            Material
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        theme={customTheme.item}
                        href="/admin/transactions"
                        active={pathName === "/admin/transactions"}
                    >
                        <p>
                            Transactions
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        theme={customTheme.item}
                        href="/"
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