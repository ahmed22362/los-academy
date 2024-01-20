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
  type: "text" | "email" | "select" | "tel" | "number" | "textarea";
  options?: string[];
  placeholder?: string;
}
export interface Session {
  id: number;
  SessionInfo: {
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
