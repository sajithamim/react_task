import React from "react";
import { categories } from "../data"; 

const Events = () => {
  return (
    <section className="section-name padding-y-sm">
      <div className="container">
        <header className="section-heading">
          <a href="#" className="btn btn-outline-primary float-right">
            See all
          </a>
          <h3 className="section-title">Popular products</h3>
        </header>
        <div className="row">
          {categories.map((result) => {
            console.log("result", result);
            return (
              <div className="col-md-3">
                <div href="#" className="card card-product-grid">
                  <a href="#" className="img-wrap">
                    {" "}
                    <img src={result.img} />{" "}
                  </a>
                  <figcaption className="info-wrap">
                    <a href="#" className="title">
                      {result.title}
                    </a>
                    <div className="price mt-1">{result.title}</div>
                  </figcaption>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Events;
