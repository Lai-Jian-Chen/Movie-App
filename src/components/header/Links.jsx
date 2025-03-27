import React from "react";
import { Link } from "react-router-dom";
import "./_header.scss";

const Links = () => {
  return (
    <div className="links">
      <Link to={"/"}>Home</Link>
      <a href="">View Code</a>
      <a href="">Developer</a>
    </div>
  );
};

export default Links;
