import React, { use, useEffect, useState } from "react";
import styles from "./page.module.css";
import Cookies from "universal-cookie";
import moment from "moment-timezone";
import ReportModal from "../teacher/components/reoprt/reportModal";
import ReportData from "../teacher/components/reoprt/reportData";
import ContentLoader from "react-content-loader";
import Image from "next/image";
import { getSocket } from "@/utilities/connectWithSocket";
import { Socket } from "socket.io-client";
import { UserRole } from "@/types";

function MyReports() {
  const [myReports, setMyReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setselectedReport]: any = useState(false);
  const cookie = new Cookies();

  useEffect(() => {
    const newSocket: Socket = getSocket(cookie.get("token"));
    newSocket.on("event", (object) => {
      // console.log("socket",object);
    });
    newSocket.on("report_added", (data: object) => {
      console.log(data);

      setMyReports((r) => {
        return [...myReports, data];
      });
    });
  }, [myReports]);

  const handleCloseModal = () => {
    setselectedReport(false);
  };

  useEffect(() => {
    // Fetch reports when the component mounts
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/user/myReports`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.data);
        // Set the retrieved reports in the state
        setMyReports(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full px-2 gap-2 scrolAction ">
      {loading ? (
        // Display loading indicator while fetching data
        <>
          <p className=" overflow-hidden  mb-3 rounded-xl bg-white-color">
            <ContentLoader
              speed={2}
              width={400}
              height={100}
              viewBox="0 0 400 100"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="232" y="-10" rx="3" ry="3" width="152" height="10" />
              <rect x="246" y="23" rx="11" ry="11" width="78" height="26" />
              <rect x="209" y="102" rx="3" ry="3" width="113" height="10" />
              <rect x="88" y="30" rx="3" ry="3" width="139" height="10" />
              <rect x="25" y="25" rx="0" ry="0" width="19" height="26" />
            </ContentLoader>
          </p>{" "}
          <p className="p-2 rounded-xl bg-white-color">
            <ContentLoader
              speed={2}
              width={400}
              height={100}
              viewBox="0 0 400 100"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="232" y="-10" rx="3" ry="3" width="152" height="10" />
              <rect x="246" y="23" rx="11" ry="11" width="78" height="26" />
              <rect x="209" y="102" rx="3" ry="3" width="113" height="10" />
              <rect x="88" y="30" rx="3" ry="3" width="139" height="10" />
              <rect x="25" y="25" rx="0" ry="0" width="19" height="26" />
            </ContentLoader>
          </p>
        </>
      ) : myReports.length > 0 ? (
        // Display reports if there are any
        myReports.map((report, index) => (
          <ReportData data={report} key={index} visibleEdit={false} />
        ))
      ) : (
        // Display "No reports" message if there are no reports
        <div className="flex flex-col gap-3 items-center">
          <p className="text-center">No reports</p>
          <Image
            src={"/vectors/no_report.png"}
            width={90}
            height={80}
            alt="no reports"
          />
        </div>
      )}
      <ReportModal
        openAssignModal={selectedReport}
        handleCloseModal={handleCloseModal}
        details={myReports}
        userRole={UserRole.Student}
      />
    </div>
  );
}

export default MyReports;
