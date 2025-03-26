import React from "react";
import Links from "./Links";
import Logo from "./Logo";
import Search from "./Search";
import "./_header.scss";

const Header = () => {
  return (
    <div className="header">
      <Logo />
      <Search />
      <Links />
    </div>
  );
};

export default Header;
