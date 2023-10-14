import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="bg-black "
      style={{ position: "relative", top: "12rem" }}
      id="tempaltemo_footer"
    >
      <div className="container overflow-hidden text-center ">
        <div className="row justify-content-center justify-content-around ">
          <div className="col-md-4 pt-5">
            <h2 className="h2 text-white border-bottom pb-3 border-light logo">
              THE STORE
            </h2>
            <ul className="list-unstyled text-light footer-link-list">
              <li>
                <i className="fas fa-map-marker-alt fa-fw"></i>
                123, Rue de la République 75001 Paris France
              </li>
              <li>
                <i className="fa fa-phone fa-fw"></i>
                <Link className="text-decoration-none" to="">
                  +33 1 23 45 67 89
                </Link>
              </li>
              <li>
                <i className="fa fa-envelope fa-fw"></i>
                <Link className="text-decoration-none" to="">
                  contact@thestore.fr
                </Link>
              </li>
            </ul>
          </div>

          {/* <div className="col-md-4 pt-5">
            <h2 className="h2 text-light border-bottom pb-3 border-light">
              Products
            </h2>
            <ul className="list-unstyled text-light ">
              <li>
                <Link className="text-decoration-none" to="#"></Link>
              </li>
              <li>
                <Link className="text-decoration-none" to="#"></Link>
              </li>
              <li>
                <Link className="text-decoration-none" to="#"></Link>
              </li>
              <li>
                <Link className="text-decoration-none" to="#"></Link>
              </li>
              <li>
                <Link className="text-decoration-none" to="#"></Link>
              </li>
              <li>
                <Link className="text-decoration-none" to="#"></Link>
              </li>
              <li>
                <Link className="text-decoration-none" to="#"></Link>
              </li>
            </ul>
          </div> */}

          <div className="col-md-3 pt-5">
            <h2 className="h2 text-light border-bottom pb-3 border-light">
              Further Info
            </h2>
            <ul className="list-unstyled text-light footer-link-list">
              <li>
                <Link className="text-decoration-none" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none" to="about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none" to="collections">
                  Collection
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none" to="#">
                  FAQs
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none" to="contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="row text-light mb-4">
          <div className="col-12 mb-3">
            <div className="w-100 my-3 border-top border-light"></div>
          </div>
          <div className="col-auto me-auto">
            {/* <ul className="list-inline text-left footer-icons">
              <li className="list-inline-item border border-light rounded-circle text-center">
                <Link
                  className="text-light text-decoration-none"
                  href="http://facebook.com/"
                >
                  <i className="fab fa-facebook-f fa-lg fa-fw"></i>
                </Link>
              </li>
              <li className="list-inline-item border border-light rounded-circle text-center">
                <Link
                  className="text-light text-decoration-none"
                  href="https://www.instagram.com/"
                >
                  <i className="fab fa-instagram fa-lg fa-fw"></i>
                </Link>
              </li>
              <li className="list-inline-item border border-light rounded-circle text-center">
                <Link
                  className="text-light text-decoration-none"
                  href="https://twitter.com/"
                >
                  <i className="fab fa-twitter fa-lg fa-fw"></i>
                </Link>
              </li>
              <li className="list-inline-item border border-light rounded-circle text-center">
                <Link
                  className="text-light text-decoration-none"
                  href="https://www.linkedin.com/"
                >
                  <i className="fab fa-linkedin fa-lg fa-fw"></i>
                </Link>
              </li>
            </ul> */}
          </div>
          {/* <div className="col-auto">
            <label className="sr-only">Email address</label>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control bg-dark border-light"
                id="subscribeEmail"
                placeholder="Email address"
              />
              <div className="input-group-text btn-success text-light">
                Subscribe
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="w-100 bg-black py-3">
        <div className="container">
          <div className="row pt-2">
            <div className="col-12">
              <p
                className="text-center
               text-light"
              >
                Copyright &copy; 2023 THE STORE
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
