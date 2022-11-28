import React from "react";
import EventList from "../components/EventList";
import "./css/UserEvent.css";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";

const Events = ({ eventList, handleNext, handlePrevious }) => {
  return (
    <>
      <section className="section-name padding-y-sm">
        <div className="container">
          <header className="section-heading">
            <h3 className="section-title">Events</h3>
          </header>
          <div className="row">
            {eventList && eventList.map((item) => {
              return <EventList result={item} />;
            })}
          </div>
          {eventList && eventList.length > 0 ? (
              <div className="pagBtndiv">
              <FcPrevious
                className="btn btn-light pageBtnNext"
                onClick={() => handlePrevious()}
              />
              <FcNext  className=" btn btn-light pageBtnNext"
                onClick={() => handleNext()}/>
            </div>
            ) : ""}
        </div>
      </section>
    </>
  );
};

export default Events;
