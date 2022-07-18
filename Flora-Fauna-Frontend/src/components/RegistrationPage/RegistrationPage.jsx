import * as React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import validation from "../../validate"
import "./RegistrationPage.css"

export default function RegistrationPage() {
  return (
    <div className="registration-page">
           <RegistrationForm />
    </div>
  )
}

/* REGISTRATION FORM */
export function RegistrationForm() {
  
  let navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState()
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email:  "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: ""
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
    
  }

  return (
    <div className="registration-form">
      <div className="card">
        <h2>Register</h2>
        <div className="form">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input 
              className="form-input" 
              type="email" 
              name="email" 
              placeholder="Enter a valid email" 
              value={values.email}
              onChange={handleChange} />
              {/* {errors.email && <span className="error">{errors.email}</span>} */}
          </div>
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input 
              className="form-input" 
              type="text" 
              name="username" 
              placeholder="your username" 
              value={values.username}
              onChange={handleChange} />
              {/* {errors.username && <span className="error">{errors.username}</span>} */}
          </div>
          <div className="split-input-field">
            <div className="input-field">
              <label htmlFor="first-name">First Name</label>
              <input 
                className="form-input" 
                type="text" 
                name="firstName" 
                placeholder="First Name" 
                value={values.firstName}
                onChange={handleChange} />
                {/* {errors.firstName && <span className="error">{errors.firstName}</span>} */}
            </div>
            <div className="input-field">
              <label htmlFor="last-name">Last Name</label>
              <input 
                className="form-input" 
                type="text" 
                name="lastName" 
                placeholder="Last Name" 
                value={values.lastName}
                onChange={handleChange} />
                {/* {errors.lastName && <span className="error">{errors.lastName}</span>} */}
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input 
              className="form-input" 
              type="password" 
              name="password" 
              placeholder="Enter a secure password" 
              value={values.password}
              onChange={handleChange} />
              {/* {errors.password && <span className="error">{errors.password}</span>} */}
          </div>
          <div className="input-field">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input 
              className="form-input" 
              type="password" 
              name="passwordConfirm" 
              placeholder="Confirm your password" 
              value={values.passwordConfirm}
              onChange={handleChange} />
              {/* {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>} */}
          </div>
          <button className="submit-registration btn">Create Account</button>
          {/* {onClick={signupUser}} */}
        </div>
        <div className="footer">
          <p>Already have an account? Login <Link className="auth-link" to='/login'>here.</Link></p>
        </div>
      
        </div>
    </div>
  )
}