"use client";

import { CustomFlowbiteTheme, Sidebar } from "flowbite-react";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import Cookies from "universal-cookie";
import { useRouter, usePathname } from "next/navigation";
import ResponsiveAdminSideBar from "./responsiveAdminSideBar.component";

export default function OurSideBar() {
  const pathName = usePathname();
  const cookies = new Cookies();
  const router = useRouter();

  const logOut = async () => {
    const token = await cookies.get("token");
    const id = await cookies.get("id");

    if (token && id) {
      cookies.remove("token", { path: "/" });
      cookies.remove("id", { path: "/" });
      router.replace("/los_auth");
    } else {
      console.error("Error removing cookies");
    }
  };

  const customTheme: CustomFlowbiteTheme["sidebar"] = {
    root: {
      inner:
        "h-full overflow-y-auto overflow-x-hidden rounded py-4 px-3 bg-white",
    },
    item: {
      base: "flex items-center justify-center rounded-[1.5rem] px-[1rem] py-[0.8rem] text-base font-medium text-black-color-one hover:text-white hover:bg-secondary-color",
      active: "bg-secondary-color text-white shadow-2xl",
    },
  };

  const sidebarLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/teachers", label: "Teachers" },
    { href: "/admin/students", label: "Students" },
    { href: "/admin/sessions", label: "Sessions" },
    { href: "/admin/ongoing", label: "Ongoing Sessions" },
    { href: "/admin/continuity-status", label: "Continuity Status" },
    { href: "/admin/material", label: "Material" },
    { href: "/admin/transactions", label: "Transactions" },
    { href: "/admin/plans", label: "Plans" },
    { href: "/admin/courses", label: "Courses" },
    { href: "/admin/monthly-report", label: "Monthly Reports" },
  ];

  return (
    <>
      <Sidebar
        aria-label="Default sidebar example"
        theme={customTheme}
        className={"w-[14rem] pt-[70px] max-md:hidden"}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup className={"text-center"}>
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`sideBarLink ${
                  pathName === link.href ? " active" : ""
                }`}
              >
                <p>{link.label}</p>
              </Link>
            ))}
            <Sidebar.Item onClick={logOut}>
              <div className="text-red-500 flex items-center justify-center gap-1 cursor-pointer">
                <p>LogOut</p>
                <BiLogOut />
              </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div>
        <ResponsiveAdminSideBar logOut={logOut} sidebarLinks={sidebarLinks} />
      </div>
    </>
  );
}
