import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../../../layouts/frontend/Navbar";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

function Login() {
  const navigate = useNavigate();
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios.post(`api/login`, data).then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          localStorage.setItem("auth_token", response.data.token);
          localStorage.setItem("auth_name", response.data.username);
          swal("Success", response.data.message, "success");
          navigate("/");
          if (response.data.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        } else if (response.data.status === 401) {
          swal("warning", response.data.message, "warning");
        } else {
          setLogin({
            ...loginInput,
            error_list: response.data.validation_errors,
          });
        }
      });
    });
  };

  return (
    <div>
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Login
                      </h3>
                    </div>
                    <div className="card-body">
                      <form onSubmit={loginSubmit}>
                        <div className="form-floating mb-3">
                          <input
                            name="email"
                            onChange={handleInput}
                            value={loginInput.email}
                            className="form-control"
                            placeholder="name@example.com"
                          />
                          <label>Email address</label>
                          <span>{loginInput.error_list.email}</span>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            name="password"
                            onChange={handleInput}
                            value={loginInput.password}
                            className="form-control"
                            placeholder="Password"
                          />
                          <label>Password</label>
                          <span>{loginInput.error_list.password}</span>
                        </div>

                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <Link className="small text-dark" to="">
                            Forgot Password?
                          </Link>
                          <button
                            type="submit"
                            className="btn btn-dark rounded-0"
                            to="index.html"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center py-3">
                      <div className="small">
                        <Link
                          className="small text-dark text-decorration-none"
                          to="/register"
                        >
                          Need an account? Sign up!
                        </Link>
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

export default Login;
