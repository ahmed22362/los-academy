"use client";

import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { MdLanguage } from "react-icons/md";
import { PrimaryButton } from "../components";
import Image from "next/image";
import { Dropdown, Navbar } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";

export default function CustomNavbar() {
  const t = useTranslations("CustomNavbar");

  const customNavTheme: CustomFlowbiteTheme["navbar"] = {
    root: {
      inner: {
        base: "flex flex-row justify-between items-center flex-wrap px-10 max-md:px-3",
        fluid: {
          off: "",
          on: ""
        }
      },
    },
    collapse: {
        base: "w-full lg:block lg:w-auto rtl:xl:block",
        list: "mt-4 flex flex-col lg:mt-0 lg:flex-row lg:space-x-8 lg:text-sm lg:font-medium gap-1",
        hidden: {
          on: "hidden",
          off: ""
    }
  },
    toggle: {
      base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none ms-auto me-5 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden rtl:xl:hidden",
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
      <Navbar rounded={true} theme={customNavTheme.root}>
        <Navbar.Brand className="flex flex-row flex-wrap justify-center gap-5 rtl:flex-row-reverse">
          <Image
            src={"/logo.png"}
            alt="logo image"
            width={36}
            height={36}
            priority={true}
          />
          <h2 className={"font-semibold text-xl"}>LOS Academy</h2>
        </Navbar.Brand>
        <Navbar.Toggle theme={customNavTheme.toggle} />
        <Navbar.Collapse className="rtl:font-sans rtl:text-lg" theme={customNavTheme.collapse}>
          <Navbar.Link
            theme={customNavTheme.link}
            href="/#"
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
          <Navbar.Link href="/#" theme={customNavTheme.link}>
            {t("prices-link")}
          </Navbar.Link>
          <Navbar.Link href="/#" theme={customNavTheme.link}>
            {t("feedback-link")}
          </Navbar.Link>
          <Navbar.Link href="/#" theme={customNavTheme.link}>
            {t("contact-link")}
          </Navbar.Link>
        </Navbar.Collapse>
        <div className={
          "flex align-center m-3 flex-wrap gap-2 max-sm:ms-auto rtl:font-sans rtl:text-lg rtl:max-sm:me-0 rtl:max-sm:ms-auto"
          }>
          <PrimaryButton
            ourStyle={
              "bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] py-2.5 px-12 shadow rounded-full"
            }
            text={t("login-btn")}
            onClick={() => {console.log("click")}}
          />
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
