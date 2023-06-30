import { useFormik } from "formik";
import * as yup from "yup";

//! THIS CODE ISNT FINISHED OR ATTACHED TO ANYTHING.
//! SHELL FOR UPDATING USER. HAS BACKEND FUNCTIONALITY BUILT BUT NOT TESTED TOGETHER

const UpdateUserForm = ({ onUpdate }) => {
  const updateSchema = yup.object().shape({
    username: yup
      .string()
      .min(8, "Too Short!")
      .max(18, "Too Long!"),
    password: yup.string().min(8).max(20),
  });

  const formik = useFormik({
    initialValues: {
        //! can change to current value below if we want by creating currentValue variable?
      username: "",
      password: "",
    },
    validationSchema: updateSchema,
    onSubmit: (values, { setErrors, setSubmitting }) => {
      setSubmitting(true);
      fetch("/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          setSubmitting(false);
          if (res.ok) {
            res.json().then((user) => onUpdate(user));
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

  return user ? (
    //! either this as a div OR just send it to <UserBooks/> to do it for you, can you do that?
    <div>
      <h2>Welcome to your library, {user.username}!</h2>
      <button onClick={handleDeleteUser}>Delete Account</button>
      {/* <button onClick={handleUpdateUser}>Edit Account</button> */}
      <h1>Books</h1>
      <h3>{booksList ? booksList : <></>}</h3>
    </div>
  ) : (
    <div>
      <h1>Please Login or Signup!</h1>
      <h2>{signUp ? 'Already a User?' : 'Not a User?'}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
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
            id="password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <div>{formik.errors.password}</div>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleClick}>
        {signUp ? 'Log in here!' : 'Register Now!'}
      </button>
    </div>
  );
}
export default UpdateUserForm