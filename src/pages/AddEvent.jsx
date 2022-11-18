import React, { useState ,useEffect} from "react";
import Header from "../components/Header";
import AddEventForm from "../components/AddEventForm";
import { useForm } from "../common/useForm";
import {storage} from "./fire"
import { ref,getDownloadURL, uploadBytesResumable, uploadBytes } from "firebase/storage";
import {v4} from 'uuid'

const AddEvent = () => {
  const initialValues = {};
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [data, setData] = useState(null);
  const [isSubmit, setIsSubmit] = useState(null);

  useEffect(() => {
    const uploadFile = () =>{
        const storageRef = ref(storage, `images/${file.name +v4()}`)
        const uploadTask = uploadBytes(storageRef, file)
        uploadBytes(storageRef, file).then(() =>{
            alert("uploading")
        },
        // console.log("useeffect", file)
        // uploadTask.on("state_changed", (snapshot) => { 
        //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     console.log("Progree", progress)
        //     setProgress(progress)
        //     switch(snapshot.state){
        //         case "paused":
        //             console.log("upload pause");
        //             break;
        //         case "running":
        //             console.log("running");
        //             break;
        //         default :
        //             break;
        //     }
        // },(error) => {
        //     console.log("error", error)
        // },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                setData((prev) => ({...prev, img: downloadUrl}))
            })
        });
    }
console.log("data", data)
    file && uploadFile()
  }, [file])
  
  const { values, setValues, handleInputChange, resetForm } =
    useForm(initialValues);

  const validate = () => {
    let errors={};
    if (!values.name) {
      errors.name = "Name is Required";
    }

    return errors;
  };
  //submit function of Add Events
  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
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
    </div>
  );
};

export default AddEvent;
