import { useState } from "react";
import Footer from "../../../layouts/admin/Footer";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";

import axios from "../../../Axios/AxiosConfig";
import swal from "sweetalert";
import { Link } from "react-router-dom";

function Category() {
  const [categoryInput, setCategoryInput] = useState({
    slug: "",
    name: "",
    descrip: "",
    status: "",
    meta_title: "",
    meta_keyword: "",
    meta_descrip: "",
    error_list: [],
  });
  document.title = "Add Category";
  const handleInput = (e) => {
    e.persist();
    setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value });
  };

  function submitCategory(e) {
    e.preventDefault();

    const data = {
      slug: categoryInput.slug,
      name: categoryInput.name,
      descrip: categoryInput.descrip,
      status: categoryInput.status,
      meta_title: categoryInput.meta_title,
      meta_keyword: categoryInput.meta_keyword,
      meta_descrip: categoryInput.meta_descrip,
    };
    axios.post("/api/category", data).then((response) => {
      if (response.data.status === 200) {
        swal("Success", response.data.messages, "success");
      } else if (response.data.status === 400) {
        setCategoryInput({
          ...categoryInput,
          error_list: response.data.error,
        });
      }
    });
  }

  // let display_errors = [];
  // if (categoryInput.error_list) {
  //   display_errors = [
  //     categoryInput.error_list.slug,
  //     categoryInput.error_list.name,
  //     categoryInput.error_list.meta_title,
  //   ];
  // }

  return (
    <div className="sb-nav-fixed">
      <Navbar />

      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <div className="card mt-4">
                <div className="card-header">
                  <h1 className="mt-4">Add Category</h1>
                  <Link
                    to="/admin/view-category"
                    className="btn btn-primary btn-sm float-end"
                  >
                    View Category
                  </Link>
                  {/* {display_errors.map((item, key) => {
                return (
                  <span className="mb-1" key={key}>
                    {item}
                  </span>
                );
              })} */}
                </div>
                <div className="card-body">
                  <form onSubmit={submitCategory} id="CATEGORY_FORM">
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
                          <span className="text-danger">
                            {categoryInput.error_list.slug}
                          </span>
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
                          <span className="text-danger">
                            {categoryInput.error_list.name}
                          </span>
                        </div>

                        <div className="form-group mb-3">
                          <label>Description</label>
                          <textarea
                            name="descrip"
                            onChange={handleInput}
                            value={categoryInput.descrip}
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
                            {categoryInput.error_list.meta_title}
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
                      Submit
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
  );
}

export default Category;
