import React, { useEffect, useState } from "react";
import tableHeading from "../common/tableHeading";
import useTable from "../common/useTable";
import { useForm } from "../common/useForm";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import AddEvent from "./AddEvent";
import Pagination from "../common/Pagination";
import Form from "react-bootstrap/Form";
import "./list.css";
import { getAuth, signOut } from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  remove,
} from "firebase/database";
import { collection, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";

const initialValues = {
  id: "",
  name: "",
  category: "",
};

const EventList = () => {
  const dbRef = ref(getDatabase());
  const db = getDatabase();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [event, setEvent] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [query, setQuery] = useState();
  const [queryCategory, setQueryCategory] = useState();
  const [currentpage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(5);
  const [slNo, setSlNo] = useState(0);
  const accessToken = sessionStorage.getItem("accessToken");

  const options = [
    { id: "1", name: "Primary" },
    { id: "2", name: "Secondary" },
  ];

  //Line no 41 to 54 listing of events from irebase
  useEffect(() => {
    if (accessToken) {
      get(child(dbRef, `events/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setEvent(Object.values(snapshot.val()));
          }
        })
        .catch((error) => {
         alert(error)
        });
    }
  }, [event]);

  // Line no: 55 to 71 code for pagination
  const indexOfLastEvent = currentpage * postPerPage;
  const indexOfFirstEvent = indexOfLastEvent - postPerPage;
  const currentPosts =
    filteredResult && filteredResult.length > 0
      ? filteredResult.slice(indexOfFirstEvent, indexOfLastEvent)
      : event.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber, value) => {
    setCurrentPage(pageNumber);
    setSlNo(pageNumber - 1);
  };

  const { TblHead, TblBody } = useTable(tableHeading.heading, currentPosts);

  const { values, setValues, handleInputChange, resetForm } =
    useForm(initialValues);

  // Function to show the details of events while editing
  const handleShow = (id) => {
    setShow(true);
    if (typeof id === "string") {
      let editData = event.find((item) => item.id === id);
      setValues({
        ...values,
        id: editData.id,
        name: editData.name,
        category: editData.category,
      });
    }
  };

  const handleClose = () => setShow(false);

  const handleDelete = (id) => {
    if (accessToken) {
      remove(ref(db, "events/" + id))
        .then(() => alert("removed"))
        .catch((error) => alert(error));
    } else {
      let removeEvent = [...event];
      setEvent(removeEvent.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = async () => {
    if (accessToken && values.id == "") {
      set(ref(db, "events/" + new Date().getTime().toString()), {
        id: new Date().getTime().toString(),
        name: values.name,
        category: values.category,
      });
      resetForm();
      handleClose();
    } else if (accessToken && values.id != "") {
      update(ref(db, "events/" + values.id), {
        id: values.id,
        name: values.name,
        category: values.category,
      });
      resetForm();
      handleClose();
    } else {
      if (values && values.id == "") {
        setEvent((ls) => [
          ...ls,
          {
            id: new Date().getTime().toString(),
            name: values.name,
            category: values.category,
          },
        ]);
        resetForm();
        handleClose();
      } else {
        //Edit of events for unauthorised users
        event.map((item) => {
          if (item.id === values.id) {
            return (item.name = values.name), (item.category = values.category);
          }
        });
        resetForm();
        handleClose();
      }
    }
  };

  const logout = () => {
    sessionStorage.clear();
    sessionStorage.removeItem("accessToken");
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert("An error happened..");
      });
  };

  useEffect(() => {
    searchItem();
  }, [query, queryCategory]);

  const searchItem = () => {
    const data = query
      ? event.filter((item) => item && item.name && item.name.toLowerCase().includes(query))
      : event.filter(
          (item) => item && item.name && item.category.toLowerCase().includes(queryCategory)
        );
    setFilteredResult(data);
  };

  let serialNo = postPerPage * slNo;
  return (
    <>
      <div className="container  border p-3">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="bs-example">
                <div className="p-3 border d-flex justify-content-between">
                  <div>
                    <h2>
                      React <b>Task</b>
                    </h2>
                  </div>
                  {accessToken ? (
                    <div>
                      <button
                        type="button"
                        className="btn btn-default btn-sm"
                        onClick={logout}
                      >
                        <span className="glyphicon glyphicon-log-out"></span>{" "}
                        Log out
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="p-3 border d-flex justify-content-between">
                <div>
                  <input
                    type="text"
                    name="search"
                    value={query || ""}
                    className="form-control"
                    id="search"
                    placeholder="Search"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <span className="glyphicon glyphicon-search form-control-feedback"></span>
                </div>

                <div>
                  <Form.Select
                    id="category"
                    size="sm"
                    name="category"
                    value={queryCategory || ""}
                    onChange={(e) => setQueryCategory(e.target.value)}
                  >
                    <option>Choose a category</option>
                    {options.map((item) => (
                      <option key={item.name} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <div>
                  <Button variant="primary" onClick={handleShow}>
                    Add an event
                  </Button>
                </div>
              </div>
            </div>

            <div id="table-parent">
              <Table striped bordered hover size="sm">
                <TblHead></TblHead>
                <TblBody
                  handleShow={handleShow}
                  handleDelete={handleDelete}
                  serialNo={serialNo}
                ></TblBody>

                <Pagination
                  postPerPage={postPerPage}
                  totalPosts={event.length}
                  paginate={paginate}
                />
              </Table>
            </div>
          </div>
        </div>
        <div className="d-grid gap-2 mt-3">
          <a href="/" className="link-primary" onClick={logout}>
            Go Back
          </a>
        </div>
      </div>

      <AddEvent
        handleClose={handleClose}
        values={values}
        show={show}
        handleInputChange={handleInputChange}
        options={options}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default EventList;
