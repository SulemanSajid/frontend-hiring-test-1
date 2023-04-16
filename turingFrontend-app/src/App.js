import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import * as Pages from "./pages";
import Login from "./components/Login";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function PrivateRoute({ children }) {
  const loggedInAs = localStorage.getItem("logged-in-as") || null;

  if (!loggedInAs) return <Navigate to="/" />;

  return children;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/Home/*"
            element={
              <PrivateRoute>
                <Pages.Home />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Pages.Main />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      {/* <h1>Turing Tech</h1> */}
    </div>
  );
}

export default App;
