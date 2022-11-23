import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

const EventModal = ({
  open,
  handleOpen,
  formerrors,
  values,
  handleInputChange,
  handleSetFile,
  handleSubmit,
  progress,
}) => {
  return (
    <Modal show={open}>
      <ModalHeader>
        <ModalTitle>Create Events</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <Form.Group className="mb-3 user" controlId="exampleForm.ControlInput1">
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
            <p className="text-warning">{formerrors.description}</p>
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
          {formerrors.date && <p className="text-warning">{formerrors.date}</p>}
          <Form.Label>Add banner</Form.Label>
          <input
            className="form-control"
            placeholder="Name Of Event"
            type="file"
            name="file"
            // value={values.file || ""}
            onChange={(e) => handleSetFile(e)}
            id="formFile"
          ></input>
          {formerrors.url && <p className="text-warning">{formerrors.url}</p>}
        </Form.Group>
      </ModalBody>

      <ModalFooter>
        {" "}
        <button
          type="button"
          class="btn btn-primary"
          onClick={handleSubmit}
          disabled={progress !== null && progress < 100}
        >
          Save changes
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          onClick={handleOpen}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default EventModal;
