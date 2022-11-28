import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import Events from "../Events";
import {
  collection,
  getFirestore,
  orderBy,
  getDocs,
  query,
  startAfter,
  limit,
  endBefore,
  limitToLast,
} from "firebase/firestore";
import { app } from "../fire";

const Home = () => {
  const firestore = getFirestore(app);
  const [eventList, setEventList] = useState([]);
  const [lastVisible, setLastvisible] = useState([]);

  //Search Function
  const handleSearch = async (searchValue) => {
    const first = query(collection(firestore, "events"));
    const querySnapshot = await getDocs(first);

    const last = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastvisible(last);

    let list = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    const data = typeof(searchValue) === 'object' ? list.filter(
        (item) =>
          item &&
          item.category &&
          item.category.includes(searchValue.target.value)
      ) : list.filter(
      (item) =>
        item &&
        item.eventName &&
        item.eventName.toLowerCase().includes(searchValue)
    );
    setEventList(data);
  };

  //Fetching the whole events list
  useEffect(() => {
    const getEventsList = async () => {
      const first = query(
        collection(firestore, "events"),
        orderBy("eventName"),
        limit(4)
      );
      const querySnapshot = await getDocs(first);

      const last = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastvisible(last);

      let list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setEventList(list);
    };
    getEventsList();
  }, []);

  const handleNext = async () => {
    const next = query(
      collection(firestore, "events"),
      orderBy("eventName"),
      startAfter(lastVisible),
      limit(4)
    );
    const querySnapshot = await getDocs(next);
    const last = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastvisible(last);
    let list = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    setEventList(list);
  };

  const handlePrevious = async () => {
    const next = query(
      collection(firestore, "events"),
      orderBy("eventName"),
      endBefore(lastVisible),
      limitToLast(1),
      limit(4)
    );
    const querySnapshot = await getDocs(next);
    const last = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastvisible(last);
    let list = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    setEventList(list);
  };

  return (
    <div className="App">
      <Header handleSearch={handleSearch}  />
      <Banner />
      <Events
        eventList={eventList}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  );
};

export default Home;
