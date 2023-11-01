"use client"


import Image from 'next/image';
import AdminLoginForm from '../components/AdminLoginForm';

function AdminLogin() {
    return (
        <main className="pt-[80px] px-10 max-md:px-1">
            <div className='flex items-center justify-center gap-5 max-md:flex-col-reverse'>
                <div className="w-[600px] h-[460px] max-md:w-full max-md:h-full">
                    <Image 
                            src={"/vectors/adminLogin.svg"} 
                            width={600} height={600} 
                            loading='lazy' 
                            alt='login image'
                            className="w-full h-full"
                        />
                </div>
                <div className="w-[600px] px-5 max-md:w-full max-md:h-full">
                <AdminLoginForm />
            </div>
            </div>
    </main>
    )
}

export default AdminLogin;