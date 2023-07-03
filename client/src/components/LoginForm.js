import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Button, Message } from "semantic-ui-react";

const LoginForm = ({ onLogin, handleLoginClick }) => {
  const loginSchema = yup.object().shape({
    username: yup
      .string()
      .required("Must Enter Username")
      .min(5, "Too Short!")
      .max(20, "Too Long!"),
    password: yup.string().required("Must Enter a Password").min(5).max(20),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, { setErrors, setSubmitting }) => {
      setSubmitting(true);
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          setSubmitting(false);
          if (res.ok) {
            res.json().then((user) => onLogin(user));
          } else {
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
      <h1>Login</h1>
      <Form id="login-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          label="Username"
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={
            formik.errors.username && formik.touched.username
              ? {
                  content: formik.errors.username,
                }
              : null
          }
          style={{ borderRadius: "10px" }} // Rounded input field
        />
        <Form.Input
          label="Password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={
            formik.errors.password && formik.touched.password
              ? {
                  content: formik.errors.password,
                }
              : null
          }
          style={{ borderRadius: "10px" }} // Rounded input field
        />
        <Button type="submit" primary style={{ borderRadius: "10px" }}>
          Login
        </Button>
      </Form>
      <Button onClick={handleLoginClick} style={{ borderRadius: "10px" }}>
        No Account? Sign up Now!
      </Button>
      {formik.errors.general && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{formik.errors.general}</p>
        </Message>
      )}
    </div>
  );
};

export default LoginForm;