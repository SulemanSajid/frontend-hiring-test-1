import React, { useEffect } from "react";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Navbar";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Nav logout={true} />
      <Table />
    </div>
  );
};

export default Main;
