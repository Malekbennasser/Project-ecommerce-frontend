import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ViewCategory() {
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;

    axios.get("/api/getcategory").then((response) => {
      if (isMounted) {
        if (response.data.status === 200) {
          // console.log(response.data.category);
          setCategory(response.data.category);
          setLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

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
        <div className="col-md-4 py-3" key={index}>
          <div className="card">
            <div className="card-body">
              <Link to={`${item.slug}`}>
                <img src="" className="w-100" alt={item.name} />
              </Link>
              <Link to={`${item.slug}`}>
                <h6>{item.name}</h6>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="bg-body-tertiary">
      <div className="py-3 bg-body-tertiary">
        <div className="container">
          <h6>Category </h6>
        </div>
      </div>

      <div className="py-3 bg-body-tertiary ">
        <div className="container ">
          <div className="row">{showCategoryList}</div>
        </div>
      </div>
    </div>
  );
}

export default ViewCategory;
