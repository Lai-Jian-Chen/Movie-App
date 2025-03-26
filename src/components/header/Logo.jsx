import React from "react";
import LogoImg from "../../assets/TMDB_Logo.png";
import "./_header.scss";

const Logo = () => {
  return (
    <div className="logo">
      <img src={LogoImg} alt="TMDB_Logo" />
    </div>
  );
};

export default Logo;
