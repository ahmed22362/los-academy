import { getUpComingSession } from "@/utilities/getUpComingSession";
import { cookies } from "next/headers";
import OnGoingBox from "./onGoingBox";

export default async function FetchingUpComingSessions() {
  const token = cookies().get("token")?.value.toString();
  const upComingSession = await getUpComingSession(token);

  return (
    <section className="w-full">
      <div
        className={
          "flex-col justify-start items-center gap-[16px] h-[240px] text-center adminBox"
        }
      >
        <h3 className={"adminBoxTitle"}>
          Are you here and ready for the session ?
        </h3>

        {upComingSession && upComingSession.length > 0 ? (
          upComingSession?.data.map((session: any, index: number) => (
            <OnGoingBox session={session} key={index} />
          ))
        ) : (
          <p className="p-3 bg-warning-color text-white w-fit rounded-full mt-2 font-bold">
            No Upcoming Sessions for now{" "}
          </p>
        )}
      </div>
    </section>
  );
}
