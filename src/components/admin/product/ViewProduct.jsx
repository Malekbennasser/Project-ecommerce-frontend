import { Link } from "react-router-dom";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import Footer from "../../../layouts/admin/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

function ViewProduct() {
  const [loading, setLoading] = useState(true);
  const [product, setProductlist] = useState([]);

  useEffect(() => {
    let isMounted = true;
    document.title = "View Product";
    axios.get("/api/view-product").then((response) => {
      if (isMounted) {
        if (response.data.status === 200) {
          setProductlist(response.data.products);
        }
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const deleteProduct = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`/api/delete-product/${id}`).then((response) => {
      if (response.data.status === 200) {
        swal("Success", response.data.messages, "success");
        thisClicked.closest("tr").remove();
      } else if (response.data.status === 404) {
        swal("Error", response.data.messages, "error");
        thisClicked.innerText = "Delete";
      }
    });
  };

  let display_Productdata = "";

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    let ProdStatus = "";

    display_Productdata = product.map((item) => {
      if (item.status == "0") {
        ProdStatus = "Shown";
      } else if (item.status == "1") {
        ProdStatus = "Hidden";
      }
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.category.name}</td>
          <td>{item.name}</td>
          <td>{item.selling_price}</td>
          <td>
            <img
              src={`http://localhost:8000/${item.image}`}
              width="50px"
              alt={item.name}
            />
          </td>

          <td>{ProdStatus}</td>

          <td>
            <Link
              to={`/admin/edit-product/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              onClick={(e) => deleteProduct(e, item.id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
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
                  <div className="card-header">
                    <h4>
                      Product List
                      <Link
                        to="/admin/add-product"
                        className="btn btn-primary btn-sm float-end"
                      >
                        Add Product
                      </Link>
                    </h4>
                  </div>
                  <div className="card-body">
                    <table className="table table-bordered table-striped">
                      <thead className="text-center">
                        <tr>
                          <th>ID</th>
                          <th>Category Name</th>
                          <th>Product Name</th>
                          <th>Selling Price</th>
                          <th>Image</th>

                          <th>Status</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {display_Productdata}
                      </tbody>
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

export default ViewProduct;
