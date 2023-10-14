// import axios from "axios";
import axios from "../../Axios/AxiosConfig";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Checkout() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  let totalCartPrice = 0;

  if (!localStorage.getItem("auth_token")) {
    navigate("/");
    swal("Warning", "login to go to Cart Page", "error");
  }

  const [formData, setFormData] = useState({
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
  });
  const [checkoutInput, setCheckinput] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const [error, setError] = useState([]);

  useEffect(() => {
    let isMounted = true;
    axios.get(`/api/cart/`).then((response) => {
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

  const handleInput = (e) => {
    e.persist();
    setCheckinput({ ...checkoutInput, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const Orderinfo_data = {
    firstname: checkoutInput.firstname,
    lastname: checkoutInput.lastname,
    phone: checkoutInput.phone,
    email: checkoutInput.email,
    address: checkoutInput.address,
    city: checkoutInput.city,
    state: checkoutInput.state,
    zipcode: checkoutInput.zipcode,

    payment_mode: "Paid by Stripe",
    payment_id: "",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/place-order", Orderinfo_data).then((response) => {
        console.log();
        if (response.data.status === 200) {
          // swal("Order Placed Successfully", response.data.message, "success");
          setError([]);
          navigate("/thank-you");
        } else if (response.data.status === 422) {
          swal("All fields are mandatory", "success");
          setError(response.data.errors);
        }
      });
    } catch (error) {
      console.error("Erreur inattendue :", error);
    }
    try {
      const dataToSend = {
        ...formData,
        totalCartPrice: totalCartPrice,
        orderId: cart[0].id,
      };
      console.log("data to send", dataToSend);

      await axios.post(`/api/test`, dataToSend).then((response) => {
        const paymentId = response.data.paymentIntent.payment_id; //
        console.log(response.data.paymentIntent);
        if (response.data.status === 200) {
          console.log("id", paymentId); // Extract the payment ID
          Orderinfo_data.payment_id = paymentId;
          swal("Order Placed Successfully", paymentId, "success");
          console.log("Paiement réussi :", paymentId);
          navigate("/thank-you");
        } else {
          // Traitez les erreurs renvoyées par le serveur, par exemple, affichez-les à l'utilisateur.
          console.error("Erreur de paiement :", response.data.errors);
        }
      });
    } catch (error) {
      console.error("Erreur inattendue :", error);
    }
  };

  const submitOrder = (e, payment_mode) => {
    e.preventDefault();

    const data = {
      firstname: checkoutInput.firstname,
      lastname: checkoutInput.lastname,
      phone: checkoutInput.phone,
      email: checkoutInput.email,
      address: checkoutInput.address,
      city: checkoutInput.city,
      state: checkoutInput.state,
      zipcode: checkoutInput.zipcode,
      payment_mode: payment_mode,
      payment_id: "",
    };

    switch (payment_mode) {
      case "cod":
        axios.post("/api/place-order", data).then((response) => {
          if (response.data.status === 200) {
            swal("Order Placed Successfully", response.data.message, "success");
            setError([]);
            navigate("/than-you");
          } else if (response.data.status === 422) {
            swal("All fields are mandetory", "success");
            setError(response.data.errors);
          }
        });

        break;

      case "payonline":
        axios.post("/api/validate-order", data).then((response) => {
          if (response.data.status === 200) {
            setError([]);
            let myModal = new window.bootstrap.Modal(
              document.getElementById("payOnlineModal")
            );
            myModal.show();
          } else if (response.data.status === 422) {
            swal("All fields are mandetory", "success");
            setError(response.data.errors);
          }
        });
        break;

      default:
        break;
    }
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

  let checkout_HTML = "";
  if (cart.length > 0) {
    checkout_HTML = (
      <div>
        <div className="row">
          <div className="col-md-7">
            <div className="card">
              <div className="card-header">
                <h4>Basic Information</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>First name</label>
                      <input
                        onChange={handleInput}
                        value={checkoutInput.firstname}
                        type="text"
                        name="firstname"
                        className="form-control"
                      />
                      <small className="text-danger">{error.firstname}</small>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Last name</label>
                      <input
                        onChange={handleInput}
                        value={checkoutInput.lastname}
                        type="text"
                        name="lastname"
                        className="form-control"
                      />
                      <small className="text-danger">{error.lastname}</small>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Phone number</label>
                      <input
                        onChange={handleInput}
                        value={checkoutInput.phone}
                        type="text"
                        name="phone"
                        className="form-control"
                      />
                      <small className="text-danger">{error.phone}</small>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Email Address</label>
                      <input
                        onChange={handleInput}
                        value={checkoutInput.email}
                        type="text"
                        name="email"
                        className="form-control"
                      />
                      <small className="text-danger">{error.email}</small>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group mb-3">
                      <label>Full Address</label>
                      <textarea
                        onChange={handleInput}
                        value={checkoutInput.address}
                        rows="3"
                        name="address"
                        className="form-control"
                      ></textarea>
                      <small className="text-danger">{error.address}</small>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>City</label>
                      <input
                        onChange={handleInput}
                        value={checkoutInput.city}
                        type="text"
                        name="city"
                        className="form-control"
                      />
                      <small className="text-danger">{error.city}</small>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>State</label>
                      <input
                        onChange={handleInput}
                        value={checkoutInput.state}
                        type="text"
                        name="state"
                        className="form-control"
                      />
                      <small className="text-danger">{error.state}</small>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>Zip Code</label>
                      <input
                        onChange={handleInput}
                        value={checkoutInput.zipcode}
                        type="text"
                        name="zipcode"
                        className="form-control"
                      />
                      <small className="text-danger">{error.zipcode}</small>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group text-end">
                      <button
                        type="button"
                        onClick={(e) => submitOrder(e, "cod")}
                        className="btn btn-primary mx-1"
                      >
                        Place Order
                      </button>
                      <button
                        type="button"
                        onClick={(e) => submitOrder(e, "payonline")}
                        className="btn btn-primary mx-1"
                      >
                        Pay Online
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <table className="table table-bordered">
              <thead className="text-center">
                <tr>
                  <th width="50%">Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {cart.map((item, index) => {
                  totalCartPrice +=
                    item.product.selling_price * item.product_Qty;
                  return (
                    <tr key={index}>
                      <td>{item.product.name}</td>
                      <td>{item.product.selling_price} €</td>
                      <td>{item.product_Qty}</td>
                      <td>{item.product.selling_price * item.product_Qty} €</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="2" className="text-end fw-bold">
                    Grand Total
                  </td>
                  <td colSpan="2" className="text-end fw-bold">
                    {totalCartPrice} €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    checkout_HTML = (
      <div>
        <div className="card card-body py-5 text-center shadow-sm">
          <h4>Your Shopping Card is Empty. You are in Checkout Page </h4>
        </div>
      </div>
    );
  }
  /* console.log("Adem", cart[0].id); */
  return (
    <>
      <div
        className="modal fade"
        id="payOnlineModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                ONline Payment Mode
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="number" className="form-label">
                    Numéro de carte:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exp_month" className="form-label">
                    Mois expiration:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exp_month"
                    name="exp_month"
                    value={formData.exp_month}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exp_year" className="form-label">
                    Année expiration:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exp_year"
                    name="exp_year"
                    value={formData.exp_year}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cvc" className="form-label">
                    CVC:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="cvc"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-dark rounded-0 w-100 my-5"
                >
                  Payer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="py-3 bg-body-tertiary">
        <div className="container">
          <h6>/ checkout</h6>
        </div>
      </div>
      <div className="py-3 ">
        <div className="container">
          {checkout_HTML}
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
