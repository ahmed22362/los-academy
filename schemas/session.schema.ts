import * as yup from "yup";

const createSessionSchema = yup.object().shape({
  userId: yup.string().required("User ID is required"),
  teacherId: yup.string().required("Teacher ID is required"),
  sessionDates: yup
    .array()
    .of(yup.date().required("Session date is required"))
    .required("Session dates are required"),
  sessionDuration: yup
    .number()
    .required("Session duration is required")
    .positive("Session duration must be a positive number"),
  sessionCount: yup
    .number()
    .required("Session count is required")
    .integer("Session count must be an integer"),
  sessionsPerWeek: yup
    .number()
    .required("Sessions per week is required")
    .integer("Sessions per week must be an integer"),
  type: yup.string().required("Type is required"),
});

export default createSessionSchema;
