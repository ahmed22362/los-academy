"use client"
import { Button, Checkbox, CustomFlowbiteTheme, Label, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'universal-cookie';

import z from 'zod';
export default function AdminLoginForm() {
    const [isProcessing, setIsProcessing] = useState(false)
    const cookies = new Cookies();
    const router = useRouter()
    const buttonTheme: CustomFlowbiteTheme['button'] = {
        color: {
            purple: "bg-secondary-color hover:bg-secondary-hover",
        }
    }
    const inputTheme: CustomFlowbiteTheme['textInput'] = {
        field: {
            input: {
                colors: {
                    gray: "bg-gray-50 border-secondary-color text-gray-900 focus:primary-color focus:primary-color border-2 rounded-full"
                },
                withAddon: {
                    off: "rounded-full"
                }
            }
        }
    }

    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string()
    })


    function handleLogin(event: any) {
        event.preventDefault();
        setIsProcessing(true)
        const form = event.target;
        const email = form.email.value
        const password = form.password.value
        const url = process.env.NEXT_PUBLIC_APIURL;
        console.log(email, password)

        // try {
        //     loginSchema.parse({ email, password });
        // } catch (error) {
        //     console.log('Validation error:', error);
        //     return;
        // }

        fetch(`${url}/teacher/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then((response) => response.json()).then((data) => {
            console.log(data)
            if (data.status === "success") {
                cookies.set('token', data.token);
                cookies.set('adminData', data.data);
                router.replace('/admin')
            }
            setIsProcessing(false)
        }).catch(err => console.log(err))
    }
    return (
    <form className="flex max-w-md flex-col gap-4 max-md:m-auto" onSubmit={handleLogin}>
        <h5 className='text-center font-semibold'>Welcome back !</h5>
        <div>
            <div className="mb-2 block">
            <Label
                htmlFor="email1"
            />
            </div>
            <TextInput
                theme={inputTheme}
                id="email1"
                placeholder="Email address"
                required
                type="email"
                name='email'
                className='rounded-full'
            />
        </div>
        <div>
            <div className="mb-2 block">
            <Label
                htmlFor="password1"
            />
            </div>
            <TextInput
                theme={inputTheme}
                id="password1"
                required
                type="password"
                name='password'
                placeholder="Password"
                className='rounded-full'
            />
        </div>
        <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
            Remember me
            </Label>
        </div>
        <Button
        type='submit'
        theme={buttonTheme}
        color='purple'
        isProcessing={isProcessing}
        pill
        size="lg"
        className={
            "transition-colors rounded-full font-semibold px-5 py-2 text-white"
        }
      >
        <p>
          Login
        </p>
      </Button>
    </form>
  )
}
