import React from "react";
import LogoImg from "../../assets/TMDB_Logo.png";
import { Link } from "react-router-dom";
import "./_header.scss";

const Logo = () => {
  return (
    <div className="Logo">
      <Link to={"/"} className="logo_link">
        <img className="logo_img" src={LogoImg} alt="TMDB_Logo" />
      </Link>
    </div>
  );
};

export default Logo;
