import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { refreshCall, siginCall } from "../utils/utils";
import Loader from "./Loader";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

function SignIn() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [time, setTime] = useState(4);
  const [auth, setauth] = useState(false);
  //   useEffect(() => {
  //     if (auth) {
  //       navigate("/");
  //     }
  //   }, []);
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

  const login = async (e) => {
    e.stopPropagation();
    setLoader(true);
    try {
      //   debugger;
      const res = await siginCall(userName, password);
      setTime(7);
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
    setUserName("");
    setPassword("");
    setLoader(false);
  };
  return (
    <>
      <div className="loginPage">
        <Navbar />
        {loader ? (
          <Loader />
        ) : (
          <div className="signIn-container">
            <div className="card card-custom">
              <Form>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="User Name"
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
        )}
      </div>
    </>
  );
}

export default SignIn;
