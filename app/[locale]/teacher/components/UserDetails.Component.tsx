import React from "react";

enum UserRole {
  Admin = "admin",
  Teacher = "teacher",
  Student = "student",
}

interface User {
  name: string;
}

interface UserDetailsComponentProps {
  userName?: string;
  teacherName?: string;
  role: UserRole;
}
const UserDetailsComponent: React.FC<UserDetailsComponentProps> = ({
  userName,
  teacherName,
  role,
}) => {
  switch (role) {
    case UserRole.Admin:
      return (
        <>
          <li>User Name: {userName}</li>
          <li>Teacher Name: {teacherName}</li>
        </>
      );

    case UserRole.Teacher:
      return <li>Student Name: {userName}</li>;

    case UserRole.Student:
      return <li>Teacher Name: {teacherName}</li>;

    default:
      return null;
  }
};

export default UserDetailsComponent;
