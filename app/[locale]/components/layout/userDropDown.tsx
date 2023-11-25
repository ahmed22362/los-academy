"use client";

import { Dropdown } from "flowbite-react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { LiaCreditCardSolid, LiaEditSolid, LiaUserEditSolid } from "react-icons/lia";
import Cookies from "universal-cookie";
import UserFeedBack from "../../student_profile/components/userFeedBack";
import StudentPlanModal from "../../student_profile/components/StudentPlanModal";
import Subscribtion from "../../student_profile/components/Subscribtion";
import EditProfile from "../../student_profile/components/edit_profile";
import SessionsModal from "../../student_profile/components/sessionsModal";

interface UserInfo {
    name: string;
    email: string;
    phone: string;
    id: number;
    gender: string;
    age?: number; // make age optional if it may not be present in the API response
  }
export default function UserDropDown({userName, logOut}: {userName: string; logOut: () => void}) {
    const [userFeedbackModal, setUserFeedbackModal] = useState<boolean>(false)
    const [openSubscribtionModal, setOpenSubscribtionModal] = useState<boolean>(false);
    const [openSeesionModal, setOpenSeesionModal] = useState<boolean>(false);
    const [openPlansModal, setOpenPlansModal] = useState<boolean>(false);
    const [myInfo, setMyInfo] = useState<UserInfo | undefined>();
    const [openEditeProfileModal, setOpenEditeProfileModal] = useState<boolean>(false);
    const cookies = new Cookies()
    



    return (
        <div className="flex flex-row items-center justify-center gap-2">
                  <Link href={"/student_profile"} className={"bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] py-2.5 px-12 rounded-full rtl:lg:p-[15px]"}>
                    {userName}'s Profile
                  </Link>
                  <Dropdown label={""} inline>   
                      <Dropdown.Item 
                        onClick={()=> setOpenEditeProfileModal(true)}
                        className="gap-3 rtl:flex-row-reverse ltr:flex-row">    
                        <LiaUserEditSolid className="text-[26px] font-semibold" /> 
                        <span>Edit Profile</span>
                      </Dropdown.Item>
                    
                      <Dropdown.Item 
                        onClick={()=> setOpenSeesionModal(true)}
                        className="gap-3 rtl:flex-row-reverse ltr:flex-row">
                      <CiCalendar  className="text-[26px] font-semibold" /> 
                      <span className="py-2">Sessions</span>
                      </Dropdown.Item>
                      <Dropdown.Item 
                        onClick={()=> setOpenPlansModal(true)}
                        className="gap-3 rtl:flex-row-reverse ltr:flex-row">
                      <CiCalendar  className="text-[26px] font-semibold" /> 
                      <span className="py-2">Plans</span>
                      </Dropdown.Item>
                      <Dropdown.Item 
                        onClick={()=> setOpenSubscribtionModal(true)}
                        className="gap-3 rtl:flex-row-reverse ltr:flex-row">
                        <LiaCreditCardSolid  className="text-[26px] font-semibold" /> 
                        <span className="py-2">My Subscription</span>
                      </Dropdown.Item>
                      <Dropdown.Item 
                        onClick={()=> setUserFeedbackModal(true)}
                        className="gap-3 rtl:flex-row-reverse ltr:flex-row">
                        <LiaEditSolid  className="text-[26px] font-semibold" /> 
                        <span className="py-2">Add Feedback</span>
                      </Dropdown.Item>
                      <hr />
                      <Dropdown.Item 
                          onClick={logOut}
                          className="gap-3 rtl:flex-row-reverse ltr:flex-row">
                          <IoIosLogOut className="text-[26px] text-danger-color font-semibold" /> 
                          <span className="py-2">logout</span>
                      </Dropdown.Item>
                  </Dropdown>
                    <UserFeedBack setUserFeedbackModal={setUserFeedbackModal} userFeedbackModal={userFeedbackModal}/>
                    <Subscribtion setOpenSubscribtionModal={setOpenSubscribtionModal} openSubscribtionModal={openSubscribtionModal}/>
                    <SessionsModal setOpenSeesionModal={setOpenSeesionModal} openSeesionModal={openSeesionModal} />
                    <EditProfile setMyInfo={setMyInfo} setOpenEditeProfileModal={setOpenEditeProfileModal} openEditeProfileModal={openEditeProfileModal} />
                    <StudentPlanModal openPlansModal={openPlansModal} setOpenPlansModal={setOpenPlansModal}/>
                </div>
    );
}