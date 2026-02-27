'use client';

import { Spinner, Table } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { Toast } from 'primereact/toast';
import SessionReportComboBox from './sessionReportComboBox';
import EditSessionReportModal from './editSessionReportModal';
import { showError, showSuccess } from '@/utilities/toastMessages';
import {
  renderTableBody,
  renderTableHead,
} from '@/app/[locale]/components/genericTableComponent/table.component';
import { BiEdit, BiTrash } from 'react-icons/bi';

export default function SessionReportTable() {
  const [allReports, setAllReports] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  const cookies = new Cookies();
  const toast = useRef<Toast>(null);

  const headerMapping: Record<string, string> = {
    '#Report ID': 'id',
    'Student Name': 'user.name',
    'Teacher Name': 'teacher.name',
    Date: 'createdAt',
  };

  const fetchReports = (
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
    params.set('orderBy', 'createdAt');
    params.set('order', 'DESC');
    const url = `${process.env.NEXT_PUBLIC_APIURL}/report?${params.toString()}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.get('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setAllReports(data.data || []);
          setTotalRecords(data.length || 0);
        } else {
          showError(`Error fetching reports: ${data.message}`, toast);
          setAllReports([]);
          setTotalRecords(0);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        showError(`Error fetching reports: ${err.message}`, toast);
        setAllReports([]);
        setTotalRecords(0);
        setIsLoading(false);
      });
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    fetchReports(event.rows, event.first / event.rows + 1, search);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setFirst(0);
    fetchReports(rows, 1, value);
  };

  useEffect(() => {
    fetchReports(rows, 1);
  }, []);

  const [editingReport, setEditingReport] = useState<any>(null);

  const deleteReport = (id: number) => {
    if (!confirm('Are you sure you want to delete this report?')) return;
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/report/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.get('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          showSuccess(data.message, toast);
          fetchReports(rows, first / rows + 1, search);
        } else {
          showError(data.message, toast);
        }
      })
      .catch((err) => showError(err.message, toast));
  };

  const renderUpdateComponent = (report: any) => (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={() => setEditingReport(report)}
        className="text-blue-500 hover:text-blue-700 transition-colors"
        title="Edit"
      >
        <BiEdit size={18} />
      </button>
      <button
        onClick={() => deleteReport(report.id)}
        className="text-red-500 hover:text-red-700 transition-colors"
        title="Delete"
      >
        <BiTrash size={18} />
      </button>
    </div>
  );

  const renderMobileCard = (report: any) => (
    <div key={report.id} className="bg-white space-y-3 p-4 rounded-lg shadow">
      <div className="flex items-center space-x-2 text-sm">
        <span className="text-blue-500 font-bold hover:underline">
          #{String(report.id).slice(-4)}
        </span>
      </div>
      <div className="text-sm text-gray-700">
        {`Student: ${report.user?.name ?? '—'}`}
      </div>
      <div className="text-sm text-gray-700">
        {`Teacher: ${report.teacher?.name ?? '—'}`}
      </div>
      <div className="text-sm text-gray-700">
        {`Grade: ${report.grade ?? '—'}`}
      </div>
      <div className="text-sm font-medium text-black flex justify-center items-center gap-3">
        <button
          onClick={() => setEditingReport(report)}
          className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
        >
          <BiEdit size={16} /> Edit
        </button>
        <button
          onClick={() => deleteReport(report.id)}
          className="text-red-500 hover:text-red-700 flex items-center gap-1"
        >
          <BiTrash size={16} /> Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-5">
      <Toast ref={toast} />
      {editingReport && (
        <EditSessionReportModal
          openModal={!!editingReport}
          handleCloseModal={() => setEditingReport(null)}
          reportData={editingReport}
          onReportUpdated={() => {
            setEditingReport(null);
            fetchReports(rows, first / rows + 1, search);
          }}
        />
      )}
      <SessionReportComboBox
        onSearch={handleSearch}
        onReportAdded={() => fetchReports(rows, 1, search)}
      />
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner size="xl" />
        </div>
      ) : (
        <>
          {allReports && allReports.length > 0 ? (
            <>
              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <Table>
                  {renderTableHead(Object.keys(headerMapping), false, true)}
                  {renderTableBody({
                    headersValues: Object.values(headerMapping),
                    idValueName: 'id',
                    data: allReports,
                    renderUpdateComponent: (report: any) =>
                      renderUpdateComponent(report),
                  })}
                </Table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {allReports.map((report: any) => renderMobileCard(report))}
              </div>
            </>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
              No session reports found.
            </div>
          )}
          <div className="card mt-4">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={totalRecords}
              rowsPerPageOptions={[10, 20, 30]}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}
