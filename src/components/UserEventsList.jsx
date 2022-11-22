import React from "react";
import { app } from "../pages/fire";
import { BsPencil } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";

const UserEventsList = ({ eventList, updateEvents, deleteEvents }) => {
  console.log("eventList", eventList)
  return (
    <section className="section-name padding-y-sm">
      <div className="container">
        <header className="section-heading">
          <a href="/" className="btn btn-outline-primary float-right">
           Home
          </a>
          <h3 className="section-title">Popular products</h3>
        </header>
        <div className="row">
          
          {eventList && eventList.length > 0 ? (eventList.map((result) => {
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
                      <div className="col-md-6 text-right">
                        <BsPencil
                          style={{ fontSize: 20, marginTop: "3px", cursor: "pointer" }}
                          onClick={() => updateEvents(result.id)}
                        />{" "}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">{result.description}</div>
                      <div className="col-md-6 text-right">
                          <AiTwotoneDelete
                            style={{ fontSize: 20, marginTop: "3px" }}
                            onClick={() => deleteEvents(result.id)}
                          />{" "}
                      </div>
                    </div>
                  </figcaption>
                </div>
              </div>
            );
          })) : (<div><p>No Data Found</p></div>)}
        </div>
      </div>
    </section>
  );
};

export default UserEventsList;
