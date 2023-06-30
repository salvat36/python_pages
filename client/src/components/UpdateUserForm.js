import { useFormik } from "formik";
import * as yup from "yup";
import { Switch, Route, useParams, useHistory } from 'react-router-dom';


//! THIS CODE ISNT FINISHED OR ATTACHED TO ANYTHING.
//! SHELL FOR UPDATING USER. HAS BACKEND FUNCTIONALITY BUILT BUT NOT TESTED TOGETHER

const UpdateUserForm = ({ onUpdate, user }) => {
  const history = useHistory()

  const updateSchema = yup.object().shape({
    username: yup
      .string()
      .min(8, "Too Short!")
      .max(18, "Too Long!"),
    password: yup.string().min(8).max(20),
  });

  const formik = useFormik({
    initialValues: {
      username: user.username,
      password: user.password,
    },
    validationSchema: updateSchema,
    onSubmit: (values, { setErrors, setSubmitting, resetForm }) => {
      setSubmitting(true);
      fetch(`/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          setSubmitting(false);
          if (res.ok) {
            res.json().then((user) => {
              onUpdate(user)
              alert('Successfully updated your account!')
              resetForm({values: ''})
              history.push('/logout')
              history.push('/user-books')
            });
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
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && formik.touched.username && (
            <div>{formik.errors.username}</div>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <div>{formik.errors.password}</div>
          )}
        </div>
      <button type='submit'>
        Update Profile!
      </button>
      </form>
    </div>
  )
}
export default UpdateUserForm