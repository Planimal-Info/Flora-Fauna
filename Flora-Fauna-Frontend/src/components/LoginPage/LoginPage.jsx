import * as React from "react";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import validation from "../../validate";
import { useAuthContext } from "../../contexts/auth.jsx";
import "./LoginPage.css";

export default function LoginPage() {
  const { loginUser, user, setUser } = useAuthContext();
  console.log(user);
  return (
    <div className="login-page">
      <LoginForm user={user} setUser={setUser} loginUser={loginUser} />
    </div>
  );
}

export function LoginForm({ user, setUser, loginUser }) {
  let navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginOnSubmit = () => {
    console.log(values);
    loginUser(values);
  };
  //Commented out validation because it causes errors with the auth/me route,
  //Needs to be fixed.
  const loginUserOnSubmit = () => {
    setIsProcessing(true);
    setErrors(validation(values));

    // if (values.passwordConfirm !== values.password) {
    //   setErrors(validation(values.passwordConfirm));
    //   setIsProcessing(false);
    //   return;
    // } else {
    //   setErrors((e) => ({ ...e, passwordConfirm: null }));
    // }
    handleLoginOnSubmit();
  };
  return (
    <div className="login-form">
      <div className="card">
        <h2>Login</h2>
        <div className="form">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="user@email.com"
              autoComplete="off"
              onChange={handleChange}
              value={values.email}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="email">Password</label>
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="•••••••"
              onChange={handleChange}
              value={values.password}
              required
            />
            {errors.password && <span className="error">{errors.password}
            </span>}
          </div>
          <Link to="/" className="submit-login btn" onClick={loginUserOnSubmit}>
            <ibutton onClick={loginUserOnSubmit}>Login</ibutton>
          </Link>
        </div>
        <div className="footer">
          <p>
            Don't have an account? Sign up{" "}
            <Link className="auth-link" to="/registration">here.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
