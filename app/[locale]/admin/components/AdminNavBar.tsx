"use client"
import Image from "next/image";
import {Dropdown} from "flowbite-react";

export default function AdminNavBar() {
    return(
        <nav className={
            "flex justify-between align-center w-full px-[18px] py-[12px] fixed top-0 z-50 bg-white shadow shadow-secondary-color"
        }>
            <div className={"flex justify-center items-center gap-[20px]"}>
                <Image
                    src={"/logo.png"}
                    alt="logo image"
                    width={35}
                    height={35}
                    priority={true}
                    loading={"eager"}
                    className={"w-[35px] h-[35px] max-md:w-[30px]"}
                />
                <h2
                    className={"font-semibold"}
                    style={{
                        fontSize: "calc(16px + (24 - 16) * ((100vw - 320px) / (1920 - 320))"
                    }}
                >LOS Academy</h2>
            </div>
            <div className={"flex items-center justify-center gap-5"}>
                <Image src={"/vectors/feedback3.svg"} alt={"avatar"} width={40} height={40} loading={"eager"} priority={true}/>
                <div>
                    <span>welcome</span>
                    <h6>Salma Sherif</h6>
                </div>
                <Dropdown label={""} inline>
                    <Dropdown.Item className="rtl:flex-row-reverse ltr:flex-row">
                            Profile
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </nav>
    )
}