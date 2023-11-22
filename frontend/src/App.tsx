import { Route, Routes } from "react-router-dom";
import { Home } from "./modules/Home/Home";
import { Signup } from "./modules/Signup/Signup";
import { Login } from "./modules/Login/Login";
import { PageNotFound } from "./modules/PageNotFound/PageNotFound";
import { Dashboard } from "./modules/Dashboard/DashboardPage/Dashboard";

import "./App.css";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
