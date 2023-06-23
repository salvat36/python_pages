import { useFormik } from "formik";
import * as yup from "yup";

const Signup = ({ onLogin }) => {
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
      <h1>Signup</h1>
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

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};
export default Signup;
