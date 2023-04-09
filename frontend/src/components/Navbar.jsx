import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto ms-5 gap-5 text-decoration-none ">
            <Link to="/users" className="text-decoration-none text-white">
              Create Account
            </Link>
            <Link to="/createPost" className="text-decoration-none text-white">
             Posts
            </Link>
            <Link to="/analytics" className="text-decoration-none text-white">
              Analytics
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
