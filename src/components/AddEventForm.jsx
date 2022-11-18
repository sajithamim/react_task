import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./AddEventForm.css"

const AddEventForm = ({values, handleInputChange, handleSubmit, errors, setFile, progress}) => {

  return (
    <section className="section-main bg padding-y">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
              <Form id="eventForm">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control
                    className = "inputFields"
                    errors = {errors.name}
                    type="text"
                    placeholder="Name Of Event"
                    name="eventname"
                    value={values.eventname || ""}
                    onChange={handleInputChange}
                    autoFocus
                  />
                   <Form.Label>Place</Form.Label>
                  <Form.Control
                    className = "inputFields"
                    type="text"
                    placeholder="Name Of Place"
                    name="place"
                    value={values.place || ""}
                    onChange={handleInputChange}
                  />
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    className = "inputFields"
                    type="text"
                    placeholder="Name Of Event"
                    name="description"
                    value={values.description || ""}
                    onChange={handleInputChange}
                  />
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    className = "inputFields"
                    type="date"
                    placeholder="Name Of Event"
                    name="date"
                    value={values.date || ""}
                    onChange={handleInputChange}
                  />
                   <Form.Label>Add banner</Form.Label>
                  <Form.Control
                    className = "inputFields"
                    type="file"
                    placeholder="Name Of Event"
                    name="banner"
                    value={values.banner || ""}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Form.Group>
                <Button className="addEventBtn" type="submit" onClick={handleSubmit} disabled={progress !== null && progress < 100 }>Submit</Button>
              </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddEventForm;
