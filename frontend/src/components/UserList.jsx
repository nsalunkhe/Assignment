import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Alert,
  Badge
} from "react-bootstrap";
import axios from "axios";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    bio: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
 
  useEffect(() => {
    axios
      .get("https://backend-2k1s.onrender.com/users")
      .then((response) => {
        setUsers(response.data);
        setTotalUsers(response.data.length);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setUpdatedUser({ name: user.name, email: user.email, bio: user.bio });
    setShowEditModal(true);

  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `https://backend-2k1s.onrender.com/users/${selectedUser._id}`,
        updatedUser
      );
      const updatedUserData = response.data;
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === updatedUserData._id ? updatedUserData : user
        )
      );
      setShowEditModal(false);
      setShowSuccessMessage(true);
      setShowErrorMessage(false);
    } catch (error) {
      console.error(error);
      setShowSuccessMessage(false);
      setShowErrorMessage(true);
    }
  };
  
  

  const handleDelete = async (user) => {
    try {
      await axios.delete(`https://backend-2k1s.onrender.com/users/${user._id}`);
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
      setShowSuccessMessage(true);
      setShowErrorMessage(false);
    } catch (error) {
      console.error(error);
      setShowSuccessMessage(false);
      setShowErrorMessage(true);
    }
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <h1>User List</h1>
        </Col>
        <Col className="text-right">
          <Badge variant="secondary" className="float-left h1" style={{ fontSize: "24px",marginTop:"20px" }}>
            {totalUsers} Users
          </Badge>
        </Col>
      </Row>

      {showSuccessMessage && (
        <Alert
          variant="success"
          onClose={() => setShowSuccessMessage(false)}
          dismissible
        >
          User updated/deleted successfully.
        </Alert>
      )}{" "}
      {showErrorMessage && (
        <Alert
          variant="danger"
          onClose={() => setShowErrorMessage(false)}
          dismissible
        >
          An error occurred while updating/deleting the user. Please try again later.
        </Alert>
      )}
      <Row>
        {users.map((user) => (
          <Col xs={12} md={6} lg={4} key={user._id}>
            <Card className="mb        -3">
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
            <Card.Text>{user.bio}</Card.Text>
            <Button variant="primary" onClick={() => handleEdit(user)}>
              Edit
            </Button>{" "}
            <Button variant="danger" onClick={() => handleDelete(user)}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>

  <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Edit User</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleEditSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={updatedUser.name}
            onChange={(event) =>
              setUpdatedUser({ ...updatedUser, name: event.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={updatedUser.email}
            onChange={(event) =>
              setUpdatedUser({ ...updatedUser, email: event.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formBasicBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={updatedUser.bio}
            onChange={(event) =>
              setUpdatedUser({ ...updatedUser, bio: event.target.value })
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>{" "}
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Close
        </Button>
      </Form>
    </Modal.Body>
  </Modal>
</Container>
);
};

export default UserList;
