import * as React from "react"
import { Link } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import validation from '../../validate'
import "./LoginPage.css"

export default function LoginPage({ user, setUser }) {
  return (
    <div className="login-page">
        <LoginForm user={user} setUser={setUser} />
    </div>
  )
}

export function LoginForm({ user, setUser }) {

    let navigate = useNavigate()

    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        email:  "",
        password: "",
    });

      const handleChange = (e) => {
        setValues({
          ...values,
          [e.target.name]: e.target.value,
        })
      }

    return(
        <div className="login-form">
            <div className="card">
                <h2>Login</h2>
                <div className="form">
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input className="form-input"
                               type="email" 
                               name="email" 
                               placeholder="user@email.com"
                               autoComplete="off"
                               onChange={handleChange}
                               value={values.email}
                               required
                               />
                               {/* {errors.email && <span className="error">{errors.email}</span>} */}
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Password</label>
                        <input className="form-input" 
                               type="password" 
                               name="password" 
                               placeholder="•••••••"
                               onChange={handleChange}
                               value={values.password}
                               required
                               />
                               {/* {errors.password && <span className="error">{errors.password}</span>} */}
                    </div>
                    <button className="submit-login btn">Login</button>
                    {/* {onClick={loginUser}} */}
                </div>
                <div className="footer">
                    <p>Don't have an account? Sign up <Link className="auth-link" to='/registration'>here.</Link></p>
                </div>
            </div>
        </div>
    )
}