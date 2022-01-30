import * as yup from 'yup'

export const formValidation = async (formField) => {
    const form = yup.object().shape({
        name: yup.string()
            .required('the field NAME is required'),
        url: yup.string()
            .required('the field URL is required')
    })

    try {
        await form.validate(formField, {
            abortEarly : false
        })
        return false
    } catch (error) {
        return error.errors
    }
}