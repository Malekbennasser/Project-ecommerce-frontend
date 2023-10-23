import axios from "../../Axios/AxiosConfig";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Cart() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  let totalCartPrice = 0;

  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      navigate("/");
      swal("Warning", "login to go to Cart Page", "error");
    }
    let isMounted = true;
    axios.get(`/api/cart`).then((response) => {
      console.log(response);
      if (isMounted) {
        if (response.data.status === 200) {
          setCart(response.data.cart);
          console.log(response.data.cart);

          setLoading(false);
        } else if (response.data.status === 401) {
          navigate("/");
          swal("Warrning", response.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleDecrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_Qty: item.product_Qty - (item.product_Qty > 1 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "dec");
  };
  const handleIncrement = (cart_id) => {
    const cartItem = cart.find((item) => item.id === cart_id);
    const productQty = cartItem.product_Qty;
    const productStock = cartItem.product.qty;
    if (productQty < productStock) {
      setCart((cart) =>
        cart.map((item) =>
          cart_id === item.id
            ? {
                ...item,
                product_Qty: item.product_Qty + (item.product_Qty < 10 ? 1 : 0),
              }
            : item
        )
      );
      updateCartQuantity(cart_id, "inc");
    } else {
      swal("Warrning", "The maximum allowed quantity ", "error");
    }
  };

  async function updateCartQuantity(cart_id, scope) {
    await axios
      .put(`/api/cart-updatequantity/${cart_id}/${scope}`)
      .then((response) => {
        if (response.data.status === 200) {
          swal("Success", response.data.message, "success");
        }
      });
  }
  function calculateTotalCartPrice(cart) {
    let totalPrice = 0;
    for (const item of cart) {
      totalPrice += item.product.selling_price * item.product_Qty;
    }
    return totalPrice;
  }

  async function deleteCartItem(e, cart_id) {
    e.preventDefault();

    const thisCliked = e.currentTarget;
    thisCliked.innerText = "Removing";

    await axios.delete(`/api/delete-cartitem/${cart_id}`).then((response) => {
      if (response.data.status === 200) {
        setTimeout(() => {
          swal("Success", response.data.message, "success");
        }, 1000);

        setTimeout(() => {
          thisCliked.closest("tr").remove();

          setCart((prevCart) => prevCart.filter((item) => item.id !== cart_id));

          totalCartPrice = calculateTotalCartPrice(cart);
        }, 300);
      } else if (response.data.status === 404) {
        swal("Error", response.data.message, "error");
        thisCliked.innerText = "Remove";
      } else if (response.data.status === 401) {
        navigate("/");
        swal("Warrning", response.data.message, "error");
      }
    });
  }

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  var cart_HTML = "";
  if (cart.length > 0) {
    cart_HTML = (
      <div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Total Price</th>
                <th className="text-center">Remove</th>
              </tr>
            </thead>

            {cart.map((item) => {
              totalCartPrice = calculateTotalCartPrice(cart);
              return (
                <tbody key={item.id}>
                  <tr>
                    <td width="10%">
                      <img
                        src={`http://localhost:8000/${item.product.image} `}
                        alt={item.product.name}
                        width="50px"
                        height="50px"
                      />
                    </td>
                    <td>{item.product.name} </td>
                    <td width="15%" className="text-center">
                      {item.product.selling_price} €
                    </td>
                    <td width="15%">
                      <div className="input-group">
                        <button
                          onClick={() => handleDecrement(item.id)}
                          type="button"
                          className="input-group-text rounded-0"
                        >
                          -
                        </button>
                        <div className="form-control text-center">
                          {item.product_Qty}
                        </div>

                        <button
                          onClick={() => handleIncrement(item.id)}
                          type="button"
                          className="input-group-text rounded-0"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td width="15%" className="text-center">
                      {item.product.selling_price * item.product_Qty} €
                    </td>
                    <td width="10%" className="text-center">
                      <button
                        type="button"
                        onClick={(e) => deleteCartItem(e, item.id)}
                        className="btn btn-danger btn-sm text-center rounded-0"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-4">
            <div className="card card-body rounded-0 mt-3">
              <h4>
                Sub Total:
                <span className="float-end">{totalCartPrice} €</span>
              </h4>
              <h4>
                Grand Total:
                <span className="float-end">{totalCartPrice} €</span>
              </h4>
              <hr />
              <Link to="/checkout" className="btn btn-dark rounded-0">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    cart_HTML = (
      <div>
        <div className="card card-body h-100 py-5 text-center shadow-sm">
          <h4>Your Shopping Card is Empty</h4>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="py-5 bg-body-tertiary">
          <div className="container">{/* <h6>Home / Card</h6> */}</div>
        </div>

        <div className="py-4   h-100">
          <div className="container h-100">
            <div className="row ">
              <div className="col-md-12">{cart_HTML}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
