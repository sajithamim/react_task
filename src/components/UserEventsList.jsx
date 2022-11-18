import React, { useState, useEffect } from "react";
import { categories } from "../data";
import {
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { app } from "../pages/fire";

const UserEventsList = () => {
  const firestore = getFirestore(app);
  const [eventList, setEventList] = useState([]);
  useEffect(() => {
    const getEventsList = async () => {
      const querySnapshot = await getDocs(collection(firestore, "events"));
      
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setEventList(doc.data());
      });
    };
    getEventsList();
  }, []);
console.log("eve", eventList)
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

export default UserEventsList;
