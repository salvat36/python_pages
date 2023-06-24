import React, { useState } from 'react'
import { Switch, Route, useParams, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Button, Message } from 'semantic-ui-react';

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
        onSubmit: (values, { setErrors, setSubmitting, resetForm }) => {
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
                    formik.resetForm()
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
          <Form onSubmit={formik.handleSubmit}>
            <Form.Field>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.errors.username && formik.touched.username ? (
              <Message error content ={formik.errors.username}/>
            ) : null}
            </Form.Field>
            <Form.Field>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password ? (
              <Message error content ={formik.errors.username}/>
            ) : null}
            </Form.Field>
    
            <Button type="suBmit">Login</Button>
          </Form>
          <Button onClick={handleClick}>{signUp? 'Please Login here' :  'Create an Account!'}</Button>
        </div>
      );
    };
export default Authentication