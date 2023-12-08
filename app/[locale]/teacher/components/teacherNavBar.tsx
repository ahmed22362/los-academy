"use client"
import Image from "next/image";
import {Dropdown} from "flowbite-react";
import Link from "next/link";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import TeacherProfile from "./teacherProfileModal"
import AdminProfile from "../../admin/components/adminProfileModal";

export default function TeacherNavBar() {

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

    const getCurrentTeacherData = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setData(data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
            getCurrentTeacherData()
    }, []);

    const updateComponent = () => {
        getCurrentTeacherData()
    }

    return(
        <nav className={
            "flex justify-between align-center w-full px-[18px] py-[12px] fixed top-0 z-50 bg-white shadow shadow-secondary-color"
        }>
            <div className="flex justify-center items-center">
                <Link href={"/"} className="flex justify-center items-center gap-[20px] max-sm:gap-[10px] max-sm:flex-col">
                <Image
                    src={"/logo.png"}
                    alt="logo image"
                    width={35}
                    height={35}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading={"lazy"}
                    className={"w-auo h-auto"}
                />
                <h2
                    className={"font-semibold"}
                    style={{
                        fontSize: "calc(16px + (24 - 16) * ((100vw - 320px) / (1920 - 320))"
                    }}
                >LOS Academy</h2>
            </Link>
            </div>
            <div className={"flex items-center justify-center gap-5 max-sm:gap-2"}>
                <div className="flex items-center justify-center gap-2 max-sm:flex-col">
                    <Image src={"/vectors/feedback3.svg"} alt={"avatar"} width={35} height={35} loading={"lazy"} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                    <div className="max-sm:text-xs flex flex-col items-start justify-center">
                        <span>welcome,</span>
                        {data && <h6>{data.name}</h6>}
                    </div>
                </div>
                <Dropdown label={""} inline>
                    <Dropdown.Item
                        className="rtl:flex-row-reverse ltr:flex-row"
                        onClick={handleOpenModal}>
                            Profile
                    </Dropdown.Item>
                </Dropdown>
                <AdminProfile
                    openAssignModal={handleModal}
                    handleCloseModal={handleCloseModal}
                    user={data}
                    updateComponent={updateComponent}
                />
                {/* <TeacherProfile
                    openAssignModal={handleModal}
                    handleCloseModal={handleCloseModal}
                    user={data}
                    updateComponent={getCurrentTeacherData}
                /> */}
            </div>
        </nav>
    )
}