import React, {useState} from "react";
import Header from "../components/Header";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./css/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSignIn = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setTimeout(() => {
          navigate("/add_events",{state:{userId: user.uid}});
        }, [800]);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className ="maincontainer">
      <Header />
      <div className="container-fluid">
        <div className="row no-gutter">
          {/* <div className="col-md-6 d-none d-md-flex bg-image"></div> */}

          <div className="col-md-12 bg-light">
            <div className="login d-flex align-items-center py-5">
              <div className="container ">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h3 className="display-4">Login</h3>
                    <p className="text-muted mb-4">Login here to create Events</p>
                    <form>
                      <div className="form-group mb-3">
                        <input
                          id="inputEmail"
                          type="email"
                          values={email}
                          placeholder="Email address"
                          onChange={(e) => setEmail(e.target.value)}
                          required=""
                          autoFocus=""
                          
                          className="form-control rounded-pill border-0 shadow-sm px-4"
                        />
                      </div>
                      <div className="form-group mb-6">
                        <input
                          id="inputPassword"
                          type="password"
                          values={password}
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                          required=""
                          className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                        />
                      </div>

                      <button
                        type="submit"
                        onClick={onSignIn}
                        className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                      >
                        Sign in
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
