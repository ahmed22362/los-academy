
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
        .required('Required'),
    email: yup
        .string()
        .required('Required')
        .email('Not valid email'),
    phone: yup
        .string()
        .required('Required'),
    password: yup
        .string()
        .required('Required')
        .matches(passwordRulez, 'make sure there is 6-40 characters at least 1 uppercase, 1 lowercase, 1 number and 1 special character'),
    passwordConfirmation: yup
        .string()
        .required('Required')
        .oneOf([yup.ref('password')], 'Not Match'),
    gender: yup
        .string()
        .required('Required'),
    age: yup
        .number()
        .required('Required')
        .min(3, 'start from 3 years old')
        .max(20, 'not more than 20 years old'),
});
export default signupSchema;