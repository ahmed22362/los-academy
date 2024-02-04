"use client";

import { Session } from "@/types";
import Link from "next/link";

export default function MeetingLink({ session }: { session: Session }) {
  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="bg-secondary-color text-white px-2 py-1 rounded-full font-semibold">
      {session.meetingLink ? (
        <Link
          passHref
          onClick={() => openInNewTab(session.meetingLink ?? "#")}
          href={""}
        >
          meeting link
        </Link>
      ) : (
        <span>meeting link</span>
      )}
    </div>
  );
}
