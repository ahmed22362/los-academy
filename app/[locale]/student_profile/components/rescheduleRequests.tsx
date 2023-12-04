import React from "react";
import { CustomFlowbiteTheme, Tabs } from "flowbite-react";
import TeacherRescduleRequests from "./teacherRescduleRequests";
import MyRescheduleRequest from "./myRescheduleRequest";

function RescheduleRequests() {
  const customeTheme: CustomFlowbiteTheme = {
    tab: {
      tablist: {
        base: "flex  items-center justify-center  w-fit  ",
        tabitem: {
          styles: {
            pills: {
              active: {
                on: " bg-white focus:ring-0 text-black w-fit   border-b-2 border-[#6D67E4]	",
                off: "   focus:ring-0  hover:bg-white hover:text-black    hover:border-[#6D67E4] 	 transition-colors",
              },
            },
          },
        },
      },
    },
  };

  return (
    <>
      <Tabs.Group aria-label="Pills" theme={customeTheme.tab} style="pills">
       
        <Tabs.Item title="My Requests">
          <MyRescheduleRequest />
        </Tabs.Item>
        <Tabs.Item title="Teacher Requests">
          <TeacherRescduleRequests />
        </Tabs.Item>
      </Tabs.Group>
    </>
  );
}

export default RescheduleRequests;
