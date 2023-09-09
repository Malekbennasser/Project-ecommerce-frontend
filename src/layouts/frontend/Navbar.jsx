import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutSubmit = (e) => {
    e.preventDefault();

    axios.post(`api/logout`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");
        navigate("/");
      }
    });
  };
  var AuthButtons = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButtons = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </ul>
    );
  } else {
    AuthButtons = (
      <li className="nav-item">
        <button
          onClick={logoutSubmit}
          type="button"
          className="nav-link btn btn-danger btn-ssm text-black"
          to="/"
        >
          Logout
        </button>
      </li>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" href="#">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/collections">
                Collection
              </Link>
            </li>
            {AuthButtons}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
