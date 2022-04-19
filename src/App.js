import "./App.css";
import Experiences from "./pages/Experiences/Experiences";
import Login from "./pages/Login/Login";
import { Routes, Route, Link } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <div>
      APP
      <div>
        <Link to="/signup" style={{ textAlign: "center" }}>
          Click here to sign up
        </Link>
        <br />
        <Link to="/login">Click here to log in</Link>
        <br />
        <Link to="/">Home</Link>
      </div>
      <Routes>
        <Route exact path="/" element={<Experiences />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
