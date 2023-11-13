"use client";

import PrimaryButton  from "./../components/PrimaryButton";
import { CustomFlowbiteTheme, Tabs } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Cookies from "universal-cookie";
import { Toast } from "primereact/toast";
import {useRouter} from 'next/navigation';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";




function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const showSuccess = (msg :any) => {
    toast.current?.show({severity:'success', summary: 'Success', detail:msg, life: 3000});
}
  const showError = (msg: string) => {
      toast.current?.show({severity:'error', summary: 'Error', detail: msg, life: 4000});
  }

  const cookies = new Cookies();

  const [userData, setUserData] = useState()
  interface FormData {
    name: string;
    age: String;
    phoneNumber: String;
    email: string;
    password: string;
    passwordConfirmation: string;
  }
  const [activeTab, setActiveTab] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    phoneNumber: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const url ='https://los-academy.onrender.com/api/v1/';
  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
  
    // Use parseFloat or parseInt to parse the values as numbers
    setFormData({ ...formData, [name]: name === 'age' || name === 'phoneNumber' ? parseInt(value, 10) : value });
  };
  const handleFormSubmit = () => {
    fetch(`${url}user/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          showSuccess('Registration Successfully');
          console.log(data);
          setTimeout(() => {
            router.push('/student_profile');
          }, 3000);
          setUserData(data)
          cookies.set('token', data.token);
        } else {
          showError('Registration failed');
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
        showError('An error occurred')
      });
  };


  // login


      const handleEmailChange = (e :any) => {
        setEmail(e.target.value);
      };

      const handlePasswordChange = (e :any) => {
        setPassword(e.target.value);
      };

      const formDataLogin = {
        email: email,
        password: password,
      };


  const handleLogin = () => {
    alert('clicked')
      console.log(formDataLogin);
          
    // Perform basic client-side validation
    if (!email || !password) {
      showError("Please fill in all fields");
      return;
    }

    // Send a POST request to the login endpoint
    fetch(`${url}user/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataLogin),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          showSuccess('Login Successfully');
          console.log(data);
          setTimeout(() => {
            // Redirect to a protected route upon successful login
            router.push('/student_profile');
          }, 3000);
          // Save user token in a cookie or state as needed
          cookies.set('token', data.token);
        } else {
          showError(`${data.message}`);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
        showError('An error occurred');
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
      <Toast ref={toast}  />

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
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email address "
                  />
                  <input
                    className="border-blue-600 gradiant-color	 rounded-3xl w-full		border-2	"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                  />
                  <Link className="font-semibold	 underline" href={"#"}>
                    Forget Password ?
                  </Link>
                  <PrimaryButton
                  onClick={handleLogin}
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
                      onChange={handleFormChange}
                      className="border-blue-600 gradiant-color rounded-3xl w-full appearance-none border-2"
                      type="tel"
                      placeholder="Age"
                    />
                  </div>
                  <input
                    name="phoneNumber"
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
