import React from "react";
import LogoImg from "../../assets/TMDB_Logo.png";
import "./_header.scss";

const Logo = () => {
  return <img className="logo" src={LogoImg} alt="TMDB_Logo" />;
};

export default Logo;
