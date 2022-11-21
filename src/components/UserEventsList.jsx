import React, { useState, useEffect } from "react";
import { app } from "../pages/fire";

const UserEventsList = ({ eventList, updateEvents }) => {
  return (
    <section className="section-name padding-y-sm">
      <div className="container">
        <header className="section-heading">
          <a href="#" className="btn btn-outline-primary float-right">
            Show More
          </a>
          <h3 className="section-title">Popular products</h3>
        </header>
        <div className="row">
          {eventList.map((result) => {
            return (
              <div className="col-md-6" key={result.id}>
                <div href="#" className="card card-product-grid">
                  <a href="#" className="img-wrap">
                    {" "}
                    <img src={result.url} />{" "}
                  </a>
                  <figcaption className="info-wrap">
                    <div className="row">
                      <div className="col-md-6">
                        <a href="#" className="title">
                          {result.eventName}
                        </a>
                      </div>
                      <div className="col-md-6 text-right"><button onClick={() =>updateEvents(result.id)}>Edit</button></div>
                    </div>

                    <div className="price mt-1">{result.description}</div>
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

export default UserEventsList;
