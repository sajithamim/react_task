import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Events from "./Events";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { app } from "../pages/fire";

const Home = () => {
  const firestore = getFirestore(app);
  const [eventList, setEventList] = useState([]);
  const [searchEvents, setSearchEvents] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);

  //Fetching the whole events list
  useEffect(() => {
    const getEventsList = async () => {
      onSnapshot(collection(firestore, "events"), (snapshot) => {
        let list = [];
        var lastVisible = snapshot.docs[snapshot.docs.length - 1];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setEventList(list);
      });
    };
    getEventsList();
  }, []);

  const handleSearch = (searchValue) => {
    setSearchEvents(searchValue);
  };

  useEffect(() => {
    searchItem();
  }, [searchEvents]);

  const searchItem = () => {
    const data = eventList.filter(
      (item) =>
        item &&
        item.eventName &&
        item.eventName.toLowerCase().includes(searchEvents)
    );
    setFilteredResult(data);
  };
  
  return (
    <div className="App">
      <Header handleSearch={handleSearch} />
      <Banner />
      <Events eventList={filteredResult ? filteredResult : eventList} />
    </div>
  );
};

export default Home;
