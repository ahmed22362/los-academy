
import * as yup from 'yup';

const passwordRulez = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,40}$/


interface SignUpUser {
    name: string;
    email: string;
    phone: string;
    password: string;
    passwordConfirmation: string;
    gender: string;
    age: number;
}

const signupSchema: yup.Schema<SignUpUser> = yup.object().shape({
    name: yup
        .string()
        .required('Name is required'),
    email: yup
        .string()
        .required('Email is required')
        .email('Email is not valid'),
    phone: yup
        .string()
        .required('Phone number is required'),
    password: yup
        .string()
        .required('Password is required')
        .matches(passwordRulez, 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number'),
    passwordConfirmation: yup
        .string()
        .required('Password confirmation is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
    gender: yup
        .string()
        .required('Gender is required'),
    age: yup
        .number()
        .required('Age is required')
        .min(3, 'Age must be at least 3')
        .max(20, 'Age must be at most 20'),
});
export default signupSchema;