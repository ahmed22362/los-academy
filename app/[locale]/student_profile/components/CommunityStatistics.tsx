"use client";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import Cookies from "universal-cookie";
function CommunityStatistics() {
  const cookie = new Cookies();

  const [historySeesions, setHistorySeesions] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/user/myHistorySessions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`, // Correct the header key to 'Authorization'
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setHistorySeesions(data);
        // Set the retrieved Seeions in the state
      })
      .catch((error) => {
        console.error("Error fetching  History sessions:", error);
      });
  }, []);

  return (
    <div>
      <div className={`flex justify-center gap- items-center mt-10`}>
        <div
          className="bg-secondary-color text-center  hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] py-3 lg:px-10  rounded-3xl  mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45"
          
        >
          <span className="block text-center">Done</span>
          {`  ${historySeesions?.length || 0} Sessions`}
          </div>
        <div
          className="bg-secondary-color text-center hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] py-3 lg:px-10  rounded-3xl  mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45"
        >
          <span className="block text-center">
          Attendence
          </span>
          {"100% "}
          </div>
      </div>
    </div>
  );
}

export default CommunityStatistics;
