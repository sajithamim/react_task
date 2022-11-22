import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  limit,
  query,
orderBy,
startAt,
} from "firebase/firestore";
import { app } from "../pages/fire";

const Events = () => {
  const firestore = getFirestore(app);
  const [eventList, setEventList] = useState([]);

  //Fetching the whole events list
  useEffect(() => {
    const getEventsList = async () => {
      onSnapshot(collection(firestore, "events"), (snapshot) => {
        let list = [];
        var lastVisible = snapshot.docs[snapshot.docs.length-1];
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
