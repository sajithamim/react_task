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
  const [searchEvents, setSearchEvents] = useState(null);
  const [filteredResult, setFilteredResult] = useState([]);

  const handleSearch = (searchValue) => {
    setSearchEvents(searchValue);
  };

  useEffect(() => {
    const data = eventList.filter(
      (item) =>
        item &&
        item.eventName &&
        item.eventName.toLowerCase().includes(searchEvents)
    );
    setFilteredResult(data);
  }, [searchEvents]);
 
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


  return (
    <div className="App">
      <Header handleSearch={handleSearch} />
      <Banner />
      <Events eventList={eventList} filteredResult={filteredResult}/>
    </div>
  );
};

export default Home;
