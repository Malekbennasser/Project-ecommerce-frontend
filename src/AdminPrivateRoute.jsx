import axios from "./Axios/AxiosConfig";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function AdminPrivateRoute() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/chekingAuthenticated").then((response) => {
      if (response.status === 200) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    });
  }, [navigate]);
  useEffect(() => {
    axios.interceptors.response.use(undefined, (error) => {
      if (error.response.status === 401) {
        swal("Unauthorized", error.response.data.message, "warning");
        navigate("/");
      } else {
        return Promise.reject(error);
      }
    });

    axios.interceptors.response.use(
      (response) => response,
      function (error) {
        if (error.response.status === 403) {
          swal("Forbidden", error.response.data.message, " warning");
          navigate("/403");
        } else if (error.response.status === 404) {
          swal("404 Error", "warning");
          navigate("/404");
        } else {
          return Promise.reject(error);
        }
      }
    );
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminPrivateRoute;
