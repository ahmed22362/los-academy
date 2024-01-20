import * as yup from "yup";

interface PlanData {
  title: string;
  sessionDuration: number;
  sessionsCount: number;
  sessionsPerWeek: number;
  discount: number;
  recommended: boolean;
  planPrice?: number;
}

const PlanSchema: yup.Schema<PlanData> = yup.object().shape({
  title: yup.string().required("Required"),
  sessionDuration: yup
    .number()
    .min(1, "Must be 1 or more")
    .required("Title can't be blank"),
  sessionsCount: yup.number().min(1, "Must be 1 or more").required("Required"),
  sessionsPerWeek: yup
    .number()
    .min(1, "Must be 1 or more")
    .required("Required"),
  discount: yup.number().min(0, "Must be 0 or more").required("Required"),
  recommended: yup.boolean().required("Required"),
  planPrice: yup.number().min(0, "Must be 0 or more").optional(),
});

export default PlanSchema;
