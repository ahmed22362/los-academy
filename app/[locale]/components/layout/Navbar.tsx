"use client";

import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { MdLanguage } from "react-icons/md";
import Image from "next/image";
import { Dropdown, Navbar } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import Link2 from 'next/link';
import {usePathname} from "next/navigation";
// import {FaUser} from "react-icons/fa";
import {RiUserSharedFill} from "react-icons/ri"

export default function CustomNavbar() {

  const router = usePathname();
  const isAdminDashboard = router.startsWith('/admin');
  const isAdminLogin = router.startsWith('/los_auth');
  const isStudentDashboard =router.startsWith('/student_profile')
  if (isAdminDashboard || isAdminLogin ) {
    return null;
  }


  const t = useTranslations("CustomNavbar");
  const linkStyle = "bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] py-2.5 px-12 rounded-full rtl:lg:p-[15px]";
  const linkText = t("login-btn");

  const customNavTheme: CustomFlowbiteTheme["navbar"] = {
    root: {
      inner: {
        base: "flex flex-row justify-around max-lg:justify-between flex-wrap items-center px-2 max-md:px-5 max-sm:px-2 max-md:px-3",
        fluid: {
          off: "",
          on: ""
        }
      },
    },
    collapse: {
        base: "w-full lg:block lg:w-auto rtl:xl:block",
        list: "mt-4 flex flex-col lg:mt-0 lg:flex-row lg:space-x-8 lg:text-sm lg:font-medium gap-1 rtl:lg:space-x-3 rtl:gap-0",
        hidden: {
          on: "hidden",
          off: ""
    }
  },
    toggle: {
      base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden rtl:xl:hidden rtl:mr-1",
      icon: "h-6 w-6 shrink-0",
    },
    link: {
      active: {
        on: "text-secondary-color underline text-base rtl:font-semibold",
        off: "text-base text-primary-color hover:text-secondary-color rtl:font-semibold hover:underline transition-colors",
      },
    },
  };

  return (
    <>
      <Navbar rounded={true} theme={customNavTheme.root} className="fixed w-full top-0 z-10 border-b-2 border-white-color">
        <Navbar.Brand href="/" className="flex flex-row flex-wrap justify-center gap-3 rtl:flex-row-reverse">
          {/* Create gradient color for logo with animation*/}
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
        </Navbar.Brand>

        <Navbar.Collapse className="rtl:font-sans rtl:text-lg" theme={customNavTheme.collapse}>
          <Navbar.Link
            theme={customNavTheme.link}
            href="/#hero"
            active={true}
            className="rtl:ml-5"
          >
            {t("home-link")}
          </Navbar.Link>
          <Navbar.Link href="/#aboutUs" theme={customNavTheme.link}>
            {t("about-link")}
          </Navbar.Link>
          <Navbar.Link href="/#courses" theme={customNavTheme.link}>
            {t("courses-link")}
          </Navbar.Link>
          <Navbar.Link href="/#prices" theme={customNavTheme.link}>
            {t("prices-link")}
          </Navbar.Link>
          <Navbar.Link href="/#feedback" theme={customNavTheme.link}>
            {t("feedback-link")}
          </Navbar.Link>
          <Navbar.Link href="/#contactus" theme={customNavTheme.link}>
            {t("contact-link")}
          </Navbar.Link>
        </Navbar.Collapse>
        <div className={
          "flex items-center max-md:items-baseline gap-2 rtl:font-sans rtl:text-lg rtl:max-sm:me-0 rtl:max-sm:ms-auto rtl:lg:w-[185px]"
          }>
          <Navbar.Toggle theme={customNavTheme.toggle} />
          <div className="flex flex-col items-center">
            <Link2 href={"/login"} className={linkStyle + " hidden md:flex"}>
              {linkText}
            </Link2>
            <div className="mt-2 md:hidden">
              <Link2 href={"/login"}>
                  <RiUserSharedFill className={"text-secondary-color hover:text-secondary-hover transition-colors text-2xl"}/>
                </Link2>
            </div>
          </div>
          <Dropdown label={<MdLanguage className="w-5 h-5" />} inline>
            <Link locale="en" href={"/"}>
              <Dropdown.Item className="rtl:flex-row-reverse ltr:flex-row">
                en
              </Dropdown.Item>
            </Link>
            <Link locale="ar" href={"/"}>
              <Dropdown.Item className="rtl:flex-row-reverse ltr:flex-row">
                ar
              </Dropdown.Item>
            </Link>
          </Dropdown>
        </div>
      </Navbar>
    </>
  );
}
