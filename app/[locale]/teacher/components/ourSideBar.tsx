'use client';

import {CustomFlowbiteTheme, Sidebar} from 'flowbite-react';
import {usePathname, useRouter} from "next/navigation";
import {BiLogOut} from 'react-icons/bi';
import Cookies from 'universal-cookie';
export default function OurSideBar() {
    const pathName = usePathname();
    const cookies = new Cookies();
    const router = useRouter();
    const customTheme: CustomFlowbiteTheme['sidebar'] = {
        root: {
            inner: "h-full overflow-y-auto overflow-x-hidden rounded py-4 px-3 bg-white",
        },
        item: {
            base: "flex items-center justify-center rounded-[1.5rem] px-[1rem] py-[0.8rem] text-base font-medium text-black-color-one hover:text-white hover:bg-secondary-color",
            active: "bg-secondary-color text-white shadow-2xl",
        },
    }

    const logOut = () => {
        cookies.remove('token');
        cookies.remove('id');
        router.replace('/los_auth');
    }

    return (
        <Sidebar aria-label="Default sidebar example" theme={customTheme} className={"w-[14rem] pt-[70px]"}>
            <Sidebar.Items>
                <Sidebar.ItemGroup className={"text-center"}>
                    <Sidebar.Item
                        href="/teacher"
                        theme={customTheme.item}
                        active={pathName === "/teacher"}
                    >
                        <p>
                            Dashboard
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        theme={customTheme.item}
                        href="/teacher/students"
                        active={pathName === "/teacher/students"}
                    >
                        <p>
                            Students
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        theme={customTheme.item}
                        href="/teacher/material"
                        active={pathName === "/teacher/material"}
                    >
                        <p>
                            Material
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        theme={customTheme.item}
                        href="/teacher/transactions"
                        active={pathName === "/teacher/transactions"}
                    >
                        <p>
                            Transactions
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        onClick={logOut}
                    >
                        <div className="text-red-500 flex items-center justify-center gap-1 cursor-pointer">
                        <p>
                            LogOut
                        </p>
                            <BiLogOut />
                        </div>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}