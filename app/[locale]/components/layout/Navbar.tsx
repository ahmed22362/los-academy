"use client";

import { useTranslations } from "next-intl";
import LinkIntl from "next-intl/link";
import { MdLanguage } from "react-icons/md";
import Image from "next/image";
import { Dropdown, Navbar } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import {usePathname, useRouter} from "next/navigation";
import Cookies from "universal-cookie"

import dynamic from "next/dynamic";
import Link from "next/link";

export default function CustomNavbar() {

  const UserDropDown = dynamic(() => import("./userDropDown"), {
    ssr: false,
  });

  const LoginButton = dynamic(() => import("./loginButton"), {
    ssr: false,
  }); 

  const pathname = usePathname();
  const router = useRouter()
  const isAdminDashboard = pathname.startsWith('/admin');
  const isAdminLogin = pathname.startsWith('/los_auth');
  const isteacher = pathname.startsWith('/teacher');
  const cookies = new Cookies()
  const t = useTranslations("CustomNavbar");

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

  const userName = cookies.get('name')


  const logOut = async () => {
    const token = await cookies.get('token')
    const id = await cookies.get('id')
    const name = await cookies.get('name')

    if(token && id && name) {
        cookies.remove('token', { path: '/', });
        cookies.remove('id', { path: '/', });
        cookies.remove('name', { path: '/', });
        if(!token && !id && !name) {
            router.replace('/login');
        }
        router.replace('/login');
    }  else {
        console.error('Error removing cookies');
    } 
  }


  if (!(isAdminDashboard || isAdminLogin || isteacher)) {

    return (
      <>
        <Navbar rounded={true} theme={customNavTheme.root} className="fixed w-full top-0 z-10 border-b-2 border-white-color">
          <Navbar.Brand href="/" className="flex flex-row flex-wrap justify-center gap-3 rtl:flex-row-reverse">
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
              <Link href="/#hero" 
                className={` navBarLink rtl:ml-5 ${ pathname === "/#hero" || pathname === "/" ? 'active' : ' '}`}  >
                {t("home-link")}
              </Link>
            
            <Link 
              href="/#courses" 
              className={`navBarLink rtl:ml-5 ${pathname === "/#courses" ? 'active' : ''}`}>
              {t("courses-link")}
            </Link>

            <Link href="/#aboutUs"
              className={` navBarLink rtl:ml-5 ${pathname === "/#aboutUs" ? 'active' : ' '}`}
              >
              {t("about-link")}
            </Link>

            <Link 
              href="/#prices" 
              className={`navBarLink rtl:ml-5 ${pathname === "/#prices" ? 'active' :''}`}
              >
              {t("prices-link")}
            </Link>
            <Link href="/#feedback" 
              className={`navBarLink rtl:ml-5 ${pathname === "/#feedback" ? 'active' : ''}`}
              >
              {t("feedback-link")}
            </Link>
            <Link 
              href="/#contactus" 
              className={`navBarLink rtl:ml-5 ${pathname === "/#contactus" ? 'active' : ''}`}
                >
              {t("contact-link")}
            </Link>
          </Navbar.Collapse>
          <div className={
            "flex items-center max-md:items-baseline gap-2 rtl:font-sans rtl:text-lg rtl:max-sm:me-0 rtl:max-sm:ms-auto rtl:lg:w-[185px]"
            }>
            <Navbar.Toggle theme={customNavTheme.toggle} />
            {userName && userName
              ? 
                (<UserDropDown userName={userName} logOut={logOut}/>) 
              : 
                (
                  <LoginButton />
                )
              }
            <Dropdown label={<MdLanguage className="w-5 h-5" />} inline>
              <LinkIntl locale="en" href={"/"}>
                <Dropdown.Item className="rtl:flex-row-reverse ltr:flex-row">
                  en
                </Dropdown.Item>
              </LinkIntl>
              <LinkIntl locale="ar" href={"/"}>
                <Dropdown.Item className="rtl:flex-row-reverse ltr:flex-row">
                  ar
                </Dropdown.Item>
              </LinkIntl>
            </Dropdown>
          </div>
        </Navbar>
      </>
    );
  }
}