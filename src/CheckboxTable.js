import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

function CheckboxTable() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    console.log("Opening edit modal...");
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

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    // Delete selected items and close modal
    const itemIds = selectedItems.map((item) => item.id);
    axios
      .delete(`http://localhost:3003/employee/${itemIds.join(",")}`)
      .then(() => {
        setItems(items.filter((item) => !itemIds.includes(item.id)));
        setSelectedItems([]);
        setShowDeleteModal(false);
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    // Update edited item with form data
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleDeleteMultiple = () => {
    // Delete multiple items
    const itemIds = selectedItems.map((item) => item.id);
    axios
      .delete(`http://localhost:3003/employee/${itemIds.join(",")}`)
      .then(() => {
        setItems(items.filter((item) => !itemIds.includes(item.id)));
        setSelectedItems([]);
      })
      .catch((error) => console.error(error));
  };
  // const handleClearSelection = () => {
  //   setSelectedItems([]);
  // };

  return (
    <section className="container">
      <h1 className="heading">React Js CRUD Operation Data 😎</h1>
      <div className="button_wrapper">
        <Button
          className="btn1"
          onClick={handleEdit}
          disabled={selectedItems.length !== 1}
        >
          Edit
        </Button>
        <Button
          className="btn-2 ml-5"
          onClick={handleDelete}
          disabled={selectedItems.length === 0}
        >
          Delete
        </Button>
      </div>
      <Table striped bordered hover className="section_wrapper">
        <thead>
          <tr>
            <th></th>
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
                <Form.Check
                  type="checkbox"
                  onChange={(e) => handleCheckboxChange(e, item)}
                  checked={selectedItems.some(
                    (selectedItem) => selectedItem.id === item.id
                  )}
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

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={editedItem?.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={editedItem?.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={editedItem?.address}
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the selected items?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default CheckboxTable;
