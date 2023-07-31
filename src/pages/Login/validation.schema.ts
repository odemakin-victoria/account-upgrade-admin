import * as yup from "yup"

export const loginValidationSchema = yup.object().shape({
    username: yup.string().required('Required'),
    password: yup.string().required('Password is a required field')
});