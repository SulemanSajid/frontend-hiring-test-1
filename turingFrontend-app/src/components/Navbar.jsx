import * as React from "react";
import logo from "../assets/logo.png";
import Navbar from "react-bootstrap/Navbar";

export default function Nav() {
  return (
    <Navbar expand="lg" variant="light" className="navbar">
      {/* <Container> */}
      <div className="navDiv">
        <Navbar.Brand href="#">
          <img src={logo} width={210} height={30} />
        </Navbar.Brand>
      </div>
      {/* </Container> */}
    </Navbar>
  );
}
