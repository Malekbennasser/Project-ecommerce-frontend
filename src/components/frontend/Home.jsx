import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

function Home() {
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const { product_slug } = useParams();
  useEffect(() => {
    let isMounted = true;

    axios.get("/api/getcategory").then((response) => {
      console.log("category", response);
      if (isMounted) {
        if (response.data.status === 200) {
          // console.log(response.data.category);
          setCategory(response.data.category);
          // setProduct(response.data.category);
          setLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    var isMounted = true;
    axios.get(`/api/getproduct`).then((response) => {
      console.log("product", response);
      if (isMounted) {
        if (response.data.status === 200) {
          setProduct(response.data.products);
          // console.log(response.data.product_data.product.brand);
          // setCategory(response.data.products);
          console.log("product", response.data.products);
          setLoading(false);
        } else if (response.data.status === 400) {
          swal("Warning", response.data.message, "");
        } else if (response.data.status === 404) {
          navigate("/");
          swal("Warning", response.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigate, product_slug]);

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    var showCategoryList = "";
    showCategoryList = category.map((item, index) => {
      return (
        <div className="col-md-4 py-3 " key={index}>
          <div className="card rounded-0 border border-0 btn btn-outline-light">
            {/* <Link
              className="text-decoration-none text-dark"
              to={`${item.slug}`}
            ></Link> */}
            <div className="card-body text-center">
              <Link
                className="text-decoration-none text-dark"
                to={`/collections/${item.slug}`}
              >
                {/* <img src="" className="w-100" alt={item.name} /> */}{" "}
                <h5>{item.name}</h5>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }
  var showProductList = "";
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    showProductList = product.map((item, id) => {
      console.log("product item", item);
      if (item.featured) {
        return (
          <div className="col-md-4" key={id}>
            <div className="card mb-3 product-wap rounded-0">
              <div
                className="card rounded-0"
                style={{ width: "100%", height: "300px" }}
              >
                {/* <span className="badge bg-danger" value="featured">
                  {item.featured}
                </span> */}
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
                  to={`collections/${item.category.slug}/${item.slug}`}
                  className="btn btn-dark text-white rounded-0 float-end"
                >
                  Voir Produit
                </Link>
              </div>
            </div>
          </div>
        );
      }
    });
  }
  // {
  //   showProductList = (
  //     <div className="col-md-12">
  //       <h4>No Products Available for {product.name}</h4>
  //     </div>
  //   );
  // }

  return (
    <div>
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
          to="#template-mo-zay-hero-carousel"
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
            <h1 className="h1">Categories</h1>
            <p>
              Découvrez nos vastes catégories de produits, conçues pour
              satisfaire toutes vos préférences et besoins.
            </p>
          </div>
        </div>
        <div className="row">
          {/* <ViewCategory /> */}

          <div className="bg-body-tertiary">
            <div className="py-3 bg-body-tertiary">
              <div className="container">
                <h6> </h6>
              </div>
            </div>

            <div className="py-3 bg-body-tertiary ">
              <div className="container ">
                <div className="row">{showCategoryList}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Product */}
      <section className="bg-light">
        <div className="container py-5">
          <div className="row text-center py-3">
            <div className="col-lg-6 m-auto">
              <h1 className="h1">Produit en Vedette</h1>
              <p>
                Explorez notre collection exclusive de produits innovants,
                conçus pour répondre à tous vos besoins avec style et efficacité
              </p>
            </div>
          </div>
          <div className="row">
            <div className="row">{showProductList}</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
