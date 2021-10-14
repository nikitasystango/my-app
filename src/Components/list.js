import React, { useState } from "react";
import history from "../utils/history";
import axios from "axios";

const List = (props) => {
  const [mainArr, setMainArr] = useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let response = null;
    try {
      const url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline`;
      response = await axios.get(url);
      setMainArr(response && response.data ? response.data : []);
    } catch (error) {}
  };

  return (
    <>
      <div className="container">
        <span
          onClick={() => {
            history.push("/");
          }}
          className="d-flex cursor-pointer"
        >
          <img
            src="https://img.icons8.com/fluency/48/000000/circled-left-2.png"
            alt="Products"
          />{" "}
          <h1>Back</h1>
        </span>
        <h1>My Products</h1>
        <div>
          <div className="overlay" />
          <div className="row justify-content-between">
            {mainArr && mainArr.length
              ? mainArr.map((list, index) => {
                  return (
                    <div className="column">
                      <div
                        className="card"
                        style={{ width: "250px" }}
                        key={index}
                      >
                        <img
                          class="card-img-top"
                          src={list.image_link}
                          alt="Card"
                          style={{ width: "100%" }}
                        ></img>
                        <div className="card-body">
                          <h4 className="card-title">
                            {list.name.substring(0, 30)}
                          </h4>
                          <p class="price">${list.price}</p>
                          <p className="card-text">
                            {list.description.substring(0, 150)}
                          </p>
                          <a
                            href={list.product_link}
                            className="btn btn-primary"
                          >
                            See Product Detail
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })
              : "No Results Found"}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
