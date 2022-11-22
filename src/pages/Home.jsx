import React,{useState, useEffect} from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Events from "./Events";
import Footer from "../components/Footer";


const Home = () => {
   
  return (
    <div className="App">
      <Header />
      <Banner />
      <Events />   
    </div>
  );
};

export default Home;
