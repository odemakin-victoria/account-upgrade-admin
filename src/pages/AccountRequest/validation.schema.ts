import * as yup from "yup"

export const account = yup.object().shape({
    documentComment: yup.string(),
    documentStatus: yup.string()
});