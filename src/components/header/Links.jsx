import React from "react";
import { Link } from "react-router-dom";
import "./_header.scss";

const Links = () => {
  return (
    <div className="links">
      <Link to={"/"}>Home</Link>
      <a href="">About</a>
      <a href="">View Code</a>
    </div>
  );
};

export default Links;
