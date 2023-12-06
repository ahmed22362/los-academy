"use client";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import TeacherNavBar from "./components/teacherNavBar";
import OurSideBar from "./components/ourSideBar";
import { useEffect } from "react";
import Cookies from "universal-cookie";


export default function TeacherLayout(
    {children}: {
        children: React.ReactNode
    }) {
    
    const cookies = new Cookies();
        


    return (
        <section>
            <TeacherNavBar />
            <aside className={"fixed left-0 h-full"}>
                <OurSideBar />
            </aside>
                {children}
        </section>
    )
}