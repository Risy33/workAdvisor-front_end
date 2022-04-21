import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Experiences from "./pages/Experiences/Experiences";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Footer from "./components/Footer/Footer";
import WorkPlaces from "./pages/Workplaces/WorkPlaces";
import { fetchWorkPlaces } from "./store/workplaces/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkPlaces);
  }, []);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Experiences />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/workPlaces" element={<WorkPlaces />}>
          <Route path=":filter" element={<WorkPlaces />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
