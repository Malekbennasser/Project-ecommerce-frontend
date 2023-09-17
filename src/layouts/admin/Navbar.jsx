import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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

  return (
    <div>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <Link className="navbar-brand ps-3" to="/admin">
          THE STORE
        </Link>

        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          href="#!"
        >
          <i className="fas fa-bars"></i>
        </button>

        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3  my-md-0">
          {/* <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
              <i className="fas fa-search"></i>
            </button>
          </div> */}
        </form>

        <ul className="navbar-nav ms-md-1 me-5 me-lg-5  ">
          <li className={`nav-item dropdown  ${isDropdownOpen ? "show" : ""}`}>
            <button
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              onClick={toggleDropdown}
            >
              <i className="fas fa-user fa-fw"></i>
            </button>
            <ul
              className={`dropdown-menu dropdown-menu ${
                isDropdownOpen ? "show" : ""
              }`}
            >
              {/* <a className="dropdown-item" href="#!">
                Settings
              </a>
              <a className="dropdown-item" href="#!">
                Activity Log
              </a> */}
              {/* <div className="dropdown-divider"></div> */}
              <Link onClick={logoutSubmit} className="dropdown-item" href="#!">
                Logout
              </Link>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
