'use client';

import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import Cookies from 'universal-cookie';
import { showError, showSuccess } from '@/utilities/toastMessages';
import AddReportForm from '@/app/[locale]/components/report/AddReportForm';
import { getCourses } from '@/utilities/getCourses';

export default function AddSessionReportModal({
  openModal,
  handleCloseModal,
  onReportAdded,
}: {
  openModal: boolean;
  handleCloseModal: () => void;
  onReportAdded: () => void;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useRef<Toast>(null);
  const cookies = new Cookies();
  const courses = getCourses().map((course) => course.title);

  const addReport = (formData: any) => {
    if (!formData.sessionId) {
      showError('Please provide a Session ID.', toast);
      return;
    }
    if (!formData.grade || !formData.comment) {
      showError('Please provide both total grade and comment.', toast);
      return;
    }
    if (!formData.reportCourses || formData.reportCourses.length === 0) {
      showError('Please add at least one course report.', toast);
      return;
    }
    setIsProcessing(true);
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.get('token')}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          showSuccess(data.message, toast);
          handleCloseModal();
          onReportAdded();
        } else {
          const msg = Array.isArray(data) ? data[0].message : data.message;
          showError(msg, toast);
        }
        setIsProcessing(false);
      })
      .catch((err) => {
        showError(err.message, toast);
        setIsProcessing(false);
      });
  };

  return (
    <>
      <Toast ref={toast} />
      <AddReportForm
        openAssignModal={openModal}
        handleCloseModal={handleCloseModal}
        courses={courses}
        onAddReport={addReport}
        modalHeader="Add Session Report"
        isProcessing={isProcessing}
      />
    </>
  );
}
