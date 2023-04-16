import * as React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

export default function Nav({ logout }) {
  const navigate = useNavigate();

  const logoutFtn = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };
  return (
    <Navbar expand="lg" variant="light" className="navbar">
      {/* <Container> */}
      <div className="navDiv">
        <Navbar.Brand href="#">
          <img src={logo} width={210} height={30} />
        </Navbar.Brand>
        {logout && (
          <Button variant="primary" className="logoutBtn" onClick={logoutFtn}>
            Log out
          </Button>
        )}
      </div>
      {/* </Container> */}
    </Navbar>
  );
}
