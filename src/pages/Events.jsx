import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { app } from "../pages/fire";

const Events = () => {
  const firestore = getFirestore(app);
  const [eventList, setEventList] = useState([]);
  useEffect(() => {
    const getEventsList = async () => {
      onSnapshot(collection(firestore, "events"), (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({id: doc.id, ...doc.data()})
        })
        setEventList(list)
      })
    };
    getEventsList();
  }, []);
  
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
          {eventList.map((result) => {
            return (
              <div className="col-md-3">
                <div href="#" className="card card-product-grid">
                  <a href="#" className="img-wrap">
                    {" "}
                    <img src={result.url} />{" "}
                  </a>
                  <figcaption className="info-wrap">
                    <a href="#" className="title">
                      {result.eventName}
                    </a>
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

export default Events;
