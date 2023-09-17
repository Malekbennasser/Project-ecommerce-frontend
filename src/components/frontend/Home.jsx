import { Link } from "react-router-dom";

function Home() {
  return (
    // <div classNameName="container-fluid bg-body-tertiary h-500">
    //   <div classNameName="container-lg">
    //     <div classNameName="row p-5">
    //       <h1 classNameName="">Content here</h1>

    //       <div classNameName="col-sm-4">
    //         <p>
    //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
    //           eveniet quis omnis unde eum ea rerum perferendis alias, quas,
    //           deserunt quisquam quod fugit quidem maiores corporis sequi esse
    //           praesentium vel illo atque laudantium dignissimos. Ut voluptatem
    //           perferendis, sed laudantium nemo quas error harum amet corrupti
    //           neque exercitationem minima et ex!
    //         </p>
    //         <button type="button" classNameName="btn btn-dark my-2">
    //           Lorem ipsum
    //         </button>
    //       </div>
    //       <div classNameName="col-sm-8">
    //         <img
    //           src="./src/images/mac.jpeg"
    //           classNameName="img-thumbnail"
    //           alt="..."
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <div
        className="modal fade bg-white"
        id="templatemo_search"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="w-100 pt-1 mb-5 text-right">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form
            action=""
            method="get"
            className="modal-content modal-body border-0 p-0"
          >
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                id="inputModalSearch"
                name="q"
                placeholder="Search ..."
              />
              <button
                type="submit"
                className="input-group-text bg-success text-light"
              >
                <i className="fa fa-fw fa-search text-white"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* banner */}
      <div
        id="template-mo-zay-hero-carousel"
        className="carousel slide "
        data-bs-ride="carousel"
      >
        <ol className="carousel-indicators ">
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            data-bs-slide-to="0"
            className="active bg-dark"
          ></li>
          <li
            className="bg-dark"
            data-bs-target="#template-mo-zay-hero-carousel"
            data-bs-slide-to="1"
          ></li>
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            data-bs-slide-to="2"
            className="bg-dark"
          ></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img
                    className="img-fluid w-100"
                    src={
                      "/src/assets/frontend/assets/img/Banner-Category-Mac.png"
                    }
                    alt="banner"
                  />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left align-self-center">
                    <h1 className="h1 text-black">
                      <b>THE STORE</b> eCommerce
                    </h1>
                    <h3 className="h2">
                      Des PC et Ordinateurs de Haute Performance
                    </h3>
                    <p>
                      votre destination incontournable pour tous vos besoins en
                      matière d&apos;ordinateurs et de PC. Notre boutique en
                      ligne offre une expérience de magasinage exceptionnelle
                      grâce à notre boutique en ligne de qualité supérieure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img
                    className="img-fluid"
                    src={
                      "./src/assets/frontend/assets/img/sp830-iphone12-ios14-2x.png"
                    }
                    alt=""
                  />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left">
                    <h1 className="h1">Découvrez les Meilleurs Smartphones</h1>
                    <h3 className="h2">Expérience mobile exceptionnelle</h3>
                    <p>
                      Chez nous, vous trouverez une sélection soigneusement
                      choisie de produits de haute qualité qui répondront à tous
                      vos besoins. Explorez notre boutique en ligne dès
                      aujourd&apos;hui pour découvrir des articles
                      exceptionnels.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last  w-50">
                  <img
                    className="img-fluid w-50"
                    src={"./src/assets/frontend/assets/img/jbl.png"}
                    alt=""
                  />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left">
                    <h1 className="h1">
                      Découvrez les Meilleurs Accessoires High-Tech
                    </h1>
                    <h3 className="h2">
                      Pour une expérience technologique optimale{" "}
                    </h3>
                    <p>
                      Chez nous, la passion pour la technologie se traduit par
                      une sélection exceptionnelle d&apos;accessoires high-tech.
                      Découvrez notre gamme diversifiée et trouvez les solutions
                      parfaites pour accompagner votre vie numérique.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link
          className="carousel-control-prev text-dark text-decoration-none w-auto ps-3 "
          href="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="prev"
        >
          <i className="fas fa-chevron-left  "></i>
        </Link>
        <Link
          className="carousel-control-next text-dark text-decoration-none w-auto pe-3"
          to="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="next"
        >
          <i className="fas fa-chevron-right"></i>
        </Link>
      </div>

      {/* Categories */}
      <section className="container py-5">
        <div className="row text-center pt-3">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Categories of The Month</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
              architecto?
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-4 p-5 mt-3">
            <Link to="/collections">
              <img
                src="./src/assets/frontend/assets/img/desktop-computer-icon-png-14.png"
                className="rounded-circle img-fluid border"
              />
            </Link>
            <h5 className="text-center mt-3 mb-3">Informatique</h5>
            <p className="text-center">
              <Link to="/collections" className="btn btn-dark">
                Go Shop
              </Link>
            </p>
          </div>
          <div className="col-12 col-md-4 p-5 mt-3">
            <Link to="#">
              <img
                src="./src/assets/frontend/assets/img/category_img_02.jpg"
                className="rounded-circle img-fluid border"
              />
            </Link>
            <h2 className="h5 text-center mt-3 mb-3">Shoes</h2>
            <p className="text-center">
              <Link to="/collections" className="btn btn-dark">
                Go Shop
              </Link>
            </p>
          </div>
          <div className="col-12 col-md-4 p-5 mt-3">
            <Link to="#">
              <img
                src="./src/assets/frontend/assets/img/category_img_03.jpg"
                className="rounded-circle img-fluid border"
              />
            </Link>
            <h2 className="h5 text-center mt-3 mb-3">Accessories</h2>
            <p className="text-center">
              <Link to="/collections" className="btn btn-dark">
                Go Shop
              </Link>
            </p>
          </div>
        </div>
      </section>
      {/* Featured Product */}
      <section className="bg-light">
        <div className="container py-5">
          <div className="row text-center py-3">
            <div className="col-lg-6 m-auto">
              <h1 className="h1">Featured Product</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum,
                voluptates!
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-4 mb-4">
              <div className="card h-100">
                <Link to="">
                  <img
                    src="./src/assets/frontend/assets/img/jbl.png"
                    className="card-img-top 
                    "
                    alt="..."
                  />
                </Link>
                <div className="card-body">
                  <ul className="list-unstyled d-flex justify-content-between">
                    <li>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-muted fa fa-star"></i>
                      <i className="text-muted fa fa-star"></i>
                    </li>
                    <li className="text-muted text-right">$240.00</li>
                  </ul>
                  <Link to="" className="h2 text-decoration-none text-dark">
                    title
                  </Link>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sunt in culpa qui officia deserunt.
                  </p>
                  <p className="text-muted">button</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="card h-100">
                <Link>
                  <img
                    src="./src/assets/frontend/assets/img/feature_prod_02.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                </Link>
                <div className="card-body">
                  <ul className="list-unstyled d-flex justify-content-between">
                    <li>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-muted fa fa-star"></i>
                      <i className="text-muted fa fa-star"></i>
                    </li>
                    <li className="text-muted text-right">$480.00</li>
                  </ul>
                  <Link to="" className="h2 text-decoration-none text-dark">
                    Title
                  </Link>
                  <p className="card-text">
                    Aenean gravida dignissim finibus. Nullam ipsum diam, posuere
                    vitae pharetra sed, commodo ullamcorper.
                  </p>
                  <p className="text-muted">button</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="card h-100">
                <Link to="">
                  <img
                    src="./src/assets/frontend/assets/img/feature_prod_03.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                </Link>
                <div className="card-body">
                  <ul className="list-unstyled d-flex justify-content-between">
                    <li>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-warning fa fa-star"></i>
                    </li>
                    <li className="text-muted text-right">$360.00</li>
                  </ul>
                  <Link to="" className="h2 text-decoration-none text-dark">
                    title
                  </Link>
                  <p className="card-text">
                    Curabitur ac mi sit amet diam luctus porta. Phasellus
                    pulvinar sagittis diam, et scelerisque ipsum lobortis nec.
                  </p>
                  <p className="text-muted">button</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
