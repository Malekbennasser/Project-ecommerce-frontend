// import axios from "axios";
import axios from "../../../Axios/AxiosConfig";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

function ViewProduct() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  const [brandFilter, setBrandFilter] = useState("All");
  const [slugFilter, setSlugFilter] = useState("All");

  const navigate = useNavigate();
  const { product_slug } = useParams();
  console.log(product_slug);

  useEffect(() => {
    var isMounted = true;
    axios.get(`/api/fetchproducts/${product_slug}`).then((response) => {
      if (isMounted) {
        if (response.data.status === 200) {
          setProduct(response.data.product_data.product);
          console.log(response.data.product_data.product.brand);
          setCategory(response.data.product_data.category);
          console.log(response.data.product_data.category);
          setLoading(false);
        } else if (response.data.status === 400) {
          swal("Warning", response.data.message, "");
        } else if (response.data.status === 404) {
          navigate("/collections");
          swal("Warning", response.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigate, product_slug]);

  const uniqueBrands = [...new Set(product.map((item) => item.brand))];
  const uniqueSlugs = [...new Set(product.map((item) => item.slug))];

  let filteredProducts = product;

  if (brandFilter !== "All") {
    filteredProducts = filteredProducts.filter((item) => {
      // Replace 'brand' with the property you want to filter by (e.g., item.brand)
      console.log("filter", filteredProducts);
      return item.brand === brandFilter;
    });
  }

  if (slugFilter !== "All") {
    filteredProducts = filteredProducts.filter((item) => {
      // Replace 'slug' with the property you want to filter by (e.g., item.slug)
      return item.slug === slugFilter;
    });
  }

  let showProductList = "";

  if (loading) {
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  } else {
    if (filteredProducts.length > 0) {
      showProductList = filteredProducts.map((item, index) => {
        return (
          <div className="col-md-4" key={index}>
            <div className="card mb-3 product-wap rounded-0">
              <div
                className="card rounded-0"
                style={{ width: "100%", height: "300px" }}
              >
                <img
                  className="card-img rounded-0 img-fluid"
                  src={`http://localhost:8000/${item.image}`}
                  style={{ objectFit: "cover", height: "100%" }}
                  alt={item.name}
                />
                <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center"></div>
              </div>

              <div className="card-body">
                {item.featured === 1 ? (
                  <span className="badge bg-danger float-end">Featured</span>
                ) : null}
                <Link to="" className="h3 text-decoration-none">
                  {item.name}
                </Link>

                <p className="text-center mb-0">{item.selling_price} €</p>
                <Link
                  to={`/collections/${item.category.slug}/${item.slug}`}
                  className="btn btn-dark text-white rounded-0 float-end"
                >
                  Voir Produit
                </Link>
              </div>
            </div>
          </div>
        );
      });
    } else {
      showProductList = (
        <div className="col-md-12">
          <h4>No Products Available for {category.name}</h4>
        </div>
      );
    }
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col">
          <ul className="d-flex float-end list-inline shop-top-menu pb-3 pt-1">
            {/* <li className="list-inline-item">
              <Link
                className="h3 text-dark text-decoration-none mr-3"
                to="/collections/"
              >
                All
              </Link>
            </li> */}

            <div className="d-flex"></div>
            <div className="d-flex">
              <select
                className="form-control  rounded-0"
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
              >
                <option value="All">All Brands</option>
                {uniqueBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
                {/* Add other brand options as needed */}
              </select>
            </div>
            <div className="d-flex">
              <select
                className="form-control rounded-0"
                value={slugFilter}
                onChange={(e) => setSlugFilter(e.target.value)}
              >
                <option value="All">All Category</option>
                {uniqueSlugs.map((slug) => (
                  <option key={slug} value={slug}>
                    {slug}
                  </option>
                ))}
                {/* Add other slug options as needed */}
              </select>
            </div>
          </ul>
        </div>

        <div className="row">{showProductList}</div>
      </div>
    </div>
  );
}

export default ViewProduct;
