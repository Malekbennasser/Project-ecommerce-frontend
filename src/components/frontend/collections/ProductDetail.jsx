import axios from "../../../Axios/AxiosConfig";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

function ProductDetail() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const { product_slug } = useParams();
  const { category_slug } = useParams();
  console.log(product_slug);
  console.log(category_slug);

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`/api/viewproductdetail/${category_slug}/${product_slug}`)
      .then((response) => {
        if (isMounted) {
          if (response.data.status === 200) {
            setProduct(response.data.product_data.product);
            console.log(response.data.product_data.product);

            setLoading(false);
          } else if (response.data.status === 404) {
            navigate("/collections");
            swal("Warrning", response.data.message, "error");
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, [navigate, product_slug, category_slug]);

  //quantity increment/decrement

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };

  const submitAddtocart = (e) => {
    e.preventDefault();

    const data = {
      product_id: product.id,
      product_qty: quantity,
    };

    axios.post("/api/add-to-cart", data).then((response) => {
      if (response.data.status === 201) {
        swal("Success", response.data.message, "success");
      } else if (response.data.status === 409) {
        swal("Success", response.data.message, "warning");
      } else if (response.data.status === 401) {
        swal("Error", response.data.message, "error");
      } else if (response.data.status === 404) {
        swal("Warning", response.data.message, "warning");
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
  } else {
    var avail_stock = "";

    if (product.qty > 0) {
      avail_stock = (
        <div>
          <label className="btn-sm btn success px-4 mt-2">in Stock</label>
          <div className="row">
            <div className="col-md-3 mt-3">
              <div className="input-group">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="input-group-text rounded-0"
                >
                  -
                </button>
                <div className="form-control text-center">{quantity}</div>

                <button
                  type="button"
                  onClick={handleIncrement}
                  className="input-group-text rounded-0"
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <button
                type="button"
                className="btn btn-dark rounded-0 w-100"
                onClick={submitAddtocart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      avail_stock = (
        <div>
          <label className="btn btn-sm btn-danger px-4 mt-2">
            out of Stock
          </label>
        </div>
      );
    }
  }
  return (
    <div>
      <div className="py-3  bg-body-tertiary">
        <div className="container">
          <h6>
            Category /{product.category.name}/{product.name}
          </h6>
        </div>
      </div>

      <div className="py-3 ">
        <div className="container">
          <div className="row">
            <div className="col-md-4 border-end">
              <img
                src={`http://localhost:8000/${product.image}`}
                alt={product.name}
                className="w-100"
              />
            </div>
            <div className="col-md-8">
              <h4>
                {product.name}
                <span className="float-end badget btn btn-sm btn-dark rounded-0 Badge-pil">
                  {product.brand}
                </span>
              </h4>
              <p>{product.description}</p>
              <h4 className="mb-1">
                Price:{product.selling_price} €
                <s className="ms-2"> Price:{product.original_price} €</s>
              </h4>
              <div>Stock{avail_stock}</div>
              {/* <button type="button" className="btn btn-danger mt-3">
                Add to Wishlist
              </button> */}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
