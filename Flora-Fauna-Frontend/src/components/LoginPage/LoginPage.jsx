import * as React from "react";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import validation from "../../validate";
import { useAuthContext } from "../../contexts/auth.jsx";
import "./LoginPage.css";
import Footer from "../Footer/Footer";

export default function LoginPage() {
  const { loginUser, user, setUser, reqError, isLoading, initialized, error } =
    useAuthContext();

  //Checks if a user is logged in and navigates to home if true
  const navigate = useNavigate();
  if (user) {
    navigate("/");
  }
  return (
    <div className="login-page">
      <LoginForm
        user={user}
        setUser={setUser}
        loginUser={loginUser}
        authErrors={reqError}
        isLoading={isLoading}
        loginError={error}
      />
      <Footer />
    </div>
  );
}

export function LoginForm({ user, setUser, loginUser, authErrors, isLoading, loginError }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [reqErrors, setReqErrors] = useState({})
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  //Changes values state
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  //Function to call login function
  const handleLoginOnSubmit = async () => {
    const login = await loginUser(values);
  };
  //Login function 
  const loginUserOnSubmit = async () => {
    setIsProcessing(true);
    //Frontend Error Handling
    setErrors({});
    let regex = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])",
    );
    if (regex.test(values.email) === false) {
      setErrors((prevState) => ({ ...prevState, email: "Invalid Email" }));
      return;
    }
    if (values.password.length < 8) {
      setErrors((prevState) => ({ ...prevState, password: "Password needs to be longer than 8 letters" }));
      return;
    } else {
      await handleLoginOnSubmit();
      //Setting error message from invalid email/password combo
      if(Object.keys(loginError).length > 0){
        setReqErrors(loginError?.response.data?.error?.message)
      }
      setIsProcessing(false);
    }
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
          <h3 className={reqErrors.length > 0 && Object.keys(errors).length <= 0 ? "error" : "hidden"}>Wrong Password/Email Combo</h3>
          </div>
          <ibutton onClick={loginUserOnSubmit} className="submit-login btn">
            Login
          </ibutton>
        </div>
        <div className="footer">
          <p>
            Don't have an account? Sign up{" "}
            <Link className="auth-link" to="/register">here.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
