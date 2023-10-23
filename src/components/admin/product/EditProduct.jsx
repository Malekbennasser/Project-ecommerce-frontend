import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../../layouts/admin/Footer";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";

function EditProduct() {
  const [loading, setLoading] = useState(true);
  const [categorylist, setCategorylist] = useState([]);
  const [productInput, setProduct] = useState({
    category_id: "",
    slug: "",
    name: "",
    description: "",

    meta_title: "",
    meta_keyword: "",
    meta_descrip: "",

    selling_price: "",
    original_price: "",
    qty: "",
    brand: "",
  });

  const navigate = useNavigate();
  const [picture, setPicture] = useState([]);
  const [allcheckbox, setCheckboxes] = useState([]);
  const [errorlist, setError] = useState([]);

  const { id } = useParams();
  const handleInput = (e) => {
    e.persist();
    setProduct({ ...productInput, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  const handleCheckbox = (e) => {
    e.persist();
    setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    axios.get("/api/all-category").then((response) => {
      if (response.data.status === 200) {
        setCategorylist(response.data.category);
      }
    });

    axios.get(`/api/edit-product/${id}`).then((response) => {
      if (response.data.status === 200) {
        //   console.log(response.data.product);
        setProduct(response.data.product);
        setCheckboxes(allcheckbox);
      } else if (response.data.status === 404) {
        swal("error", response.data.massages, "error");
        navigate("/admin/view-product");
      }

      setLoading(false);
    });
  }, [navigate, allcheckbox, id]);

  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", picture.image);
    formData.append("category_id", productInput.category_id);
    formData.append("slug", productInput.slug);
    formData.append("name", productInput.name);
    formData.append("description", productInput.description);

    formData.append("meta_title", productInput.meta_title);
    formData.append("meta_keyword", productInput.meta_keyword);
    formData.append("meta_descrip", productInput.meta_descrip);

    formData.append("selling_price", productInput.selling_price);
    formData.append("original_price", productInput.original_price);
    formData.append("qty", productInput.qty);
    formData.append("brand", productInput.brand);
    formData.append("featured", allcheckbox.featured ? "1" : "0");
    formData.append("popular", allcheckbox.popular ? "1" : "0");
    formData.append("status", allcheckbox.status ? "1" : "0");
    console.log(formData);
    let axiosConfig = {
      headers: {
        method: "put",
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    await axios
      .post(`/api/update-product/${id}`, formData, axiosConfig)
      .then((response) => {
        if (response.data.status === 200) {
          swal("Success", response.data.message, "success");
          console.log(allcheckbox);

          setError([]);
        } else if (response.data.status === 422) {
          swal("all Fields are mandetory", "", "error");
          setError(response.data.error);
        } else if (response.data.status === 404) {
          swal("Error", response.data.message, "error");
          navigate("/admin/view-product");
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
    <div>
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
                    <h4>
                      Edit Product
                      <Link
                        to="/admin/view-product"
                        className="btn btn-primary btn-sm float-end"
                      >
                        View Product
                      </Link>
                    </h4>
                  </div>
                  <div className="card-body">
                    <form
                      onSubmit={updateProduct}
                      encType="multipart/form-data"
                    >
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#home-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="home-tab-pane"
                            aria-selected="true"
                          >
                            Home
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="seotags-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#seotags"
                            type="button"
                            role="tab"
                            aria-controls="seotags"
                            aria-selected="false"
                          >
                            SEO Tags
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="otherdetails-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#otherdetails"
                            type="button"
                            role="tab"
                            aria-controls="otherdetails"
                            aria-selected="false"
                          >
                            Other Details
                          </button>
                        </li>
                      </ul>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane card-body border fade show active"
                          id="home-tab-pane"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                        >
                          <div className="form-group mb-3">
                            <label>Select Category</label>

                            <select
                              name="category_id"
                              onChange={handleInput}
                              value={productInput.category_id}
                              className="form-control"
                            >
                              <option>Select Category</option>
                              {categorylist.map((item) => {
                                return (
                                  <option value={item.id} key={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                            <small className="text-danger">
                              {errorlist.category_id}
                            </small>
                          </div>
                          <div className="form-group mb-3">
                            <label>Slug</label>
                            <input
                              type="text"
                              onChange={handleInput}
                              value={productInput.slug}
                              name="slug"
                              className="form-control"
                            />
                            <small className="text-danger">
                              {errorlist.slug}
                            </small>
                          </div>
                          <div className="form-group mb-3">
                            <label>Name</label>
                            <input
                              type="text"
                              onChange={handleInput}
                              value={productInput.name}
                              name="name"
                              className="form-control"
                            />
                            <small className="text-danger">
                              {errorlist.name}
                            </small>
                          </div>
                          <div className="form-group mb-3">
                            <label>Description</label>
                            <textarea
                              type="text"
                              onChange={handleInput}
                              value={productInput.description || ""}
                              name="description"
                              className="form-control"
                            ></textarea>
                          </div>
                        </div>
                        <div
                          className="tab-pane card-body border fade"
                          id="seotags"
                          role="tabpanel"
                          aria-labelledby="seotags-tab"
                        >
                          <div className="form-group mb-3">
                            <label>Meta Title</label>
                            <input
                              type="text"
                              onChange={handleInput}
                              value={productInput.meta_title}
                              name="meta_title"
                              className="form-control"
                            />
                            <small className="text-danger">
                              {errorlist.meta_title}
                            </small>
                          </div>
                          <div className="form-group mb-3">
                            <label>Meta Keyword</label>
                            <input
                              type="text"
                              onChange={handleInput}
                              value={productInput.meta_keyword}
                              name="meta_keyword"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group mb-3">
                            <label>Meta Description</label>
                            <textarea
                              type="text"
                              onChange={handleInput}
                              value={productInput.meta_descrip || ""}
                              name="meta_descrip"
                              className="form-control"
                            ></textarea>
                          </div>
                        </div>
                        <div
                          className="tab-pane card-body border fade"
                          id="otherdetails"
                          role="tabpanel"
                          aria-labelledby="otherdetails-tab"
                        >
                          <div className="row">
                            <div className="col-md-4 form-group mb-3">
                              <label>Selling Price</label>
                              <input
                                type="text"
                                onChange={handleInput}
                                value={productInput.selling_price}
                                name="selling_price"
                                className="form-control"
                              />
                              <small className="text-danger">
                                {errorlist.selling_price}
                              </small>
                            </div>
                            <div className="col-md-4 form-group mb-3">
                              <label>Original Price</label>
                              <input
                                type="text"
                                onChange={handleInput}
                                value={productInput.original_price}
                                name="original_price"
                                className="form-control"
                              />
                              <small className="text-danger">
                                {errorlist.original_price}
                              </small>
                            </div>
                            <div className="col-md-4 form-group mb-3">
                              <label>Quantity</label>
                              <input
                                type="text"
                                onChange={handleInput}
                                value={productInput.qty}
                                name="qty"
                                className="form-control"
                              />
                              <small className="text-danger">
                                {errorlist.qty}
                              </small>
                            </div>
                            <div className="col-md-4 form-group mb-3">
                              <label>Brand</label>
                              <input
                                type="text"
                                onChange={handleInput}
                                value={productInput.brand}
                                name="brand"
                                className="form-control"
                              />
                              <small className="text-danger">
                                {errorlist.brand}
                              </small>
                            </div>
                            <div className="col-md-8 form-group mb-3">
                              <label>Image</label>
                              <input
                                type="file"
                                onChange={handleImage}
                                name="image"
                                className="form-control"
                              />
                              <img
                                src={`http://localhost:8000/${productInput.image}`}
                                width={50}
                                className="mt-3"
                              />
                              <small className="text-danger">
                                {errorlist.image}
                              </small>
                            </div>

                            <div className="col-md-4 form-group mb-3">
                              <label>Featured (checked=shown)</label>
                              <input
                                type="checkbox"
                                onChange={handleCheckbox}
                                defaultChecked={
                                  allcheckbox.featured === 1 ? true : false
                                }
                                name="featured"
                                className="w-50 h-50"
                              />
                            </div>

                            <div className="col-md-4 form-group mb-3">
                              <label>Popular (checked=shown)</label>
                              <input
                                type="checkbox"
                                onChange={handleCheckbox}
                                defaultChecked={
                                  allcheckbox.popular === 1 ? true : false
                                }
                                name="popular"
                                className="w-50 h-50"
                              />
                            </div>
                            <div className="col-md-4 form-group mb-3">
                              <label>Status (checked=Hidden)</label>
                              <input
                                type="checkbox"
                                onChange={handleCheckbox}
                                defaultChecked={
                                  allcheckbox.status === 1 ? true : false
                                }
                                name="status"
                                className="w-50 h-50"
                              />
                            </div>
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
    </div>
  );
}

export default EditProduct;
