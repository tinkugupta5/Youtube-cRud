import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

function CheckboxTable() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  useEffect(() => {
    // Fetch data from API endpoint
    axios
      .get("http://localhost:3003/employee")
      .then((response) => setItems(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleCheckboxChange = (e, item) => {
    if (e.target.checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    }
  };

  const handleEdit = () => {
    // Open modal to edit selected item
    setShowModal(true);
    setEditedItem(selectedItems[0]);
  };

  const handleSave = () => {
    // Update item and close modal
    axios
      .put(`http://localhost:3003/employee/${editedItem.id}`, editedItem)
      .then((response) => {
        setItems(
          items.map((item) =>
            item.id === editedItem.id ? response.data : item
          )
        );
        setShowModal(false);
        setEditedItem(null);
      })
      .catch((error) => console.error(error));
  };

  const handleClose = () => {
    // Close modal and reset edited item
    setShowModal(false);
    setEditedItem(null);
  };

  const handleChange = (e) => {
    // Update edited item with form data
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>username</th>
            <th>email</th>
            <th>address</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => handleCheckboxChange(e, item)}
                />
              </td>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={handleEdit} disabled={selectedItems.length !== 1}>
        Edit
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={editedItem ? editedItem.username : ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editedItem ? editedItem.email : ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={editedItem ? editedItem.address : ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CheckboxTable;
