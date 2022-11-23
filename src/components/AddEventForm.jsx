import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./AddEventForm.css";

const AddEventForm = ({
  values,
  handleInputChange,
  handleSubmit,
  formerrors,
  setFile,
  progress,
}) => {
  return (
    <section className="section-name padding-y-sm">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 mb-4" style={{ height: "700px" }}>
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row" style={{ minHeight: "620px" }}>
                  <div className="col-lg-1"></div>
                  <div className="col-lg-10">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Create Event</h1>
                      </div>
                      {/* <form className="user"> */}
                      <Form.Group
                        className="mb-3 user"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control
                          className="inputFields"
                          type="text"
                          placeholder="Name Of Event"
                          name="eventname"
                          value={values.eventname || ""}
                          onChange={handleInputChange}
                          autoFocus
                        />
                        {formerrors.eventname && (
                          <p className="text-warning">{formerrors.eventname}</p>
                        )}
                        <Form.Label>Place</Form.Label>
                        <Form.Control
                          className="inputFields"
                          type="text"
                          placeholder="Name Of Place"
                          name="place"
                          value={values.place || ""}
                          onChange={handleInputChange}
                        />
                        {formerrors.place && (
                          <p className="text-warning">{formerrors.place}</p>
                        )}
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          className="inputFields"
                          type="text"
                          placeholder="Description"
                          name="description"
                          value={values.description || ""}
                          onChange={handleInputChange}
                        />
                        {formerrors.description && (
                          <p className="text-warning">
                            {formerrors.description}
                          </p>
                        )}
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                          className="inputFields"
                          type="date"
                          placeholder="Name Of Event"
                          name="date"
                          value={values.date || ""}
                          onChange={handleInputChange}
                        />
                        {formerrors.date && (
                          <p className="text-warning">{formerrors.date}</p>
                        )}
                        <Form.Label>Add banner</Form.Label>
                        <input
                          class="form-control"
                          placeholder="Name Of Event"
                          type="file"
                          name="file"
                          // value={values.file || ""}
                          onChange={(e) => setFile(e.target.files[0])}
                          id="formFile"
                        ></input>
                        {formerrors.url && (
                          <p className="text-warning">{formerrors.url}</p>
                        )}
                      </Form.Group>
                      <Button
                        className="addEventBtn"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={progress !== null && progress < 100}
                      >
                        Submit
                      </Button>
                      {/* </form> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddEventForm;
