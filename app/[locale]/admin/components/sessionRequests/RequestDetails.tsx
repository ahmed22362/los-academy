import { convertDateTimeZone } from "@/utilities";
import AssignModal from "../assignModal";
import TakeModal from "@/app/[locale]/teacher/components/takeModal";

interface SessionDetailsProps {
  request: any;
  handleAssignSession: (request: any) => void;
  selectedSession: any;
  handleCloseModal: () => void;
  rerenderComponent: () => void;
  isAdmin?: boolean;
}

const SessionDetails: React.FC<SessionDetailsProps> = ({
  request,
  handleAssignSession,
  selectedSession,
  handleCloseModal,
  rerenderComponent,
  isAdmin,
}) => {
  const renderModal = () => {
    if (selectedSession && selectedSession.id === request.id && isAdmin) {
      return (
        <AssignModal
          openAssignModal={true}
          handleCloseModal={handleCloseModal}
          sessionReqId={selectedSession.id}
          user={selectedSession.user.name}
          updateComponent={rerenderComponent}
        />
      );
    } else if (selectedSession && selectedSession.id === request.id) {
      return (
        <TakeModal
          openAssignModal={true}
          handleCloseModal={handleCloseModal}
          sessionReqId={selectedSession.id}
          user={selectedSession.user.name}
          updateComponent={rerenderComponent}
          api={
            request.type === "free"
              ? "session/free/accept"
              : "session/paid/accept"
          }
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div className="p-1 my-2 font-semibold flex w-full justify-between items-center text-base">
      <details>
        <summary>Request #{request.id} Details</summary>
        <div className="flex justify-center items-center gap-3">
          <ul className="ps-4">
            <li>{`Student Name: ${request.user.name}`}</li>
            <li>{`Student Age: ${request.user.age}`}</li>
            Requested Dates:
            {request.sessionDates.map((date: any, index: number) => (
              <li key={index} className="ps-2">
                {convertDateTimeZone(
                  date,
                  "UTC",
                  Intl.DateTimeFormat().resolvedOptions().timeZone,
                  "MM/DD/YYYY hh:mm A",
                )}
              </li>
            ))}
          </ul>
        </div>
      </details>
      <h5
        onClick={() => handleAssignSession(request)}
        className={
          "cursor-pointer bg-secondary-color hover:bg-secondary-hover transition-colors px-[10px] py-[6px] text-[12px] text-white rounded-[16px]"
        }
      >
        {isAdmin ? "Assign" : "Take"} request
      </h5>
      {renderModal()}
    </div>
  );
};

export default SessionDetails;
