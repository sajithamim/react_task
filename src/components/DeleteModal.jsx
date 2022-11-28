import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

const DeleteModal = ({show, deleteId, deleteEvents,  handleDeleteModal, }) => {
  return (
    <Modal show={show}>
      <ModalHeader>
        <ModalTitle>Delete Events</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <ModalHeader>Are you sure you want to delete the event permenantly</ModalHeader>
      </ModalBody>

      <ModalFooter>
        {" "}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => deleteEvents(deleteId)}
        >
          Yes
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
          onClick={handleDeleteModal}
        >
          No
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteModal