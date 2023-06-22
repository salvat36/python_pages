import {Formik, Form, Field} from 'formik'
import * as yup from 'yup'

const Login = () => {

    const LoginSchema = yup.object().shape({
        username: yup.string()
        .required('Must Enter username!')
        .min(8, 'Too Short!')
        .max(18, 'Too Long!'),
        password: yup.string()
        .required('Must Enter a Password!')
        .min(8)
        .max(20),
    })

const ValidationLogin = () => (
    <div>
        <h1> Login </h1>
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit= {({ values }) => {
                alert(JSON.stringify(values, null, 2))
            }}
        >
            {({ errors, touched, values }) => (
                <Form values={values}>
                    <Field name= 'username' />
                    {errors.username && touched.username ? (
                        <div>{errors.username}</div>
                    ) : null}
                    <Field name= 'password' />
                    {errors.password && touched.password ? (
                        <div>{errors.password}</div>
                    ) : null}
                    <button type='submit'>Login</button>
                </Form>
            )}
            </Formik>
    </div>
);
return <ValidationLogin />   
}

export default Login