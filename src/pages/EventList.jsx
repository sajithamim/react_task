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

const initialValues = {
  id: "",
  name: "",
  category: "",
};

const EventList = () => {
  const [show, setShow] = useState(false);
  const [event, setEvent] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [query, setQuery] = useState();
  const [queryCategory, setQueryCategory] = useState();
  const [errors, setErrors] = useState({});
  const [currentpage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(2);
  const [slNo, setSlNo] = useState(0);

  const indexOfLastEvent = currentpage * postPerPage;
  const indexOfFirstEvent = indexOfLastEvent - postPerPage;
  const currentPosts =
    filteredResult && filteredResult.length > 0
      ? filteredResult.slice(indexOfFirstEvent, indexOfLastEvent)
      : event.slice(indexOfFirstEvent, indexOfLastEvent);

  const { values, setValues, handleInputChange, resetForm } =
    useForm(initialValues);

  const options = [
    { id: "1", name: "Primary" },
    { id: "2", name: "Secondary" },
  ];

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

  const paginate = (pageNumber, value) => {
    setCurrentPage(pageNumber);
    setSlNo(pageNumber - 1);
  };

  const handleDelete = (id) => {
    let removeEvent = [...event];
    setEvent(removeEvent.filter((item) => item.id !== id));
  };

  const handleSubmit = async () => {
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
      event.map((item) => {
        if (item.id === values.id) {
          return (item.name = values.name);
        }
      });
      resetForm();
      handleClose();
    }
  };

  const { TblHead, TblBody } = useTable(tableHeading.heading, currentPosts);

  useEffect(() => {
    searchItem();
  }, [query, queryCategory]);

  const searchItem = () => {
    const data = query
      ? event.filter((item) => item.name.includes(query))
      : event.filter((item) => item.category.includes(queryCategory));
    setFilteredResult(data);
  };

  let serialNo = postPerPage * slNo;
  return (
    <>
      <div className="container">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col">
                  <h2>
                    React <b>Task</b>
                  </h2>
                </div>
              </div>

              <div className="row d-flex mx-md-n5">
                <div class="col px-md-5">
                  <div class="p-3 ">
                    <input
                      type="text"
                      name="search"
                      value={query}
                      class="form-control"
                      id="search"
                      placeholder="Search"
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <span class="glyphicon glyphicon-search form-control-feedback"></span>
                  </div>
                </div>
                <div class="col px-md-5">
                  <div class="p-3 ">
                    <Form.Select
                      size="sm"
                      name="category"
                      value={queryCategory}
                      onChange={(e) => setQueryCategory(e.target.value)}
                    >
                      <option selected>Choose a category</option>
                      {options.map((item) => (
                        <option value={item.id}>{item.name}</option>
                      ))}
                    </Form.Select>
                  </div>
                </div>
                <div class="col px-md-5">
                  <div class="p-3 ">
                    <Button variant="primary" onClick={handleShow}>
                      Add an event
                    </Button>
                  </div>
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
      </div>

      <AddEvent
        handleClose={handleClose}
        values={values}
        show={show}
        handleInputChange={handleInputChange}
        options={options}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
};

export default EventList;
