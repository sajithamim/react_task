import React, { useState } from "react";
import Header from "../components/Header";
import { useForm } from "../common/useForm";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const initialValues = {};

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formerrors, setFormErrors] = useState({});
  const { values, handleInputChange } = useForm(initialValues);

  const validatePassword = () => {
    let isValid = true;
    let errors = {};
    if (!values.email) {
      errors.email = "Email is Required";
    }
    if (!values.password) {
      errors.password = "Password is Required";
    }
    if (values.password !== "" && values.confirmPassword !== "") {
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords does not match";
      }
    }
    setTimeout(() => {
      setFormErrors("");
    }, [1500]);
    return errors;
  };

  const onRegister = (e) => {
    e.preventDefault();
    setError("");
    const auth = getAuth();
    const { email, password } = values;
    let errors = validatePassword();
    if (Object.keys(errors).length) return setFormErrors(errors);
    // Create a new user with email and password using firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        let message = "User Created Successfully";
        notify(message);
        setTimeout(() => {
          navigate("/login");
        }, [1500]);
      })
      .catch((err) => {
        let errMessage =
          err &&
          err.message
            .replace("Firebase: Error (auth/", "")
            .replace("Firebase:", "")
            .replace(")", "")
            .replace("(", "");
        notify(errMessage);
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
                        <h1 className="h4 text-gray-900 mb-4">Register</h1>
                      </div>
                      <form className="user">
                        <div className="form-group">
                          <input
                            id="inputEmail"
                            type="email"
                            name="email"
                            values={values.email}
                            placeholder="Email address"
                            onChange={handleInputChange}
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
                            name="password"
                            values={values.password}
                            placeholder="Password"
                            onChange={handleInputChange}
                            required=""
                            className="form-control form-control-user"
                          />
                        </div>
                        {formerrors.password && (
                          <p className="text-warning">{formerrors.password}</p>
                        )}
                        <div className="form-group">
                          <input
                            id="confirm"
                            type="password"
                            name="confirmPassword"
                            values={values.confirmPassword}
                            placeholder="Confirm Password"
                            onChange={handleInputChange}
                            required=""
                            className="form-control   form-control-user"
                          />
                        </div>
                        {formerrors.confirmPassword && (
                          <p className="text-warning">
                            {formerrors.confirmPassword}
                          </p>
                        )}
                        <button
                          type="submit"
                          onClick={onRegister}
                          className="btn btn-primary btn-block text-uppercase mb-2 shadow-sm"
                        >
                          Register
                        </button>
                      </form>
                      <hr />
                      <div className="text-center">
                        <a className="small" href="/login">
                          Already have an account? Login!
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

export default Register;
