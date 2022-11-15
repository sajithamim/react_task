import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "./fire";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const auth = getAuth();
  const navigate = useNavigate();

  const onSignIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sessionStorage.setItem("accessToken", user.accessToken);
        navigate("/eventlist");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="Auth-form-container">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Log In</h3>
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control mt-1"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button onClick={onSignIn} className="btn btn-primary">
            Submit
          </button>
        </div>
         <div className="d-grid gap-2 mt-3">
          <a href="/eventlist" className="link-primary">
            Click here to Add Events without a Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
