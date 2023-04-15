import React, { useEffect } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  let isLoggedIn = localStorage.getItem("login");

  console.log(isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      if (isLoggedIn === "true") {
        navigate(`/`);
      }
    } else {
      navigate(`/login`);
    }
  }, []);

  return (
    <div>
      <Loader />
    </div>
  );
};

export default Home;
