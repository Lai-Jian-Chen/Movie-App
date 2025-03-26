import "./App.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./components/homePage/HomePage";
import DetailPage from "./components/detail/DetailPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/DetailPage" element={<DetailPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
