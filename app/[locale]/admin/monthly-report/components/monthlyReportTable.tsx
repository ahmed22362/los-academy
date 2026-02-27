'use client';

import { Spinner, Table } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import MonthlyReportCombBox from './monthlyReportCombBox';
import FetchMonthlyReportsData from './MonthlyReportOptions';
import { convertDateTimeZone } from '@/utilities';
import {
  renderTableBody,
  renderTableHead,
} from '@/app/[locale]/components/genericTableComponent/table.component';
import { MonthlyReport, Student, UserRole } from '@/types';
import { Toast } from 'primereact/toast';
import { showError } from '@/utilities/toastMessages';
import { fetchEndPoint } from '@/utilities/fetchDataFromApi';

export default function MonthlyReportTable() {
  const [allReports, setAllReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  const toast = useRef<Toast>(null);
  const allStudents = fetchEndPoint<Student>('user', cookies.get('token'));

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    getMonthlyReport(event.rows, event.first / event.rows + 1, search);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setFirst(0);
    getMonthlyReport(rows, 1, value);
  };

  const headerMapping = {
    '#Report ID': 'id',
    'Student Name': 'user.name',
    'Teacher Name': 'teacher.name',
    'Report Date': 'createdAt',
  };
  const getMonthlyReport = (
    limit?: number,
    page?: number,
    searchQuery?: string,
  ) => {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (limit !== undefined) params.set('limit', String(limit));
    if (page !== undefined) params.set('page', String(page));
    const q = searchQuery !== undefined ? searchQuery : search;
    if (q) params.set('search', q);
    const queryString = params.toString();
    const url = `${process.env.NEXT_PUBLIC_APIURL}/monthlyReport${queryString ? `?${queryString}` : ''}`;
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
      students={allStudents}
      role={UserRole.Admin}
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
        {`By Teacher: `}
        <strong>{report.teacher?.name}</strong>
      </div>
      <div className="text-sm font-medium text-black flex justify-center items-center">
        {'At: '}
        <strong>
          {convertDateTimeZone(
            report.createdAt,
            'UTC',
            Intl.DateTimeFormat().resolvedOptions().timeZone,
            'YYYY-MM-DD h:mm A',
          )}
        </strong>
      </div>
      <div className="text-sm font-medium text-black flex justify-center items-center">
        {renderUpdateComponent(report)}
      </div>
    </div>
  );
  return (
    <div className="p-5">
      <MonthlyReportCombBox
        updateComponent={updateComponent}
        students={allStudents}
        onSearch={handleSearch}
      />
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner size="xl" />
        </div>
      ) : (
        <>
          {allReports && allReports.length > 0 ? (
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
                  renderMobileCardComponent(report),
                )}
              </div>
            </>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
              There are no Monthly Reports, Add One!
            </div>
          )}
          <div className="card mt-4">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={allReports?.length ?? 0}
              rowsPerPageOptions={[10, 20, 30]}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}
