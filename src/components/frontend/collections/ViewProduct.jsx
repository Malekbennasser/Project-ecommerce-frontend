import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

function ViewProduct() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const productCount = product.length;
  const navigate = useNavigate();

  const { product_slug } = useParams();
  console.log(product_slug);

  useEffect(() => {
    var isMounted = true;
    axios.get(`/api/fetchproducts/${product_slug}`).then((response) => {
      if (isMounted) {
        if (response.data.status === 200) {
          setProduct(response.data.product_data.product);
          console.log(response.data.product_data.product);
          setCategory(response.data.product_data.category);
          console.log(response.data.product_data.category);
          setLoading(false);
        } else if (response.data.status === 400) {
          swal("Warrning", response.data.message, "");
        } else if (response.data.status === 404) {
          navigate("/collections");
          swal("Warrning", response.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigate, product_slug]);
  let showProductList = "";
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    if (productCount) {
      showProductList = product.map((item, index) => {
        return (
          <div className="col-md-3" key={index}>
            <div className="card">
              <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                <img
                  src={`http://localhost:8000/${item.image}`}
                  className="w-100 "
                  alt={item.name}
                />
              </Link>
              <div className="card-body">
                <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                  <h5>{item.name}</h5>
                </Link>
                <h6>Price: {item.selling_price} €</h6>
              </div>
            </div>
          </div>
        );
      });
    } else {
      showProductList = (
        <div className="col-md-12">
          <h4>No Product Available for {category.name} </h4>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Category / {category.name}</h6>
        </div>
      </div>

      <div className="py-3 ">
        <div className="container">
          <div className="row">{showProductList}</div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
