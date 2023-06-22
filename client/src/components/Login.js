import {useState, useEffect} from "react"
import {Formik, Form, Field} from 'formik'
import * as yup from 'yup'

const Login = ( {} ) => {

    const LoginSchema = yup.object().shape({
        username: yup.string().required("Must Enter username!")
        .min(8, 'Too Short!')
        .max(18, 'Too Long!'),
        password: yup.string().required("Must Enter a Password!")
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
        >
            </Formik>
    </div>
)

  return (
    <div>Login</div>
  )
}

export default Login