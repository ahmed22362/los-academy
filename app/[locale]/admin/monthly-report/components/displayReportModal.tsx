"use client";

import ReportModal from "@/app/[locale]/teacher/components/reoprt/reportModal";
import { UserRole } from "@/types";

export default function DisplayReportModal({
  openAssignModal,
  handleCloseModal,
  details,
  role,
}: {
  openAssignModal: boolean;
  handleCloseModal: () => void;
  details: string | any;
  role: UserRole;
}) {
  return (
    <ReportModal
      openAssignModal={openAssignModal}
      handleCloseModal={handleCloseModal}
      details={details}
      userRole={role}
    />
  );
}
