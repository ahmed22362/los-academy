"use client";

import Link from "next/link";

export default function FetchOnGoingSessionData({
  sessionData,
  updateComponent,
}: {
  sessionData: any;
  updateComponent: () => void;
}) {
  const session = sessionData && sessionData;

  return (
    <>
      <div className="bg-secondary-color text-white px-2 py-1 rounded-full font-semibold">
        <Link
          href={session.meetingLink === null ? "#" : session.meetingLink}
          className="hover:underline"
        >
          meeting link{" "}
        </Link>
      </div>
    </>
  );
}
