import * as yup from "yup";

interface Payout {
  amount: number;
  teacherId: string;
  status?: string;
}

const createPayoutSchema: yup.Schema<Payout> = yup.object().shape({
  amount: yup.number().required("amount is required"),
  teacherId: yup.string().required("teacherId is required"),
});

export default createPayoutSchema;
