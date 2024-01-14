import React from "react";
import { Status } from "./StatusTable.component";

interface StatusCardProps {
  status: Status;
}

const StatusCard: React.FC<StatusCardProps> = ({ status }) => {
  return (
    <div className="bg-white space-y-3 p-4 rounded-lg shadow">
      <div className="flex items-center space-x-2 text-sm">
        <div>
          <span className="text-blue-500 font-bold hover:underline">
            #{status.sessionInfoId}
          </span>
        </div>
        <div className="text-gray-500">{`User: ${status.userName}`}</div>
      </div>
      <div className="text-sm text-gray-700">
        {`Session Date: `}
        <strong>{status.sessionDate}</strong>
      </div>
      <div className="text-sm text-gray-700">
        {`User Email: `}
        <strong>{status.userEmail}</strong>
      </div>
      <div className="text-sm text-gray-700">
        {`Teacher: `}
        <strong>{status.teacherName}</strong>
      </div>
      <div className="text-sm text-gray-700">
        {`Teacher Email: `}
        <strong>{status.teacherEmail}</strong>
      </div>
      <div className="text-sm text-gray-700 w-fit flex justify-center items-center gap-4">
        {`Will Continue?   `}
        <span
          className={
            status.continueStatus !== null
              ? status.continueStatus
                ? "text-green-500"
                : "text-red-500"
              : "text-gray-500"
          }
        >
          {status.continueStatus !== null
            ? status.continueStatus
              ? "Yes"
              : "No"
            : "No Response"}
        </span>
      </div>
    </div>
  );
};

export default StatusCard;
