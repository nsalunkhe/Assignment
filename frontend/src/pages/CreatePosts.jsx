import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import PostList from "../components/PostList";
import Header from "../components/Navbar";
// import Header2 from "../components/Header2";

const PostForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`https://backend-2k1s.onrender.com/posts`, {
        name,
        email,
        content,
      });
      console.log(response.data);
      setIsLoading(false);
      setTimeout(()=>{
        window.location.reload()
        window.alert("Post created successfully");
      },1000)
      setEmail("");
      setName("");
      setContent("");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header/>
      <Container className="mt-5">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1 className="text-center mb-4">Add Posts</h1>
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
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Add Content..."
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  required
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
                  {isLoading ? "Loading..." : "Post"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <PostList />
    </div>
  );
};

export default PostForm;
