import React, { useState } from 'react'
import { Switch, Route, useParams, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const Authentication = ( { updateUser } ) => {
    const [signUp, setSignUp] = useState(false)
    const history = useHistory()

    const handleClick = () => setSignUp((signUp) => !signUp)

    
    const formSchema = yup.object().shape({
        username: yup
          .string()
          .required("Must Enter Username")
          .min(5, "Too Short!")
          .max(80, "Too Long!"),
        password: yup.string().required("Must Enter a Password").min(5).max(80),
      });
    
      const formik = useFormik({
        initialValues: {
          username: "",
          password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { setErrors, setSubmitting }) => {
          setSubmitting(true);
          fetch(signUp? '/signup' : '/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((res) => {
              setSubmitting(false);
              if (res.ok) {
                res.json().then((res) => {
                    updateUser(res)
                    history.push('/')
                }
                )} else {
                res.json().then((err) => setErrors(err.errors));
              }
            })
            .catch((error) => {
              setSubmitting(false);
              console.error(error);
            });
        },
      });
      return (
        <div>
          <h1>Please Login or Signup!</h1>
          <h2>{signUp? 'Already a User?' : 'Not a User?'} </h2>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.errors.username && formik.touched.username ? (
              <div>{formik.errors.username}</div>
            ) : null}
            <input
              type="text"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
    
            <button type="submit">Login</button>
          </form>
          <button onClick={handleClick}>{signUp? 'Log in here!' :  'Register Now!'}</button>
        </div>
      );
    };
export default Authentication