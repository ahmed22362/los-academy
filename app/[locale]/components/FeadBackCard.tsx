"use client";

import { Card } from 'flowbite-react';
import Image from 'next/image';

function FeadBackCard({username, country, comment}: {username: string; country: string; comment: string}) {

  return (
    <Card className="w-64 max-md:w-1/3 max-sm:w-auto rounded-3xl">
      <div className="flex flex-col items-start pb-2">
        <Image src="/vectors/feedback1.svg" alt="avatar" width={50} height={50} loading="lazy"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {username}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
            {country}
        </span>
      </div>
      <div>
        <p>
          {comment}
        </p>
      </div>
    </Card>
  )
}

export default FeadBackCard;