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
    case "failed":
      colorClass = "bg-danger-color";
      text = "Failed";
      break;
    default:
      colorClass = "bg-danger-color";
      text = "Absent";
  }

  return (
    <span className={`text-white px-2 py-1 rounded-full ${colorClass}`}>
      {text}
    </span>
  );
};

export default StatusBadge;
