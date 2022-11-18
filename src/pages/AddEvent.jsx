import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import AddEventForm from "../components/AddEventForm";
import UserEventsList from "../components/UserEventsList";
import { useForm } from "../common/useForm";
import { storage } from "./fire";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";
import { collection, getFirestore, addDoc } from "firebase/firestore";
import { app } from "./fire";
import { useLocation } from 'react-router-dom';

const AddEvent = () => {
  const { state } = useLocation();
  const firestore = getFirestore(app);
  const initialValues = {};
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [isSubmit, setIsSubmit] = useState(null);
  const [url, setUrl] = useState("");

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
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => setUrl((prevState) => url));
          }
        )
      );
    };

    file && uploadFile();
  }, [file]);

  const { values, setValues, handleInputChange, resetForm } =
    useForm(initialValues);

  const validate = () => {
    let errors = {};
    if (!values.name) {
      errors.name = "Name is Required";
    }

    return errors;
  };

  //submit function of Add Events
  const handleSubmit = async (e) => {
    console.log("values", values)
    e.preventDefault();
    // let errors = validate();
    // if (Object.keys(errors).length) return setErrors(errors);
    const tasksRef = collection(firestore, "events");
    addDoc(tasksRef, {
      userId: state && state.userId,
      eventName: values.eventname,
      place: values.place,
      description: values.description,
      date: values.date,
      url: url
    })
      .then(() => {
        console.log('Document added')
      })
      .catch((err) => {
        console.log("error",err.message);
      });
    
   
  };

  return (
    <div className="App">
      <Header />
      <AddEventForm
        values={values}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        errors={errors}
        setFile={setFile}
        progress={progress}
      />
      <UserEventsList />
    </div>
  );
};

export default AddEvent;
