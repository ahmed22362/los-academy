import * as yup from "yup";

const materialSchema = yup.object().shape({
  name: yup.string().required("Material Name is required"),
  course: yup.string().required("Course is required"),
  age: yup.string().required("Up to Age is required"),
  file: yup.mixed().required("File is required"),
  status: yup
    .string()
    .oneOf(["new Arrival", "active", "archived"], "Invalid status")
    .optional(),
});

export default materialSchema;
