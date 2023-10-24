"use client";

import { Card, CustomFlowbiteTheme } from "flowbite-react";
import Image from "next/image";
import PrimaryButton from './PrimaryButton';
import ModalCourse from "./ModalCourse";
import { useState } from "react";
import { useTranslations } from "next-intl";

function OurCard({title, paragraph, modalTarget}: {title: string, paragraph: string; modalTarget: number}) {

    const [openModal, setOpenModal] = useState<string | undefined>(undefined);

    const customTheme: CustomFlowbiteTheme = {
        card: {
            root: {
                children: "flex h-96 flex-col items-center justify-center text-center gap-0 p-6 max-sm:p-1",
            }
        }
    }

    const handleOpenModal = () => {
        setOpenModal('default');
    };

    const handleCloseModal = () => {
        setOpenModal(undefined);
    };
    const t = useTranslations("Hompage");
return (
    <Card theme={customTheme.card} className="max-w-sm">
        { 
            openModal === 'default' && 
            <ModalCourse
                modalTarget={modalTarget}
                handleOpen={openModal} 
                handleCloseModal={handleCloseModal} />
        }
        <div 
            className="rounded-full w-fit bg-white-color m-auto flex justify-center items-center py-7 px-5">
            <Image 
                src={"/vectors/courses.png"} 
                alt="course image" 
                width={80} height={80} 
                loading="lazy" 
                style={{width: "100"}}
            />
        </div>
        <h3
            className="my-2 text-2xl font-semibold tracking-tight text-black-color-one">{title}</h3>
        <p
            className="font-medium text-black-two-color text-base max-md:text-sm"
        >
            {paragraph}
        </p>
        <PrimaryButton 
            text={t("course-btn")} 
            ourStyle={
                "bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] py-4 px-12 shadow rounded-full w-50 mx-auto mt-5 max-md:py-2.5 max-md:px-10 max-md:w-45"
            }
            onClick={handleOpenModal}
        />
    </Card>
)
}

export default OurCard