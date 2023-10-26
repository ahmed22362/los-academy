"use client"

import Image from "next/image";
import {Dropdown} from "flowbite-react";
import {MdLanguage} from "react-icons/md";
import Link from "next-intl/link";

export default function AdminNavBar() {
    return(
        <nav className={
            "flex justify-between align-center w-full p-10"
        }>
            <div>
                <Image
                    src={"/logo.png"}
                    alt="logo image"
                    width={30}
                    height={30}
                    priority={true}
                    loading={"eager"}
                    className={"w-auto h-auto max-md:w-[30px]"}
                />
                <h2
                    className={"font-semibold"}
                    style={{
                        fontSize: "calc(16px + (24 - 16) * ((100vw - 320px) / (1920 - 320))"
                    }}
                >LOS Academy</h2>
            </div>
            <div>
                <Image src={"/vectors/feedback3.svg"} alt={"avatar"} width={40} height={40} loading={"eager"} priority={true}/>
                <div>
                    <span>welcome</span>
                    <h6>Salma Sherif</h6>
                </div>
                <Dropdown label={<MdLanguage className="w-5 h-5" />} inline>
                    <Dropdown.Item className="rtl:flex-row-reverse ltr:flex-row">
                            Profile
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </nav>
    )
}