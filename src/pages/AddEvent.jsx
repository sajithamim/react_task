import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./list.css"



function AddEvent({handleClose, values,show, handleInputChange, handleSubmit,options}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add an event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name Of Event"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              autoFocus
              required
            />
            <Form.Label>Select Category</Form.Label>
            <Form.Select
              size="sm"
              name="category"
              value={values.category}
              onChange={handleInputChange}
            >
              <option>Choose a category</option>
              {options.map((item) => (
                <option key={item.name} value={item.id}>{item.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEvent;
