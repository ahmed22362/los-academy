"use client";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import TeacherNavBar from "./components/teacherNavBar";
import OurSideBar from "./components/ourSideBar";
import { useEffect } from "react";
// import io from 'socket.io-client';
import Cookies from "universal-cookie";


export default function TeacherLayout(
    {children}: {
        children: React.ReactNode
    }) {
    
    // const cookies = new Cookies();
        
    // useEffect(() => {

    //         const socket = io(`https://bgjxgrgm-3000.uks1.devtunnels.ms/`, {
    //             auth: {
    //                 token: cookies.get('token')
    //             },
    //             autoConnect: true,
    //             reconnection: false
    //         })
    
    //         socket.on('connect', () => {
    //             console.log('connect')
    //             // socket.emit('hello')
    //         })
    
    //         socket.on('sesionStarted', (data) => {
    //             console.log('sesionStarted')
    //             console.log(data)
    //         })
    
    //         socket.on('disconnect', () => {
    //         console.log('disconnect')
    //         })

    // }, [])

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