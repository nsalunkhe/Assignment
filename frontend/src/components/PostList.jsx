import React, { useState, useEffect } from "react";
import { ListGroup, Card, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import {  FaEdit } from "react-icons/fa";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [editedPost, setEditedPost] = useState({
    email: "",
    content: "",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://backend-2k1s.onrender.com/posts");
        setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

 

  const getTimeDiff = (date) => {
    const currentDate = new Date();
    const postDate = new Date(date);
    const diff = currentDate.getTime() - postDate.getTime();
    const diffInMinutes = Math.floor(diff / (1000 * 60));
    if (diffInMinutes < 1) {
      return `less than a minute ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else {
      const diffInHours = Math.floor(diff / (1000 * 60 * 60));
      if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} days ago`;
      }
    }
  };

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedPost({});
    setEditedPost({
      email: "",
      content: "",
    });
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if user exists
      const userResponse = await axios.get(`https://backend-2k1s.onrender.com/users?email=${editedPost.email}`);
      const users = userResponse.data;
      if (users.length === 0) {
        console.error("User does not exist");
        return;
      }
  
      // User exists, update post
      const response = await axios.put(`https://backend-2k1s.onrender.com/posts/${selectedPost._id}`, editedPost);
      const updatedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
      setSelectedPost({});
      setEditedPost({
        email: "",
        content: "",
      });
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Invalid Email")
    }
  };
  

 
  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`https://backend-2k1s.onrender.com/posts/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h2>Posts</h2>
      <ListGroup>
        {posts.map((post) => (
          <ListGroup.Item key={post._id}>
            <Card>
              <Card.Header>{post.name}</Card.Header>
              <Card.Body>
                <Card.Text>{post.content}</Card.Text>
                <div className="post-buttons">
                
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleEditClick(post)}
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteClick(post._id)}
                  >
                    Delete
                  </Button>
                </div>
                <Card.Footer>
                  <small className="text-muted">
                    {getTimeDiff(post.createdAt)}
                  </small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={editedPost.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter post content"
                name="content"
                value={editedPost.content}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PostList;
