// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Navigate, Outlet, useNavigate } from "react-router-dom";
// import swal from "sweetalert";

// function AdminPrivateRoute() {
//   const [Authenticated, setAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     axios.get("/api/chekingAuthenticated").then((response) => {
//       if (response.status === 200) {
//         setAuthenticated(true);
//       }
//       setLoading(false);
//       return setAuthenticated(false);
//     });
//   }, []);
//   const navigate = useNavigate();
//   useEffect(() => {
//     axios.interceptors.response.use(
//       undefined,
//       function axiosRetryInterceptor(err) {
//         if (err.status === 401) {
//           swal("Unauthoriezd", "warning");
//           navigate("/");
//         } else {
//           return Promise.reject(err);
//         }
//       }
//     );

//     axios.interceptors.response.use(
//       function (response) {
//         return response;
//       },
//       function (error) {
//         if (error.status === 403) {
//           swal("Forbedden", error.response.data.message, " warning");
//           navigate("/403");
//         } else if (error.status === 404) {
//           swal("404 Error", "warning");
//           navigate("/404");
//         } else {
//           return Promise.reject(error);
//         }
//       }
//     );
//   }, [navigate]);

//   if (loading) {
//     return <h1>loading......</h1>;
//   }

//   return Authenticated ? <Outlet /> : <Navigate to="/login" replace={true} />;
// }

// export default AdminPrivateRoute;

import axios from "axios";
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
  // Nettoyer les intercepteurs lorsque le composant est démonté
  // return () => {
  //   axios.interceptors.response.eject(axiosRetryInterceptor);
  //   axios.interceptors.response.eject(axiosErrorInterceptor);
  // };

  if (loading) {
    return <h1>Loading......</h1>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminPrivateRoute;
