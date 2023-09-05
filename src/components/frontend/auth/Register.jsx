import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../layouts/frontend/Navbar";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
function Register() {
  const navigate = useNavigate();
  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };
    axios.get("/sanctum/csrf-cookie").then(() => {
      // Login...
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message, "success");
          navigate("/");
        } else {
          setRegister({
            ...registerInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };

  return (
    <div>
      <Navbar />
      <h1>register</h1>
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-7">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Create Account
                      </h3>
                    </div>
                    <div className="card-body">
                      <form onSubmit={registerSubmit}>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            name="name"
                            onChange={handleInput}
                            value={registerInput.name}
                            placeholder="Enter your first name"
                          />
                          <label>Full name</label>
                          <span>{registerInput.error_list.name}</span>
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            name="email"
                            onChange={handleInput}
                            value={registerInput.email}
                            placeholder="name@example.com"
                          />
                          <label>Email address</label>
                          <span>{registerInput.error_list.email}</span>
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            name="password"
                            onChange={handleInput}
                            value={registerInput.password}
                            placeholder="Create a password"
                          />
                          <label>Password</label>
                          <span>{registerInput.error_list.password}</span>
                        </div>

                        <div className="mt-4 mb-0">
                          <div className="d-grid">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                              to="#"
                            >
                              Create Account
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center py-3">
                      <div className="small">
                        <Link to="/login">Have an account? Go to login</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Register;
