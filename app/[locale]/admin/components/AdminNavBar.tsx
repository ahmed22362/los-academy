"use client"
import Image from "next/image";
import {Dropdown} from "flowbite-react";
import Link from "next/link";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import AdminProfile from "./adminProfileModal";

export default function AdminNavBar() {

    const cookies = new Cookies();
    const token = cookies.get('token')
    const [data, setData] = useState<null | any>(null)
    const [handleModal, setHandleModal] = useState(false)

    const handleOpenModal = () => {
        setHandleModal(true)
    }

    const handleCloseModal = () => {
        setHandleModal(false)
    }
    const getCurrentAdminData = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setData(data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getCurrentAdminData();
    }, []);

    return(
        <nav className={
            "flex justify-between align-center w-full px-[18px] py-[12px] fixed top-0 z-50 bg-white shadow shadow-secondary-color"
        }>
            <div className={""}>
                <Link href={"/"} className="flex justify-center items-center gap-[20px]">
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
            </Link>
            </div>
            <div className={"flex items-center justify-center gap-5"}>
                <Image src={"/vectors/feedback3.svg"} alt={"avatar"} width={40} height={40} loading={"eager"} priority={true}/>
                <div>
                    <span>welcome</span>
                    {data && <h6>{data.name}</h6>}
                </div>
                <Dropdown label={""} inline>
                    <Dropdown.Item 
                        href={"#"}
                        onClick={handleOpenModal}
                        className="rtl:flex-row-reverse ltr:flex-row">
                            Profile
                    </Dropdown.Item>
                </Dropdown>
                <AdminProfile
                    openAssignModal={handleModal}
                    handleCloseModal={handleCloseModal}
                    user={data}
                    updateComponent={getCurrentAdminData}
                />
            </div>
        </nav>
    )
}