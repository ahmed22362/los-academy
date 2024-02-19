export interface LoadingButtonProps {
  title: string;
  isProcessing: boolean;
  customStyle?: string;
  action?: () => void;
}
export enum UserRole {
  Admin = "admin",
  Teacher = "teacher",
  Student = "student",
}
export enum SessionStatus {
  PENDING = "pending",
  ONGOING = "ongoing",
  TAKEN = "taken",
  USER_ABSENT = "user_absent",
  TEACHER_ABSENT = "teacher_absent",
}
export interface PlanDetails {
  title: string;
  sessionDuration: number;
  sessionsCount: number;
  sessionsPerWeek: number;
  recommended: boolean;
  discount?: number;
  planPrice?: number;
  type?: string;
}
export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "select"
    | "tel"
    | "number"
    | "textarea"
    | "file"
    | "datepicker"
    | "radio";
  options?: string[];
  placeholder?: string;
  accept?: string;
}
export interface Session {
  id: number;
  sessionInfo: {
    teacher: {
      name: string;
    };
    user: {
      name: string;
    };
  };
  sessionDate: string;
  sessionDuration: number;
  type: string;
  status: string;
  meetingLink?: string;
}
export interface Course {
  id: number;
  title: string;
  description: string;
  details: string;
  createdAt: string;
}
export interface Material {
  id: number;
  name: string;
  course: string;
  age: number;
  createdAt: string;
  status: string;
  b2Link: string;
}
export interface MonthlyReport {
  id: number;
  userId: string;
  teacherId: string;
  grade: string;
  user?: { name: string };
  teacher?: { name: string };
  createdAt: string;
}
export interface Student {
  id: string;
  name: string;
  email: string;
  gender: string;
  age: number;
  availableFreeSession: number;
  remainSessions: number;
  phone: string;
  options?: any;
}
export interface Payout {
  id: number;
  teacher: {
    name: string;
  };
  createdAt: string;
  amount: number;
  status: string;
}
export interface ResponseSessionStatistsData {
  status: string;
  count: number;
}
export interface Teacher {
  id: string;
  name: string;
  role: string;
  committed_mins: number;
  hour_cost: number;
  createdAt: string;
  phone: string;
  email: string;
  balance: number;
}
