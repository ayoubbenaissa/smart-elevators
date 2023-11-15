import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Signup } from "./pages/Signup";

import "./App.css";
import { Login } from "./pages/Login";
import { NoPage } from "./pages/NoPage";
import { Dashboard } from "./pages/Dashboard/Dashboard";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
};
