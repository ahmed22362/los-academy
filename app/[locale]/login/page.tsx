"use client";

import { PrimaryButton } from "../components";
import { CustomFlowbiteTheme, Tabs } from "flowbite-react";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function page() {
  interface FormData {
    name: string;
    age: number;
    phoneNumber: number;
    email: string;
    password: string;
    passwordConfirmation: string;
  }
  const [activeTab, setActiveTab] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: 0,
    phoneNumber: 0,
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const url = `${process.env.NEXT_PUBLIC_APIURL}/user/auth/signup`;
  const handleFormSubmit = () => {
    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log(data);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const customeTheme: CustomFlowbiteTheme = {
    tab: {
      tablist: {
        base: "flex justify-center items-center m-auto w-auto bg-secondary-color rounded-full px-12 py-2",
        tabitem: {
          styles: {
            pills: {
              active: {
                on: "rounded-full bg-white focus:ring-0 text-black px-8 py-2",
                off: "rounded-full px-8 py-2 focus:ring-0 bg-secondary-color hover:bg-white hover:text-black text-white transition-colors",
              },
            },
          },
        },
      },
    },
  };

  return (
    <section className="mt-8">
      <div className="flex items-center mt-40 justify-evenly gap-20 sm:flex-row flex-col-reverse ">
        <div className="image transition-all duration-500 ">
          <Image
            src={`${
              activeTab ? "/vectors/login.svg" : "/vectors/signup.svg"
            }`}
            className="transition-all duration-500 w-auto h-auto"
            width={400}
            height={300}
            alt={"login image"}
            loading="eager"
            priority={true}
          />
        </div>
        <div className="login_contnet sm:w-auto mx-3" style={{ width: "" }}>
          <Tabs.Group
            theme={customeTheme.tab}
            aria-label="Pills"
            style="pills"
            onActiveTabChange={() => setActiveTab(!activeTab)}
          >
            <Tabs.Item active title="Login">
              <div
                className=" flex justify-center items-center gap-3  flex-wrap "
                style={{ minHeight: "300px", width: "100%" }}
              >
                <h3 className="font-bold	 text-xl	"> Welcome Back ! </h3>
                <div className="flex flex-col gap-4" style={{ width: "100%" }}>
                  <input
                    className="border-blue-600 gradiant-color	 rounded-3xl w-full		border-2	"
                    type="email"
                    placeholder="Email address "
                  />
                  <input
                    className="border-blue-600 gradiant-color	 rounded-3xl w-full		border-2	"
                    type="password"
                    placeholder="Password"
                  />
                  <Link className="font-semibold	 underline" href={"#"}>
                    Forget Password ?
                  </Link>
                  <PrimaryButton
                    text="Login"
                    ourStyle="bg-secondary-color text-white	py-3 border rounded-3xl text-xl	 w-full"
                  />
                  <span className="text-center">Or Login with </span>
                  <div className="flex gap-3">
                    <PrimaryButton
                      text="Google"
                      ourStyle="border-blue-700 rounded-3xl w-full	py-2	border-2 hover:bg-blue-700 hover:text-white transition-all	duration-500	"
                    />
                    <PrimaryButton
                      text="Facebook"
                      ourStyle="border-blue-700 rounded-3xl w-full	py-2	border-2 hover:bg-blue-700 hover:text-white transition-all	duration-500	"
                    />
                  </div>
                </div>
              </div>
            </Tabs.Item>
            <Tabs.Item title="Signup" onClick={() => setActiveTab(false)}>
              <div
                className=" flex justify-center items-center gap-3 flex-col flex-wrap "
                style={{ minHeight: "300px", width: "100%" }}
              >
                <Toast>
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                    <HiCheck className="h-5 w-5" />
                  </div>
                  <div className="ml-3 text-sm font-normal">
                    Item moved successfully.
                  </div>
                  <Toast.Toggle />
                </Toast>
                <h3 className="font-bold	 text-xl	">
                  {" "}
                  Welcome to LOS Accademy !{" "}
                </h3>
                <div className="flex flex-col gap-4" style={{ width: "100%" }}>
                  <div className="flex gap-4">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="border-blue-600 gradiant-color rounded-3xl w-full border-2"
                      type="text"
                      placeholder="Full Name"
                    />
                    <input
                      name="age"
                      value={formData.age}
                      onChange={handleFormChange}
                      className="border-blue-600 gradiant-color rounded-3xl w-full appearance-none border-2"
                      type="tel"
                      placeholder="Age"
                    />
                  </div>
                  <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleFormChange}
                    type="tel"
                    className="border-blue-600 gradiant-color rounded-3xl w-full appearance-none border-2"
                    placeholder="Phone number"
                  />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="border-blue-600 gradiant-color rounded-3xl w-full border-2"
                    type="email"
                    placeholder="Email address"
                  />
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    className="border-blue-600 gradiant-color rounded-3xl w-full border-2"
                    type="password"
                    placeholder="Password"
                  />
                  <input
                    name="passwordConfirmation"
                    value={formData.passwordConfirmation}
                    onChange={handleFormChange}
                    className="border-blue-600 gradiant-color rounded-3xl w-full border-2"
                    type="password"
                    placeholder="Confirm Password"
                  />
                  <PrimaryButton
                    text="Register"
                    ourStyle="bg-secondary-color text-white	py-3 border rounded-3xl text-xl	 w-full"
                    onClick={handleFormSubmit}
                  />
                  <span className="text-center">Or Register with </span>
                  <div className="flex gap-3">
                    <PrimaryButton
                      text="Google"
                      ourStyle="border-blue-700 rounded-3xl w-full	py-2	border-2 hover:bg-blue-700 hover:text-white transition-all	duration-500	"
                    />
                    <PrimaryButton
                      text="Facebook"
                      ourStyle="border-blue-700 rounded-3xl w-full	py-2	border-2 hover:bg-blue-700 hover:text-white transition-all	duration-500	"
                    />
                  </div>
                </div>
              </div>
            </Tabs.Item>
          </Tabs.Group>
        </div>
      </div>
    </section>
  );
}

export default page;
