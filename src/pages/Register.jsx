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
  const { values, setValues, handleInputChange, resetForm } =
    useForm(initialValues);

  const validatePassword = () => {
    let isValid = true;
    if (values.password !== "" && values.confirmPassword !== "") {
      if (values.password !== values.confirmPassword) {
        isValid = false;
        let error = "Passwords does not match";
        notify(error);
      }
    }
    return isValid;
  };

  const onRegister = (e) => {
    e.preventDefault();
    setError("");
    const auth = getAuth();
    const { email, password } = values;
    if (validatePassword()) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          let message = "User Created Successfully";
          notify(message);
          setTimeout(() => {
            navigate("/login");
          }, [1500]);
        })
        .catch((err) => notify(err.message));
    }
  };

  const notify = (message) => {
    toast(message);
  };

  return (
    <div className="maincontainer">
      <Header />
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="col-md-12 bg-light">
            <div className="login d-flex align-items-center py-5">
              <div className="container ">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h3 className="display-4">Register</h3>

                    <form>
                      <div className="form-group mb-3">
                        <input
                          id="inputEmail"
                          type="email"
                          name="email"
                          values={values.email}
                          placeholder="Email address"
                          onChange={handleInputChange}
                          required=""
                          autoFocus=""
                          className="form-control border-0 shadow-sm px-4"
                        />
                      </div>
                      <div className="form-group mb-6">
                        <input
                          id="inputPassword"
                          type="password"
                          name="password"
                          values={values.password}
                          placeholder="Password"
                          onChange={handleInputChange}
                          required=""
                          className="form-control  border-0 shadow-sm px-4 text-primary"
                        />
                      </div>
                      <div className="form-group mb-6">
                        <input
                          id="confirm"
                          type="password"
                          name="confirmPassword"
                          values={values.confirmPassword}
                          placeholder="Confirm Password"
                          onChange={handleInputChange}
                          required=""
                          className="form-control  border-0 shadow-sm px-4 text-primary"
                        />
                      </div>
                      <button
                        type="submit"
                        onClick={onRegister}
                        className="btn btn-primary btn-block text-uppercase mb-2 shadow-sm"
                      >
                        Register
                      </button>
                    </form>
                    <div>
                      <ToastContainer />
                    </div>
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

export default Register;
