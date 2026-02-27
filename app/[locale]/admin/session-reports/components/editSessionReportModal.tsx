'use client';

import { useEffect, useRef, useState } from 'react';
import {
  CustomFlowbiteTheme,
  Label,
  Modal,
  Select,
  TextInput,
} from 'flowbite-react';
import { Toast } from 'primereact/toast';
import Cookies from 'universal-cookie';
import { showError, showSuccess } from '@/utilities/toastMessages';
import LoadingButton from '@/app/[locale]/admin/components/loadingButton';
import { getCourses } from '@/utilities/getCourses';
import { FaRegFileLines } from 'react-icons/fa6';

const GRADE_OPTIONS = [
  'excellent',
  'very good',
  'good',
  'average',
  'below average',
];

const modalTheme: NonNullable<CustomFlowbiteTheme['modal']> = {
  header: {
    base: 'flex items-start justify-between rounded-t px-5 py-2 w-full',
    title: 'w-full flex items-center gap-4 text-2xl font-semibold',
  },
};

export default function EditSessionReportModal({
  openModal,
  handleCloseModal,
  reportData,
  onReportUpdated,
}: {
  openModal: boolean;
  handleCloseModal: () => void;
  reportData: any;
  onReportUpdated: () => void;
}) {
  const allCourses = getCourses().map((c) => c.title);
  const cookies = new Cookies();
  const toast = useRef<Toast>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Build a map: courseName -> { courseGrade, courseComment }
  const buildInitialCourses = () => {
    const map: Record<string, { courseGrade: string; courseComment: string }> =
      {};
    if (reportData?.reportCourses) {
      reportData.reportCourses.forEach((rc: any) => {
        map[rc.courseName] = {
          courseGrade: rc.courseGrade || 'average',
          courseComment: rc.courseComment || '',
        };
      });
    }
    return map;
  };

  const [courseMap, setCourseMap] =
    useState<Record<string, { courseGrade: string; courseComment: string }>>(
      buildInitialCourses,
    );

  // Reset when a different report is opened
  useEffect(() => {
    setCourseMap(buildInitialCourses());
  }, [reportData]);

  const handleGradeChange = (courseName: string, grade: string) => {
    setCourseMap((prev) => ({
      ...prev,
      [courseName]: { ...prev[courseName], courseGrade: grade },
    }));
  };

  const handleCommentChange = (courseName: string, comment: string) => {
    setCourseMap((prev) => ({
      ...prev,
      [courseName]: { ...prev[courseName], courseComment: comment },
    }));
  };

  const handleSave = () => {
    // Only send courses that have a grade selected
    const reportCourses = Object.entries(courseMap)
      .filter(([, val]) => val.courseGrade)
      .map(([courseName, val]) => ({
        courseName,
        courseGrade: val.courseGrade,
        ...(val.courseComment ? { courseComment: val.courseComment } : {}),
      }));

    if (reportCourses.length === 0) {
      showError('Please fill in at least one course grade.', toast);
      return;
    }

    setIsProcessing(true);
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/report/${reportData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.get('token')}`,
      },
      body: JSON.stringify({ reportCourses }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          showSuccess(data.message, toast);
          handleCloseModal();
          onReportUpdated();
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
      <Modal show={openModal} onClose={handleCloseModal} size="3xl">
        <Modal.Header theme={modalTheme.header}>
          Edit Report #{reportData?.id} <FaRegFileLines />
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {/* Report info (read-only) */}
            <div className="flex gap-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <span>
                <strong>Student:</strong> {reportData?.user?.name ?? '—'}
              </span>
              <span>
                <strong>Teacher:</strong> {reportData?.teacher?.name ?? '—'}
              </span>
              <span>
                <strong>Grade:</strong> {reportData?.grade ?? '—'}
              </span>
            </div>

            <h3 className="font-medium">Edit Course Grades &amp; Comments</h3>

            <div className="flex flex-col gap-5">
              {allCourses.map((courseName) => (
                <div
                  key={courseName}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <label className="font-medium capitalize mb-2 block">
                    {courseName}
                  </label>
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="md:w-1/3">
                      <Label value="Grade" className="mb-1" />
                      <Select
                        value={courseMap[courseName]?.courseGrade ?? ''}
                        onChange={(e) =>
                          handleGradeChange(courseName, e.target.value)
                        }
                      >
                        <option value="">— Select grade —</option>
                        {GRADE_OPTIONS.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Label value="Comment (optional)" className="mb-1" />
                      <TextInput
                        placeholder="Optional comment…"
                        value={courseMap[courseName]?.courseComment ?? ''}
                        onChange={(e) =>
                          handleCommentChange(courseName, e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <LoadingButton
                title="Save Changes"
                action={handleSave}
                isProcessing={isProcessing}
                customStyle="text-white bg-secondary-color hover:bg-secondary-hover rounded-full py-2 px-5 transition-colors"
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
