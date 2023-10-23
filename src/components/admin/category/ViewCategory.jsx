import { Link } from "react-router-dom";
import Footer from "../../../layouts/admin/Footer";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import { useEffect, useState } from "react";
// import axios from "axios";
import axios from "../../../Axios/AxiosConfig";
import swal from "sweetalert";

function ViewCategory() {
  const [loading, setLoading] = useState(true);
  const [categorylist, setCategorylist] = useState([]);

  useEffect(() => {
    document.title = "View Category";
    axios.get("/api/view-category").then((response) => {
      //   console.log(response.data.category);
      if (response.data.status === 200) {
        setCategorylist(response.data.category);
      }
      setLoading(false);
    });
  }, []);

  const deleteCategory = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`/api/delete-category/${id}`).then((response) => {
      if (response.data.status === 200) {
        swal("Success", response.data.messages, "success");
        thisClicked.closest("tr").remove();
      } else if (response.data.status === 404) {
        swal("Error", response.data.messages, "error");
        thisClicked.innerText = "Delete";
      }
    });
  };

  let viewcategory_HTMLTABLE = "";
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    viewcategory_HTMLTABLE = categorylist.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.status}</td>
          <td>
            <Link
              to={`/admin/edit-category/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              onClick={(e) => deleteCategory(e, item.id)}
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
                      Category List
                      <Link
                        to="/admin/category"
                        className="btn btn-primary btn-sm float-end"
                      >
                        Add Category
                      </Link>
                    </h4>
                  </div>
                  <div className="card-body">
                    <table className="table table-bordered table-striped">
                      <thead className="text-center">
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {viewcategory_HTMLTABLE}
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

export default ViewCategory;
