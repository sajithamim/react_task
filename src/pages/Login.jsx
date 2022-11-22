import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./css/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [formerrors, setFormErrors] = useState({});

  const validate = () => {
    let errors = {};
    if (!email) {
      errors.email = "Email is Required";
    }
    if (!password) {
      errors.password = "Password is Required";
    }
    setTimeout(() => {
      setFormErrors('')
     }, [1500])
    return errors;
    
  };

  const onSignIn = (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setFormErrors(errors);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sessionStorage.setItem("accessToken", user.accessToken);
        sessionStorage.setItem("username", userCredential &&
        userCredential._tokenResponse &&
        userCredential._tokenResponse.email);
        setTimeout(() => {
          navigate("/add_events", {
            state: {
              userId: user.uid,
              email:
                userCredential &&
                userCredential._tokenResponse &&
                userCredential._tokenResponse.email,
            },
          });
        }, [800]);
      })
      .catch((error) => {
        setFormErrors({error:"Incorrect Username/Password"});
      });
  };

  const notify = (message) => {
    toast(message);
  };

  return (
    <div className="maincontainer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 mb-4" style={{ marginTop: "168px" }}>
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-1"></div>
                  <div className="col-lg-10">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form className="user">
                        <div className="form-group">
                          <input
                            id="inputEmail"
                            type="email"
                            values={email}
                            placeholder="Email address"
                            onChange={(e) => setEmail(e.target.value)}
                            required=""
                            autoFocus=""
                            className="form-control form-control-user"
                          />
                        </div>
                        {formerrors.email && (
                          <p className="text-warning">{formerrors.email}</p>
                        )}
                        <div className="form-group">
                          <input
                            id="inputPassword"
                            type="password"
                            values={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required=""
                            className="form-control form-control-user"
                          />
                        </div>
                        {formerrors.password && (
                          <p className="text-warning">{formerrors.password}</p>
                        )}
                        {formerrors.error && (
                          <p className="text-warning">{formerrors.error}</p>
                        )}
                        <button
                          type="submit"
                          onClick={onSignIn}
                          className="btn btn-primary btn-user btn-block"
                        >
                          Login
                        </button>
                      </form>
                      <hr />
                      <div className="text-center">
                        <a className="small" href="/register">
                          Create an account
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
