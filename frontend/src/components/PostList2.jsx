import React, { useState, useEffect } from "react";
import { ListGroup, Card, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const PostList2 = () => {
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
        const response = await axios.get("/posts");
        setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  const handleLikeClick = async (id) => {
    try {
      const response = await axios.post(`/posts/${id}/like`);
      const updatedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnlikeClick = async (id) => {
    try {
      const response = await axios.post(`/posts/${id}/unlike`);
      const updatedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

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
      const response = await axios.put(`/posts/${selectedPost._id}`, editedPost);
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
    }
  };

 


  return (
    <>
      <h2 style={{textAlign:"center",marginTop:"20px"}}>All Posts</h2>
      <ListGroup>
        {posts.map((post) => (
          <ListGroup.Item key={post._id}>
            <Card>
              <Card.Header>{post.name}</Card.Header>
              <Card.Body >
                <Card.Text>{post.content}</Card.Text>
                <div className="post-buttons">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleLikeClick(post._id)}
                  >
                    <FaThumbsUp /> 
                  </Button>
                  <strong style={{ padding:"4px", margin:"5px"}}>{post.likes}</strong>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleUnlikeClick(post._id)}
                  >
                    <FaThumbsDown />
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

export default PostList2;
