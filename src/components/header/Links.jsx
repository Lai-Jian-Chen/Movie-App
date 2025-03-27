import React from "react";
import { Link } from "react-router-dom";
import "./_header.scss";

const Links = () => {
  return (
    <div className="links">
      <Link to={"/"}>Home</Link>
      <a href="https://github.com/Lai-Jian-Chen/Movie-App" target={"_blank"}>
        View Code
      </a>
      <a href="#" onClick={(e) => e.preventDefault()}>
        Developer
      </a>
    </div>
  );
};

export default Links;
