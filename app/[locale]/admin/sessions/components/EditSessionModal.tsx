'use client';

import React, { useState } from 'react';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import Cookies from 'universal-cookie';
import UpdateModal from '@/app/[locale]/components/genericTableComponent/updateModal';
import { showError, showSuccess } from '@/utilities/toastMessages';
import { FormField, SessionStatus } from '@/types';
export default function EditSessionModal({
  openAssignModal,
  handleCloseModal,
  sessionDetails,
  updateComponent,
}: {
  openAssignModal: boolean;
  handleCloseModal: () => void;
  sessionDetails: any;
  updateComponent: () => void;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const cookies = new Cookies();
  const toast = useRef<Toast>(null);

  const updateSessionFormFields: FormField[] = [
    {
      name: 'sessionDate',
      label: 'Session Date',
      type: 'datepicker',
    },
    {
      name: 'studentAttended',
      label: 'Student Attended?',
      type: 'select',
      options: ['true', 'false'],
    },
    {
      name: 'teacherAttended',
      label: 'Teacher Attended?',
      type: 'select',
      options: ['true', 'false'],
    },
    {
      name: 'hasReport',
      label: 'Has Report?',
      type: 'select',
      options: ['true', 'false'],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: Object.values(SessionStatus),
    },
    {
      name: 'reschedule_request_count',
      label: 'Numbers of reschedule requests for this session',
      type: 'number',
    },
  ];
  const updateSession = (formData: any) => {
    setIsProcessing(true);
    // Extract original session details
    const originalData = sessionDetails;

    // Prepare an object to hold only the changed fields
    const updatedData: any = {};
    // Compare each field in formData with originalData
    Object.keys(formData).forEach((key) => {
      let newValue = formData[key];
      let originalValue = originalData[key];

      // Special handling for date fields
      if (key === 'sessionDate') {
        // Convert string date array to ISO string (same as before)
        newValue = new Date(newValue.split(',')[0]).toISOString();

        // Format original sessionDate if it's a string or Date
        if (originalValue && typeof originalValue === 'string') {
          originalValue = new Date(originalValue).toISOString();
        }
      }

      // Handle boolean string conversion (e.g., "true" -> true)
      if (['studentAttended', 'teacherAttended', 'hasReport'].includes(key)) {
        newValue = newValue === 'true';
        originalValue = Boolean(originalValue);
      }

      // Only include if value has changed
      if (newValue !== originalValue) {
        updatedData[key] = newValue;
      }
    });

    // If no changes, skip API call
    if (Object.keys(updatedData).length === 0) {
      showSuccess('No changes to update.', toast);
      setIsProcessing(false);
      return;
    }

    formData.sessionDate = formData.sessionDate
      .toString()
      .split(',')
      .map((strDate: string) => new Date(strDate).toISOString())[0];
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/${sessionDetails.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.get('token')}`,
      },
      body: JSON.stringify({
        ...formData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 'success') {
          showSuccess('Updated Successfully', toast);
          const timer = setTimeout(() => {
            updateComponent();
            clearTimeout(timer);
          }, 4000);
        } else {
          showError(
            'Something went wrong make sure all fields are filled correctly',
            toast
          );
        }
        setIsProcessing(false);
      })
      .catch((err) => {
        console.log(err);
        showError(err.message, toast);
      });
  };
  return (
    <>
      <Toast ref={toast} />
      <UpdateModal
        openModal={openAssignModal}
        closeModal={handleCloseModal}
        formFields={updateSessionFormFields}
        onSubmit={updateSession}
        modalHeader={'Update Sessions'}
        isProcessing={isProcessing}
        updateButtonText={'Update'}
        objectDetails={sessionDetails}
      />
    </>
  );
}
