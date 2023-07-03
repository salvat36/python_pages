import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Button } from "semantic-ui-react";

const SignupForm = ({ onSignup }) => {
  const signupSchema = yup.object().shape({
    username: yup
      .string()
      .required("Must Enter Username")
      .min(8, "Too Short!")
      .max(18, "Too Long!"),
    password: yup.string().required("Must Enter a Password").min(8).max(20),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values, { setErrors, setSubmitting }) => {
      setSubmitting(true);
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          setSubmitting(false);
          if (res.ok) {
            res.json().then((user) => onSignup(user));
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
      <h1>Signup</h1>
      <Form onSubmit={formik.handleSubmit}>
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
        />
        <Button type="submit" primary>
          Signup
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;