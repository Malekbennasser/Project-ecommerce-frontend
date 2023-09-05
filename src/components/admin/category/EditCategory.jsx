import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../../layouts/admin/Footer";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

function EditCategory() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  const [categoryInput, setCategory] = useState({
    slug: "",
    name: "",
    description: "",
    status: "",
    meta_title: "",
    meta_keyword: "",
    meta_descrip: "",
  });
  const { id } = useParams();

  useEffect(() => {
    axios.get(`api/edit-category/${id}`).then((response) => {
      if (response.data.status === 200) {
        const categoryData = response.data.category;
        setCategory({
          slug: categoryData.slug,
          name: categoryData.name,
          description: categoryData.description,
          status: categoryData.status,
          meta_title: categoryData.meta_title,
          meta_keyword: categoryData.meta_keyword,
          meta_descrip: categoryData.meta_descrip,
        });
      } else if (response.data.status === 404) {
        swal("error", response.massages, "error");
        navigate("/admin/view-category");
      }
      setLoading(false);
    });
  }, [id, navigate]);

  const handleInput = (e) => {
    e.persist();
    setCategory({ ...categoryInput, [e.target.name]: e.target.value });
  };

  const updateCategory = (e) => {
    e.preventDefault();
    const data = categoryInput;

    axios.put(`/api/update-category/${id}`, data).then((response) => {
      if (response.data.status === 200) {
        swal("Success", response.data.messages, "success");
        setError([]);
      } else if (response.data.status === 422) {
        swal("All fields are mandetory", "error");
        setError(response.data.errors);
      } else if (response.data.errors === 404) {
        swal("Error", response.data.messages, "error");
        navigate("admin/view-category");
      }
    });
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
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
              <div className="container px-4">
                <div className="card mt-4">
                  <div className="card-header">
                    <h1 className="mt-4">Edit Category</h1>
                    <Link
                      to="/admin/view-category"
                      className="btn btn-primary btn-sm float-end"
                    >
                      BACK
                    </Link>
                  </div>
                  <div className="card-body">
                    <form onSubmit={updateCategory}>
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#home"
                            type="button"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                          >
                            Home
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="seo-tags-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#seo-tags"
                            type="button"
                            role="tab"
                            aria-controls="seo-tags"
                            aria-selected="false"
                          >
                            SEO Tags
                          </button>
                        </li>
                      </ul>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane card-body border fade show active"
                          id="home"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                        >
                          <div className="form-group mb-3">
                            <label>Slug</label>
                            <input
                              type="text"
                              name="slug"
                              onChange={handleInput}
                              value={categoryInput.slug}
                              className="form-control"
                            />
                            <span className="text-danger">{error.slug}</span>
                          </div>

                          <div className="form-group mb-3">
                            <label>Name</label>
                            <input
                              type="text"
                              name="name"
                              onChange={handleInput}
                              value={categoryInput.name}
                              className="form-control"
                            />
                            <span className="text-danger">{error.name}</span>
                          </div>

                          <div className="form-group mb-3">
                            <label>Description</label>
                            <textarea
                              name="description"
                              onChange={handleInput}
                              value={categoryInput.description}
                              className="form-control"
                            ></textarea>
                          </div>
                          <div className="form-group mb-3">
                            <label>Status</label>
                            <input
                              type="checkbox"
                              name="status"
                              onChange={handleInput}
                              value={categoryInput.status}
                            />
                            Status 0=show / 1=hidden
                          </div>
                        </div>
                        <div
                          className="tab-pane card-body border fade"
                          id="seo-tags"
                          role="tabpanel"
                          aria-labelledby="seo-tags-tab"
                        >
                          <div className="form-group mb-3">
                            <label>Meta Title</label>
                            <input
                              type="text"
                              name="meta_title"
                              onChange={handleInput}
                              value={categoryInput.meta_title}
                              className="form-control"
                            />
                            <span className="text-danger">
                              {error.meta_title}
                            </span>
                          </div>
                          <div className="form-group mb-3">
                            <label>Meta Keywords</label>
                            <textarea
                              name="meta_keyword"
                              className="form-control"
                              onChange={handleInput}
                              value={categoryInput.meta_keyword}
                            ></textarea>
                          </div>
                          <div className="form-group mb-3">
                            <label>Meta Description</label>
                            <textarea
                              name="meta_descrip"
                              className="form-control"
                              onChange={handleInput}
                              value={categoryInput.meta_descrip}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-3 px-4 float-end"
                      >
                        Update
                      </button>
                    </form>
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

export default EditCategory;
