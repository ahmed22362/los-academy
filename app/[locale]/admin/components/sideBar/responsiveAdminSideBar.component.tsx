"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FiAlignLeft } from "react-icons/fi";
interface SidebarLinks {
  href: string;
  label: string;
}
export default function ResponsiveAdminSideBar({
  logOut: logOut,
  sidebarLinks,
}: {
  logOut: () => void;
  sidebarLinks?: SidebarLinks[];
}) {
  const [visible, setVisible] = useState<boolean>(false);
  const pathName = usePathname();

  return (
    <div>
      <button
        onClick={() => setVisible(true)}
        className="text-secondary-color hover:text-blue-900 transition-colors fixed top-[100px] left-0 text-[30px] cursor-pointer hidden max-md:block"
      >
        <FiAlignLeft />
      </button>
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <ul className={"flex flex-col gap-3"}>
          {sidebarLinks?.map((link) => (
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
          <button
            onClick={logOut}
            className="text-red-500 flex items-center justify-center gap-1 cursor-pointer"
          >
            <p>LogOut</p>
            <BiLogOut />
          </button>
        </ul>
      </Sidebar>
    </div>
  );
}
