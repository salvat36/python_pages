import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Button, Message } from "semantic-ui-react";

const Authentication = ({ updateUser }) => {
  const [signUp, setSignUp] = useState(false);
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  const handleClick = () => setSignUp((signUp) => !signUp);

  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username Required")
      .min(5, "Must be at least 5 characters")
      .max(80, "Cannot go over 80 characters"),
    password: yup
      .string()
      .required("Password Required")
      .min(5, "Must be at least 5 characters")
      .max(80, "Cannot go over 80 characters"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      fetch(signUp ? "/signup" : "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((res) => {
              updateUser(res);
              resetForm();
              history.push("/");
            });
          } else {
            res.json().then((error) => setErrors([error.message]));
          }
        })
        .catch((error) => console.log(error));
    },
  });
  return (
    <div>
      <h1>Please Login or Signup!</h1>
      <h2>{signUp ? "Create an Account Below: " : "Login Below: "} </h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Field>
          <label htmlFor="username">Username:</label>
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && formik.touched.username && (
            <Message negative content={formik.errors.username} />
          )}
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">Password:  </label>
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <Message negative content={formik.errors.password} />
          )}
        </Form.Field>

        <Button type="submit">{signUp ? 'Signup' : 'Login'}</Button>
      </Form>
      {errors.length > 0 && (
        <Message negative>
          <Message.Header>Error Occured:</Message.Header>
          <Message.List>
            {errors.map((error, index) => (
              <Message.Item key={index}>Must submit a valid username/password</Message.Item>
            ))}
          </Message.List>
        </Message>
      )}
      <Button onClick={handleClick}>
        {signUp ? "Login here!" : "Create an Account!"}
      </Button>
    </div>
  );
};
export default Authentication;