import React, { useEffect, useState } from "react";
import { app } from "./fire";
import { BsPencil } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import "./css/UserEvent.css";
import { useForm } from "../common/useForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  collection,
  getFirestore,
  addDoc,
  orderBy,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
  startAfter,
  limit,
  endBefore,
} from "firebase/firestore";
import Header from "../components/Header";
import EventModal from "../components/EventModal";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./fire";
import { v4 } from "uuid";

const UserEventsList = () => {
  const initialValues = {};
  const [url, setUrl] = useState("");
  const userId = sessionStorage.getItem("userId");
  const firestore = getFirestore(app);
  const [lastVisible, setLastvisible] = useState([]);
  const [progress, setProgress] = useState(null);
  const [file, setFile] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [eventList, setEventList] = useState([]);
  const [open, setOpen] = useState(false);
  const [formerrors, setFormErrors] = useState({});

  const { values, setValues, handleInputChange, resetForm } =
    useForm(initialValues);

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, `images/${file.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadBytes(storageRef, file).then(
        () => {
          alert("uploading");
        },
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
          },
          (err) => console.log(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) =>
              setUrl((prevState) => url)
            );
          }
        )
      );
    };
    file && uploadFile();
  }, [file]);

  const handleSetFile = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    const getEventsList = async () => {
      const first = query(
        collection(firestore, "events"),
        where("userId", "==", userId),
        orderBy("eventName"),
        limit(2)
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
  }, [isSubmit]);

  const updateEvents = (id) => {
    handleOpen();
    let editData = eventList.find((item) => item.id === id);
    setValues({
      ...values,
      id: id,
      userId: editData.userId,
      eventname: editData.eventName,
      place: editData.place,
      description: editData.description,
      date: editData.date,
      // url: editData.url,
    });
  };

  const deleteEvents = (id) => {
    const docRef = doc(firestore, "events", id);
    deleteDoc(docRef)
      .then(() => {
        notify("Event has been deleted successfully.");
        setIsSubmit(!isSubmit);
      })
      .catch((error) => {
        notify(error);
      });
  };

  const handleNext = async () => {
    const next = query(
      collection(firestore, "events"),
      where("userId", "==", userId),
      orderBy("eventName"),
      startAfter(lastVisible),
      limit(3)
    );
    const querySnapshot = await getDocs(next);
    const last = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastvisible(last);
    const list = querySnapshot.docs.map((list) => list.data());
    setEventList(list);
  };

  const handlePrevious = async () => {
    const next = query(
      collection(firestore, "events"),
      where("userId", "==", userId),
      endBefore(lastVisible),
      limit(2)
    );
    const querySnapshot = await getDocs(next);
    const last = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastvisible(last);
    const list = querySnapshot.docs.map((list) => list.data());
    setEventList(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setFormErrors(errors);

    if (values && values.hasOwnProperty("userId")) {
      const docRef = doc(firestore, "events", values.id);
      const updatedData = {
        userId: values && values.userId,
        eventName: values && values.eventname,
        place: values && values.place,
        description: values && values.description,
        date: values && values.date,
      };
      updateDoc(docRef, updatedData)
        .then((docRef) => {
          let message = "Event Edited Successfully";
          notify(message);
          setIsSubmit(!isSubmit);
          handleOpen();
          resetForm();
        })
        .catch((error) => {
          notify(error);
        });
    } else {
      const tasksRef = collection(firestore, "events");
      addDoc(tasksRef, {
        userId: userId,
        eventName: values.eventname,
        place: values.place,
        description: values.description,
        date: values.date,
        url: url,
      })
        .then(() => {
          let message = "Event Added Successfully";
          notify(message);
          setIsSubmit(!isSubmit);
          handleOpen();
          resetForm();
        })
        .catch((err) => {
          notify(err.message);
        });
    }
  };

  const validate = () => {
    let errors = {};
    if (!values.eventname) {
      errors.eventname = "Name is Required";
    }
    if (!values.place) {
      errors.place = "Location is Required";
    }
    if (!values.description) {
      errors.description = "Description is Required";
    }
    if (!values.date) {
      errors.date = "Date is Required";
    }
    return errors;
  };

  const notify = (message) => {
    toast(message);
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <Header />
      <section className="section-name padding-y-sm">
        <div className="container">
          <header className="section-heading header">
            <h3 className="section-title">Events</h3>
            <button
              className="btn btn-outline-primary createEventBtn"
              onClick={handleOpen}
            >
              Create Events
            </button>
          </header>
          <div className="row">
            {eventList && eventList.length > 0 ? (
              eventList.map((result) => {
                return (
                  <div className="col-md-3" key={result.id}>
                    <div href="#" className="card card-product-grid imgBox">
                      <a href="#" className="img-wrap">
                        {" "}
                        <img src={result.url} className="" />{" "}
                      </a>
                      <figcaption className="info-wrap">
                        <div className="row">
                          <div className="col-md-6">
                            <p className="title">{result.eventName}</p>
                          </div>
                          <div className="col-md-6 text-right">
                            <BsPencil
                              style={{
                                fontSize: 20,
                                marginTop: "3px",
                                cursor: "pointer",
                              }}
                              onClick={() => updateEvents(result.id)}
                            />{" "}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">{result.date}</div>
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
              })
            ) : (
              <div className="d-flex justify-content-left">
                <p>No Data Found</p>
              </div>
            )}

            <div className="pagBtndiv">
              <button
                type="button"
                className="btn btn-primary pageBtnPre"
                onClick={() => handleNext()}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn btn-primary pageBtnNext"
                onClick={() => handlePrevious()}
              >
                Next
              </button>
            </div>
          </div>
          <EventModal
            open={open}
            handleOpen={handleOpen}
            formerrors={formerrors}
            values={values}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleSetFile={handleSetFile}
            progress={progress}
          />
        </div>
        <div>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default UserEventsList;
