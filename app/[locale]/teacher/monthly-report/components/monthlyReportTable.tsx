'use client';

import { Spinner, Table } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import {
  renderTableBody,
  renderTableHead,
} from '@/app/[locale]/components/genericTableComponent/table.component';
import { MonthlyReport, Student, UserRole } from '@/types';
import { convertDateTimeZone } from '@/utilities';
import { showError } from '@/utilities/toastMessages';
import { Toast } from 'primereact/toast';
import MonthlyReportCombBox from '@/app/[locale]/admin/monthly-report/components/monthlyReportCombBox';
import { fetchEndPoint } from '@/utilities/fetchDataFromApi';
import FetchMonthlyReportsData from '@/app/[locale]/admin/monthly-report/components/MonthlyReportOptions';

export default function MonthlyReportTable() {
  const [allReports, setAllReports] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const toast = useRef<Toast>(null);

  const myStudents = fetchEndPoint<Student>(
    'teacher/myStudents',
    cookies.get('token')
  );

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    getMonthlyReport(event.rows, event.first / event.rows + 1);
  };
  const headerMapping = {
    '#Report ID': 'id',
    'Student Name': 'user.name',
    'Month Grade': 'grade',
    'Report Date': 'createdAt',
  };

  const getMonthlyReport = (limit?: number, page?: number) => {
    let url = `${process.env.NEXT_PUBLIC_APIURL}/teacher/myMonthlyReport`;
    const params = new URLSearchParams();

    if (limit !== undefined) {
      params.append('limit', limit.toString());
    }
    if (page !== undefined) {
      params.append('page', page.toString());
    }
    // Add order by newest first
    params.append('orderBy', 'createdAt');
    params.append('order', 'DESC');

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.get('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 'success') {
          setAllReports(data.data);
          // Check if the API returns pagination info
          if (data.pagination) {
            setTotalRecords(
              data.pagination.total || data.pagination.totalRecords || 0
            );
          } else if (data.total) {
            setTotalRecords(data.total);
          } else if (data.totalRecords) {
            setTotalRecords(data.totalRecords);
          } else {
            // Fallback: if no pagination info, use the current data length
            setTotalRecords(data.data?.length || 0);
          }
        } else {
          showError(`Error Getting monthly reports ${data.message}`, toast);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        showError(`Error Getting monthly reports ${err.message}`, toast);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getMonthlyReport(rows, 1);
  }, []);

  const updateComponent = () => {
    getMonthlyReport(rows, first / rows + 1);
  };
  const renderUpdateComponent = (report: MonthlyReport) => (
    <FetchMonthlyReportsData
      key={report.id}
      reportData={report}
      updateComponent={updateComponent}
      students={myStudents}
      role={UserRole.Teacher}
    />
  );

  const renderMobileCardComponent = (report: MonthlyReport) => (
    <div key={report.id} className="bg-white space-y-3 p-4 rounded-lg shadow">
      <div className="flex items-center space-x-2 text-sm">
        <div>
          <span className="text-blue-500 font-bold hover:underline">
            #{report.id}
          </span>
        </div>
        <div className="text-gray-500">{report.user?.name}</div>
      </div>
      <div className="text-sm text-gray-700 w-fit  flex justify-center items-center gap-4">
        {`With Grade: `}
        <strong>{report.grade}</strong>
      </div>
      <div className="text-sm font-medium text-black flex justify-center items-center">
        {'At: '}
        <strong>
          {convertDateTimeZone(
            report.createdAt,
            'UTC',
            Intl.DateTimeFormat().resolvedOptions().timeZone,
            'YYYY-MM-DD h:mm A'
          )}
        </strong>
      </div>
      <div className="text-sm font-medium text-black flex justify-center items-center">
        {renderUpdateComponent(report)}
      </div>
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="p-5">
          <MonthlyReportCombBox
            updateComponent={updateComponent}
            students={myStudents}
          />
          {allReports && allReports?.length > 0 ? (
            <>
              {' '}
              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <Table>
                  {renderTableHead(Object.keys(headerMapping), false, true)}
                  {renderTableBody({
                    headersValues: Object.values(headerMapping),
                    idValueName: 'id',
                    data: allReports,
                    renderUpdateComponent: (report: MonthlyReport) =>
                      renderUpdateComponent(report),
                  })}
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {allReports.map((report: any, index: number) =>
                  renderMobileCardComponent(report)
                )}
              </div>
            </>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
              There are no Monthly Reports, Add One!
            </div>
          )}
        </div>
      )}
      <div className="card mt-4">
        <Paginator
          first={first}
          rows={rows}
          totalRecords={totalRecords}
          rowsPerPageOptions={[10, 20, 30]}
          onPageChange={onPageChange}
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} reports"
        />
      </div>
    </>
  );
}
