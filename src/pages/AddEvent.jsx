// import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
// import AddEventForm from "../components/AddEventForm";
// import UserEventsList from "../components/UserEventsList";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useForm } from "../common/useForm";
// // import { storage } from "./fire";
// // import {
// //   ref,
// //   getDownloadURL,
// //   uploadBytesResumable,
// //   uploadBytes,
// // } from "firebase/storage";
// import { v4 } from "uuid";
// import {
//   collection,
//   getFirestore,
//   addDoc,
//   orderBy,
//   getDocs,
//   query,
//   where,
//   updateDoc,
//   deleteDoc,
//   doc,
//   startAfter,
//   limit,
//   endBefore,
// } from "firebase/firestore";
// import { app } from "./fire";
// import { useLocation } from "react-router-dom";

// const AddEvent = () => {
//   const userId = sessionStorage.getItem("userId");
//   const { state } = useLocation();
//   const firestore = getFirestore(app);
//   const initialValues = {};
//   const [formerrors, setFormErrors] = useState({});
//   const [file, setFile] = useState(null);
//   const [progress, setProgress] = useState(null);
//   const [url, setUrl] = useState("");
//   const [eventList, setEventList] = useState([]);
//   const [filteredResult, setFilteredResult] = useState([]);
//   const [searchEvents, setSearchEvents] = useState([]);
//   const [lastVisible, setLastvisible] = useState([]);

//   const handleSearch = (searchValue) => {
//     setSearchEvents(searchValue);
//   };

//   useEffect(() => {
//     searchItem();
//   }, [searchEvents]);

//   const searchItem = () => {
//     const data = eventList.filter(
//       (item) =>
//         item &&
//         item.eventName &&
//         item.eventName.toLowerCase().includes(searchEvents)
//     );
//     setFilteredResult(data);
//   };

//   useEffect(() => {
//     setEventList(filteredResult);
//   }, [filteredResult]);

//   //Fetching the events list of user using whwere condition
  

//   useEffect(() => {
//     const uploadFile = () => {
//       const storageRef = ref(storage, `images/${file.name + v4()}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadBytes(storageRef, file).then(
//         () => {
//           // alert("uploading");
//         },
//         uploadTask.on(
//           "state_changed",
//           (snapshot) => {
//             const prog = Math.round(
//               (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//             );
//             setProgress(prog);
//           },
//           (err) => console.log(err),
//           () => {
//             getDownloadURL(uploadTask.snapshot.ref).then((url) =>
//               setUrl((prevState) => url)
//             );
//           }
//         )
//       );
//     };
//     file && uploadFile();
//   }, [file]);

//   const { values, setValues, handleInputChange, resetForm } =
//     useForm(initialValues);

//   const deleteEvents = (id) => {
//     const docRef = doc(firestore, "events", id);
//     deleteDoc(docRef)
//       .then(() => {
//         notify("Event has been deleted successfully.");
//       })
//       .catch((error) => {
//         notify(error);
//       });
//   };

//   const validate = () => {
//     let errors = {};
//     if (!values.eventname) {
//       errors.eventname = "Name is Required";
//     }
//     if (!values.place) {
//       errors.place = "Location is Required";
//     }
//     if (!values.description) {
//       errors.description = "Description is Required";
//     }
//     if (!values.date) {
//       errors.date = "Date is Required";
//     }
//     return errors;
//   };

//   const updateEvents = (id) => {
//     let editData = eventList.find((item) => item.id === id);
//     setValues({
//       ...values,
//       id: id,
//       userId: editData.userId,
//       eventname: editData.eventName,
//       place: editData.place,
//       description: editData.description,
//       date: editData.date,
//       // url: editData.url,
//     });
//   };

//   //submit function of Add Events
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let errors = validate();
//     if (Object.keys(errors).length) return setFormErrors(errors);

//     if (values && values.hasOwnProperty("userId")) {
//       const docRef = doc(firestore, "events", values.id);
//       const updatedData = {
//         userId: values && values.userId,
//         eventName: values && values.eventname,
//         place: values && values.place,
//         description: values && values.description,
//         date: values && values.date,
//       };
//       updateDoc(docRef, updatedData)
//         .then((docRef) => {
//           let message = "Event Edited Successfully";
//           notify(message);
//           resetForm();
//         })
//         .catch((error) => {
//           notify(error);
//         });
//     } else {
//       const tasksRef = collection(firestore, "events");
//       addDoc(tasksRef, {
//         userId: userId,
//         eventName: values.eventname,
//         place: values.place,
//         description: values.description,
//         date: values.date,
//         url: url,
//       })
//         .then(() => {
//           let message = "Event Added Successfully";
//           notify(message);
//           resetForm();
//         })
//         .catch((err) => {
//           notify(err.message);
//         });
//     }
//   };

//   const notify = (message) => {
//     toast(message);
//   };

//   return (
//     <>
//       <div className="App">
//         <Header handleSearch={handleSearch} />
//         <AddEventForm
//           values={values}
//           handleInputChange={handleInputChange}
//           handleSubmit={handleSubmit}
//           formerrors={formerrors}
//           setFile={setFile}
//           progress={progress}
//         />
//         {/* <UserEventsList
//           eventList={eventList}
//           updateEvents={updateEvents}
//           deleteEvents={deleteEvents}
//           // handleNext={handleNext}
//           // handlePrevious={handlePrevious}
//         /> */}
//       </div>
//       <div>
//         <ToastContainer />
//       </div>
//     </>
//   );
// };

// export default AddEvent;
