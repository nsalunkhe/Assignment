import React from "react";
import { Container } from "react-bootstrap";
import PostList2 from "../components/PostList2";
import Header from "../components/Navbar";

const HomePage = () => {
  return (
    <>
    <Header />
      <Container>
        <PostList2 />
      </Container>
    </>
  );
};

export default HomePage;
