import { CustomFlowbiteTheme, Sidebar } from "flowbite-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";
import Cookies from "universal-cookie";
import ResponsiveAdminSideBar from "../../admin/components/sideBar/responsiveAdminSideBar.component";

export default function OurSideBar() {
  const pathName = usePathname();
  const cookies = new Cookies();
  const router = useRouter();
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

  const sidebarLinks = [
    { href: "/teacher", label: "Dashboard" },
    { href: "/teacher/students", label: "Students" },
    { href: "/teacher/sessions", label: "Sessions" },
    { href: "/teacher/material", label: "Material" },
    { href: "/teacher/transactions", label: "Transactions" },
    { href: "/teacher/monthly-report", label: "Monthly Reports" },
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
              <Link key={link.href} href={link.href}>
                <p
                  className={`sideBarLink ${
                    pathName === link.href ? " active" : ""
                  }`}
                >
                  {link.label}
                </p>
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
