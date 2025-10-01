'use client';

import Image from 'next/image';
import AdminLoginForm from '../components/AdminLoginForm';
import { useEffect, useState } from 'react';

function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <main className="pt-[80px] px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-32">
      <div className="flex items-center justify-center gap-5 lg:gap-10 xl:gap-16 max-md:flex-col-reverse max-w-7xl mx-auto">
        <div
          className={`w-full md:w-[500px] lg:w-[600px] xl:w-[700px] 2xl:w-[800px] h-[400px] md:h-[460px] lg:h-[520px] xl:h-[580px] max-md:w-full max-md:h-full opacity-${
            isLoading ? '5' : '0'
          } transition-opacity duration-500 `}
        >
          <Image
            src={'/vectors/adminLogin.svg'}
            width={600}
            height={600}
            placeholder="blur"
            blurDataURL="/vectors/adminLoginBlur.svg"
            loading="lazy"
            style={{
              width: 'auto',
              height: 'auto',
            }}
            alt="admin login image"
            className="w-full h-full"
            sizes="(max-width: 768px) 100vw,
                            (max-width: 1200px) 50vw,
                            33vw"
          />
        </div>
        <div className="w-full md:w-[500px] lg:w-[600px] xl:w-[700px] 2xl:w-[800px] px-5 lg:px-8 xl:px-12 max-md:w-full max-md:h-full">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}

export default AdminLogin;
