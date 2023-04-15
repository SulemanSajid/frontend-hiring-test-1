import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Table from "./Table";
import { refreshCall, siginCall } from "../utils/utils";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

function SignIn() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [time, setTime] = useState(4);
  const [auth, setauth] = useState(false);
  useEffect(() => {
    const delay = time * 60000;
    if (localStorage.getItem("access_token")) {
      setauth(true);
    }
    if (time > 0) {
      var intervalId = setInterval(async () => {
        const res = await refreshCall();
        localStorage.setItem("access_token", res.data.access_token);
        setTime(1);
      }, delay);
    }
    return () => clearInterval(intervalId);
  }, [time]);

  const login = (e) => {
    e.stopPropagation();
    if (userName == "login" && password == "123") {
      localStorage.setItem("login", "true");
      navigate(`/`);
      console.log("user login");
    }
    setUserName("");
    setPassword("");
  };
  return (
    <>
      <div className="loginPage">
        <Navbar />
        {!auth ? (
          <div className="signIn-container">
            <div className="card card-custom">
              <Form>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    required
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                <Button variant="primary" className="loginBtn" onClick={login}>
                  Log in
                </Button>
              </Form>
            </div>
          </div>
        ) : (
          <Table></Table>
        )}
      </div>
    </>
  );
}

export default SignIn;
