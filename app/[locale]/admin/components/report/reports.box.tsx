'use client';

import { useEffect, useState, useRef } from 'react';
import Cookies from 'universal-cookie';
import { Toast } from 'primereact/toast';
import { Spinner } from 'flowbite-react';
import ReportData from './reportData';
import { showError } from '@/utilities/toastMessages';

export default function Reports() {
  const [allReports, setAllReports] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(10); // Show 10 reports per page
  const cookies = new Cookies();
  const toast = useRef<Toast>(null);

  const getReports = (page: number = 1) => {
    setIsLoading(true);

    const url = `${process.env.NEXT_PUBLIC_APIURL}/report?page=${page}&limit=${reportsPerPage}&orderBy=createdAt&order=DESC`;

    // Add timeout and better error handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.get('token')}`,
      },
      signal: controller.signal,
    })
      .then((response) => {
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'success') {
          setAllReports(data.data || []);
          // Use 'length' field from your API response for total count
          setTotalRecords(data.length || 0);
        } else {
          // Handle API error response
          console.warn('API returned error:', data.message);
          showError(`Error Getting reports: ${data.message}`, toast);
          // Set empty state instead of crashing
          setAllReports([]);
          setTotalRecords(0);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        console.warn('Fetch error:', err);

        if (err.name === 'AbortError') {
          showError('Request timeout - please try again', toast);
        } else if (err.message.includes('fetch')) {
          showError('Cannot connect to server', toast);
        } else {
          showError(`Error Getting reports: ${err.message}`, toast);
        }

        // Set empty state to prevent crashes
        setAllReports([]);
        setTotalRecords(0);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getReports(1);
  }, []);

  const totalPages = Math.ceil(totalRecords / reportsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      getReports(page);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-primary-color bg-white border border-gray-300 rounded-l-lg hover:bg-secondary-color hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-primary-color transition-colors duration-300"
      >
        <svg
          className="w-3 h-3 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
        Previous
      </button>
    );

    // First page and ellipsis if needed
    if (currentPage > 3) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-primary-color bg-white border border-gray-300 hover:bg-secondary-color hover:text-white transition-colors duration-300"
        >
          1
        </button>
      );
      if (currentPage > 4) {
        buttons.push(
          <span
            key="ellipsis1"
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-three-color bg-white border border-gray-300"
          >
            ...
          </span>
        );
      }
    }

    // Page numbers around current page
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Adjust for ellipsis logic
    if (currentPage <= 3) {
      startPage = 1;
      endPage = Math.min(totalPages, maxVisiblePages);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`flex items-center justify-center px-4 py-2 text-sm font-medium border border-gray-300 transition-colors duration-300 ${
            currentPage === i
              ? 'text-white bg-secondary-color border-secondary-color shadow-md'
              : 'text-primary-color bg-white hover:bg-secondary-color hover:text-white'
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page and ellipsis if needed
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        buttons.push(
          <span
            key="ellipsis2"
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-three-color bg-white border border-gray-300"
          >
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-primary-color bg-white border border-gray-300 hover:bg-secondary-color hover:text-white transition-colors duration-300"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-primary-color bg-white border border-gray-300 rounded-r-lg hover:bg-secondary-color hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-primary-color transition-colors duration-300"
      >
        Next
        <svg
          className="w-3 h-3 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>
    );

    return buttons;
  };

  return (
    <div className={'adminBox w-full flex-col my-5'}>
      <Toast ref={toast} />
      <h3 className={'adminBoxTitle'}>Reports</h3>

      {isLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <div className="w-full flex-col gap-2 h-[400px] scrollAction overflow-y-auto">
            {allReports && allReports.length > 0 ? (
              allReports.map((report: any, index: number) => {
                return <ReportData data={report} key={report.id || index} />;
              })
            ) : (
              <p className="mt-3 p-3 bg-warning-color text-white w-fit rounded-full font-bold">
                No Reports
              </p>
            )}
          </div>

          {/* Pagination Controls */}
          {totalRecords > 0 && ( // Show pagination if there are any reports
            <div className="flex flex-col sm:flex-row items-center justify-between mt-4 px-4 py-4 bg-white rounded-2xl shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] border border-gray-four-color">
              <div className="text-sm text-primary-color font-medium mb-3 sm:mb-0">
                Showing{' '}
                <span className="font-semibold text-secondary-color">
                  {(currentPage - 1) * reportsPerPage + 1}
                </span>{' '}
                to{' '}
                <span className="font-semibold text-secondary-color">
                  {Math.min(currentPage * reportsPerPage, totalRecords)}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-secondary-color">
                  {totalRecords}
                </span>{' '}
                reports
              </div>
              {totalPages > 1 && (
                <nav className="flex items-center" aria-label="Pagination">
                  {renderPaginationButtons()}
                </nav>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
