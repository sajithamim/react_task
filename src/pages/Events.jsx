import React, { useState, useEffect } from "react";


const Events = ({eventList}) => { 

  return (
    <section className="section-name padding-y-sm">
      <div className="container">
        <header className="section-heading">
          {/* <a href="#" className="btn btn-outline-primary float-right">
           Show
          </a> */}
          <h3 className="section-title">Events</h3>
        </header>
        <div className="row">
          {eventList.map((result) => {
            return (
              <div className="col-md-3" key={result.id}>
                <div href="#" className="card card-product-grid">
                  <p className="img-wrap">
                    {" "}
                    <img src={result.url} />{" "}
                  </p>
                  <figcaption className="info-wrap">
                    <p className="title">
                      {result.eventName}
                    </p>
                    <div className="price mt-1">{result.date}</div>
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
