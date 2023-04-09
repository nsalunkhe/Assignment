import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`/users`, {
        name,
        email,
        bio,
      });
      console.log(response.data);
      setIsLoading(false);
      setError(null);
      setSuccess("User created successfully");
      setName("");
      setEmail("");
      setBio("");
      navigate("/createPost"); // Navigate to the /createPost route
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      if (error.response?.status === 400) {
        setError("User already exists");
      } else {
        setError(error.response?.data?.message ?? error.message);
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-center mb-4">User Form</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add bio..."
                value={bio}
                onChange={(event) => setBio(event.target.value)}
              />
            </Form.Group>
            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                style={{
                  width: "100%",
                  borderRadius: "20px",
                  padding: "10px",
                  fontSize: "18px",
                }}
              >
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </Form>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="mt-3">
              {success}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserForm;
