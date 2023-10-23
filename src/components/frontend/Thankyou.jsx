import { Link } from "react-router-dom";

const Thankyou = () => {
  return (
    <div className="site-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <span className="icon-check_circle display-3 text-success"></span>
            <h2 className="display-3 text-black">Thank you!</h2>
            <p className="lead mb-5">You order was successfuly completed.</p>
            <p>
              <Link to="/collections" className="btn btn-sm btn-dark rounded-0">
                Back to shop
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
