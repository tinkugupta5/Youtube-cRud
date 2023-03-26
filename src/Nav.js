import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const Nave = () => {
  return (
    <>
      <section>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">ziontutorial</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Nav className="me-auto justify-content-end">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/view">Link</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </section>
    </>
  );
};

export default Nave;
