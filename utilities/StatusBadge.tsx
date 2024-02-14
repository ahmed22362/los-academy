interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let colorClass = "";
  let text = "";

  switch (status) {
    case "pending":
      colorClass = "bg-warning-color";
      text = "Pending";
      break;
    case "taken":
      colorClass = "bg-success-color";
      text = "Completed";
      break;
    case "new Arrival":
      colorClass = "bg-success-color";
      text = "New Arrival";
      break;
    case "archived":
      colorClass = "bg-warning-color";
      text = "Archived";
      break;
    case "failed":
      colorClass = "bg-danger-color";
      text = "Failed";
      break;
    case "user_absent":
      colorClass = "bg-danger-color";
      text = "User Absent";
      break;
    case "teacher_absent":
      colorClass = "bg-danger-color";
      text = "Teacher Absent";
      break;
    case "both_absent":
      colorClass = "bg-danger-color";
      text = "Both Absent";
      break;
    default:
      colorClass = "bg-danger-color";
      text = "No Status";
  }

  return (
    <span className={`text-white px-2 py-1 rounded-full ${colorClass} w-100`}>
      {text}
    </span>
  );
};

export default StatusBadge;
