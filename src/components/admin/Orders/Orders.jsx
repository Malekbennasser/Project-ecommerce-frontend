import { useEffect, useState } from "react";
import Footer from "../../../layouts/admin/Footer";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import axios from "../../../Axios/AxiosConfig";
import { Link } from "react-router-dom";

function Orders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let isMounted = true;
    document.title = "Orders";
    axios.get("/api/orders").then((response) => {
      if (isMounted) {
        if (response.data.status === 200) {
          setOrders(response.data.orders);
        }
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  let display_orders = "";

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    display_orders = orders.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.tracking_no}</td>
          <td>{item.phone}</td>
          <td>{item.email}</td>
          <td>{item.payment_mode}</td>

          <td>
            <Link
              to={`view-order/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Voir
            </Link>
          </td>
        </tr>
      );
    });
  }

  return (
    <>
      <div className="sb-nav-fixed">
        <Navbar />

        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <Sidebar />
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4 mt-3">
                <div className="card">
                  <div className="card-header ">
                    <h4>Orders</h4>
                  </div>
                  <div className="card-body">
                    <table className="table table-bordered table-striped">
                      <thead className="text-center">
                        <tr>
                          <th>ID</th>
                          <th>Tracking No.</th>
                          <th>Phone No.</th>
                          <th>Email</th>
                          <th>Payment Mode</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">{display_orders}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
