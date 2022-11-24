import React from "react";

const EventList = (result) => {
  return (
    <div className="col-md-3" key={result && result.result.id}>
      <div href="#" className="card card-product-grid">
        <p className="img-wrap">
          {" "}
          <img src={result && result.result.url} />{" "}
        </p>
        <figcaption className="info-wrap">
          <p className="title">{result && result.result.eventName}</p>
          <div className="price mt-1">{result && result.result.date}</div>
        </figcaption>
      </div>
    </div>
  );
};

export default EventList;
