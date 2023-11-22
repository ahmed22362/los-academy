"use client";

import PrimaryButton from "./../components/PrimaryButton";
import { CustomFlowbiteTheme, Tabs } from "flowbite-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { RadioButton } from "primereact/radiobutton";
import "./login.module.css";
import "./login.css";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import ForgetPassword from "../student_profile/components/forgetPassword";

function page() {
  const [openForgetPasswordModal, setOpenForgetPasswordModal] =
    useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const showSuccess = (msg: any) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: msg,
      life: 5000,
    });
  };
  const showError = (msg: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 5000,
    });
  };

  const cookies = new Cookies();
  const [gender, setGender] = useState("");
  const [userData, setUserData] = useState();
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  interface FormData {
    name: string;
    age: String;
    phone: String;
    email: string;
    gender: String;
    password: string;
    passwordConfirmation: string;
  }
  const [activeTab, setActiveTab] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    phone: "",
    email: "",
    gender: "",
    password: "",
    passwordConfirmation: "",
  });

  const url = process.env.NEXT_PUBLIC_APIURL;
  const handleFormChange = (e: any) => {
    const { name, value } = e.target;

    // Use parseFloat or parseInt to parse the values as numbers
    setFormData({
      ...formData,
      [name]: name === "age" ? parseInt(value, 10) : value,
    });
  };
  const handleFormSubmit = () => {
    const requiredFields: (keyof FormData)[] = [
      "name",
      "age",
      "phone",
      "email",
      "password",
      "passwordConfirmation",
    ];
    const emptyField = requiredFields.find((field) => !formData[field]);

    if (emptyField) {
      showError(`Please fill in ${emptyField}`);
      return;
    }

    if (!gender) {
      showError("Please select your gender");
      return;
    }
    // Set the gender directly in the formData object
    formData.gender = gender;

    console.log(formData);

    fetch(`${url}/user/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          showSuccess("Registration Successfully");
          showSuccess(data.message);
          console.log(data);
          localStorage.setItem("registrationSuccessMessage", "Registration successful. Please log in.");

          setTimeout(() => {
            window.location.reload();
            router.push("/login");
          }, 3000);
          setUserData(data);
          cookies.set("token", data.token);
        } else {
          if (data?.message === "Duplicate field Please use another value!") {
            showError("Email Already Exist Please Login");
          } else {
            showError("Registration failed");

          }
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
        showError("An error occurred");
      });
  };

  useEffect(() => {
    // Check if we are on the client side before using window
    if (typeof window !== 'undefined') {
      const storedMessage = localStorage.getItem("registrationSuccessMessage");
      if (storedMessage) {
        showSuccess(storedMessage);

        // Clear the stored message after displaying it
        localStorage.removeItem("registrationSuccessMessage");
      }
    }
  }, []);

  // resend mail function

  // login

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const formDataLogin = {
    email: email,
    password: password,
  };

  const handleLogin = () => {
    console.log(formDataLogin);

    // Perform basic client-side validation
    if (!email || !password) {
      showError("Please fill in all fields");
      return;
    }

    // Send a POST request to the login endpoint
    fetch(`${url}/user/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataLogin),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          showSuccess("Login Successfully");
          console.log(data);
          localStorage.setItem("myName", data?.data?.name)
          setTimeout(() => {
            // Redirect to a protected route upon successful login
            router.push("/student_profile");
          }, 3000);
          // Save user token in a cookie or state as needed
          cookies.set("token", data.token);
          cookies.set("id", data.data.id);
        } else {
          if (
            data.message ===
            "Can't log in before you verify you email if you miss the first mail you can always resend it!"
          ) {
            // Display the div for email verification
            showError(`${data.message }`);
            setShowEmailVerification(true);
          } else {
            showError(`${data.message||'Login Faild '}`);
          }
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
        showError("An error occurred");
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
  // resend mail
  const handleResendMail = () => {
    // Send a request to resend the confirmation email
    fetch(`${url}/user/auth/resendMailConfirmation?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          showSuccess("Mail resent successfully");
        } else {
          showError(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        showError("An error occurred while resending the mail");
      });
  };

  return (
    <section className="mt-8">
      <div className="flex items-center mt-40 justify-evenly gap-20 sm:flex-row flex-col-reverse ">
        <Toast ref={toast} />

        <div className="image transition-all duration-500 ">
          <Image
            src={`${activeTab ? "/vectors/login.svg" : "/vectors/signup.svg"}`}
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
                    className="border-[--secondary-color] gradiant-color	 rounded-3xl w-full		border-2	"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email address "
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                  <input
                    className="border-[--secondary-color] gradiant-color	 rounded-3xl w-full		border-2	"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                  <button
                    onClick={() => setOpenForgetPasswordModal(true)}
                    className=" font-semibold	 underline"
                  >
                    Forget Password ?
                  </button>
                  <ForgetPassword
                    openForgetPassword={openForgetPasswordModal}
                    setOpenForgetPasswordModal={setOpenForgetPasswordModal}
                  />
                  {showEmailVerification && (
                    <div>
                      <div className="text-red-500 text-md font-medium text-center">
                        Check Gmail and confirm your mail
                      </div>
                      <div className="text-center font-sm">
                        Didn't receive a mail?{" "}
                        <button
                          onClick={handleResendMail}
                          className="underline text-lg font-medium"
                        >
                          Resend mail
                        </button>
                      </div>
                    </div>
                  )}
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
                      onKeyDown={(e) => e.key === "Enter" && handleFormSubmit()}
                      className="border-[--secondary-color] gradiant-color rounded-3xl w-full border-2"
                      type="text"
                      placeholder="Full Name"
                    />
                    <input
                      name="age"
                      onChange={handleFormChange}
                      onKeyDown={(e) => e.key === "Enter" && handleFormSubmit()}
                      className="border-[--secondary-color] gradiant-color rounded-3xl w-full appearance-none border-2"
                      type="tel"
                      placeholder="Age"
                    />
                  </div>

                  <input
                    name="phone"
                    onChange={handleFormChange}
                    onKeyDown={(e) => e.key === "Enter" && handleFormSubmit()}
                    type="tel"
                    className="border-[--secondary-color] gradiant-color rounded-3xl w-full appearance-none border-2"
                    placeholder="Phone number"
                  />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    onKeyDown={(e) => e.key === "Enter" && handleFormSubmit()}
                    className="border-[--secondary-color] gradiant-color rounded-3xl w-full border-2"
                    type="email"
                    placeholder="Email address"
                  />
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    onKeyDown={(e) => e.key === "Enter" && handleFormSubmit()}
                    className="border-[--secondary-color] gradiant-color rounded-3xl w-full border-2"
                    type="password"
                    placeholder="Password"
                  />
                  <input
                    name="passwordConfirmation"
                    value={formData.passwordConfirmation}
                    onChange={handleFormChange}
                    onKeyDown={(e) => e.key === "Enter" && handleFormSubmit()}
                    className="border-[--secondary-color] gradiant-color rounded-3xl w-full border-2"
                    type="password"
                    placeholder="Confirm Password"
                  />
                  <div className="flex justify-between  px-10 flex-wrap gap-3 py-3">
                    <div className="flex align-items-center  ">
                      <RadioButton
                        className="border focus-within:border-none focus-within:bg-[--secondary-color] border-[--secondary-color]   rounded-full"
                        inputId="male"
                        name="gender"
                        value="male"
                        onChange={(e) => setGender(e.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleFormSubmit()
                        }
                        checked={gender === "male"}
                      />
                      <label htmlFor="male" className="ml-2">
                        Male
                      </label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton
                        className="border focus-within:border-none focus-within:bg-[--secondary-color] border-[--secondary-color]   rounded-full"
                        inputId="female"
                        name="gender"
                        value="female"
                        onChange={(e) => setGender(e.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleFormSubmit()
                        }
                        checked={gender === "female"}
                      />
                      <label htmlFor="female" className="ml-2 ">
                        Female
                      </label>
                    </div>
                  </div>
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
