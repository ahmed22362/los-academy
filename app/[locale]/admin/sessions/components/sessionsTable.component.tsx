'use client';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { useState } from 'react';
import SessionComboBox from './sessionComboBox';
import Cookies from 'universal-cookie';
import { convertDateTimeZone } from '@/utilities';
import getDateAfter from '@/utilities/getDateAfterDuration';
import StatusBadge from '../../../../../utilities/StatusBadge';
import { Session, Student, Teacher } from '@/types';
import GenericSessionsTable from '@/utilities/session/GenericSessionTable';
import { fetchEndPoint } from '@/utilities/fetchDataFromApi';
import GetSessionOptions from './SessionOptions';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SessionsTable() {
  const searchParams = useSearchParams();

  const [allSessions, setAllSessions]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const [totalRecord, setTotalRecords] = useState<number>(1);

  const students = fetchEndPoint<Student>('user', cookies.get('token'));
  const teachers = fetchEndPoint<Teacher>('teacher', cookies.get('token'));
  // Get current filters from URL
  const currentPage = parseInt(searchParams.get('page') || '1');
  const currentLimit = parseInt(searchParams.get('limit') || '10');
  const teacherFilter = searchParams.get('teacher');
  const userFilter = searchParams.get('user');
  const headersMapping: Record<string, keyof Session | string> = {
    '#ID': 'id',
    'Teacher Name': 'sessionInfo.teacher.name',
    'Student Name': 'sessionInfo.user.name',
    'Date Time': 'sessionDate',
    'Session Duration': 'sessionDuration',
    Type: 'type',
    Status: 'status',
  };

  const fetchAllSessions = (limit: number = 10, page: number = 1) => {
    setIsLoading(true);
    // Start building URL with all filters
    const params = new URLSearchParams();
    params.set('limit', String(limit));
    params.set('page', String(page));

    // Forward additional filters
    if (teacherFilter) params.set('teacher', teacherFilter);
    if (userFilter) params.set('user', userFilter);
    const url = `${
      process.env.NEXT_PUBLIC_APIURL
    }/session?${params.toString()}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.get('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const sorted = data.data.sort((a: any, b: any) => {
          return (
            new Date(a.sessionDate).getTime() -
            new Date(b.sessionDate).getTime()
          );
        });
        setAllSessions(sorted);
        setTotalRecords(data.length);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const renderMobileCardComponent = (session: Session, index?: number) => (
    <div key={index} className="bg-white space-y-3 p-4 rounded-lg shadow">
      <div className="flex items-center space-x-2 text-sm">
        <div>
          <span className="text-blue-500 font-bold hover:underline">
            #{session.id}
          </span>
          <span className="text-sm text-gray-700">{` ${session.sessionInfo.user.name} with ${session.sessionInfo.teacher.name}`}</span>
        </div>
      </div>
      <div className="text-sm text-gray-700">
        {`From: 
  ${convertDateTimeZone(
    session.sessionDate,
    'UTC',
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    'YYYY-MM-DD h:mm A'
  )} To ${convertDateTimeZone(
          getDateAfter(session.sessionDate, session.sessionDuration),
          'UTC',
          Intl.DateTimeFormat().resolvedOptions().timeZone,
          'YYYY-MM-DD h:mm A'
        )} `}
      </div>
      <div className="text-sm text-gray-700"> Type: {session.type}</div>
      <span className="text-sm text-gray-700 w-fit m-auto">
        {' '}
        Status: {<StatusBadge status={session.status} />}
      </span>
      <div className="text-sm font-medium text-black flex justify-center items-center">
        {renderSessionOptions(session)}
      </div>
    </div>
  );
  const renderSessionOptions = (session: Session) => (
    <GetSessionOptions
      sessionData={session}
      updateComponent={fetchAllSessions}
    />
  );
  return (
    <GenericSessionsTable
      headersMapping={headersMapping}
      fetchFunction={fetchAllSessions}
      renderSearchBox={() => (
        <SessionComboBox
          updateComponent={fetchAllSessions}
          students={students}
          teachers={teachers}
        />
      )}
      totalRecords={totalRecord}
      allSessions={allSessions}
      renderMobileCardComponent={renderMobileCardComponent}
      isLoading={isLoading}
      renderUpdateComponent={renderSessionOptions}
    />
  );
}
