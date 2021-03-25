import React, { useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../store/auth";
import "./index.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/auth";

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      dispatch(setUser(user));
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="Big">
      <div className="flag1 flag"></div>
      <div className="flag2 flag"></div>

      <div className="login-form">
        <form onSubmit={onLogin}>
          <h1>InstaLock</h1>
          <div>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <div className="err">
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
          </div>
        </form>
        <div className="signup-link-box">
          <div className="signup-link-text">
            {/* Added space after sentence */}
            Don't have an account?&nbsp;
            {/* Removed underline for Sign up */}
            <NavLink to="/signup" style={{ textDecoration: 'none' }} className="signUp">Sign up</NavLink>
          </div>
        </div>
        <div className="banner1"></div>
      </div>
      <div className="flag3 flag"></div>
      <div className="flag4 flag"></div>
    </div>
  );
};

export default LoginForm;
