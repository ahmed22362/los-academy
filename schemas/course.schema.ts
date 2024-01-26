import * as yup from "yup";

interface CourseData {
  title: string;
  description: string;
  details: string;
}

const CourseSchema: yup.Schema<CourseData> = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  details: yup.string().required("Details are required"),
});

export default CourseSchema;
