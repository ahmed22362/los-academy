  import React from 'react';
  import { Card } from 'flowbite-react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
  interface StudentPlaneProps {
    title: string;
    price: number;
    features: string[];
    recommended?: string; 
    planId?: number; 
  }

  const StudentPlane: React.FC<StudentPlaneProps> = ({ title, price, features , recommended ,planId }) => {
    const router = useRouter();

    const url ='https://los-academy.onrender.com/api/v1/';
    const cookie=new Cookies();
    const token=cookie.get('token');


    const handleCustomPlan = () => {
      alert('clicked')
      // Ensure that a planId is provided before making the API request
      if (planId === undefined || planId === null) {
        console.error('Invalid planId');
        return;
      }
  
      const customPlanData = {
        planId: planId, // Include the planId in the request body
      };
  
      fetch(`${url}subscription/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(customPlanData),
      })
      .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.status=='success') {
              alert('success')
              router.push(`${data?.data?.url}`);
            }
        })
        .catch((error) => {
          console.error('Error creating custom plan:', error);
        });
    };
    return (
      <Card className='max-w-xs rounded-2xl relative hover:shadow-xl hover:-translate-y-5	 transition-all duration-300'>
        <span style={{top:'-6%', left:'20%'}} className={ recommended?`px-4 bg-[#27AE60] rounded-full py-2 text-white absolute` : 'hidden	'}>Recommended</span>
        <h5 className="mb-0 pb-0 text-xl font-medium dark:text-gray-400 text-center">{title}</h5>
        <div className="flex items-baseline text-gray-900 dark:text-white mt-0 pt-0">
        <span style={{top:'15% ' , transform:'translateY(-30px)'}} className={title=='Customize your Plan'? 'my-0 font-medium	' :'hidden'}>Started from:</span>
         
          <span className="text-3xl font-semibold">$</span>
          <span className="text-5xl font-extrabold tracking-tight">{price}</span>
          <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
        </div>
        <ul className="my-7 space-y-5">
          {features.map((feature, index) => (
            <li key={index} className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-[--secondary-color] dark:text-cyan-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{feature}</span>
            </li>
          ))}
        </ul>
        <button
        onClick={handleCustomPlan}
          type="button"
          className="w-[150px] justify-center rounded-full bg-[--secondary-color] py-2.5 text-center text-sm font-medium text-white hover:bg-[#625ee6] m-auto focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
        >
         {title=='Customize your Plan'? 'Get Started' :'Get this plan'} 
        </button>
      </Card>
    );
  };

  export default StudentPlane;
