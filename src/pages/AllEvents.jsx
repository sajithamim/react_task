import React,{useState, useEffect} from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Events from "../components/Events";
import Footer from "../components/Footer";


const AllEvents = () => {
   
  return (
    <div classname="App">
      <Header />
      <Banner />
      <Events />   
      <Footer />
    </div>
  );
};

export default AllEvents;
