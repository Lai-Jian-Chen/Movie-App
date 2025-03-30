import React from "react";
import Links from "./Links";
import Logo from "./Logo";
import Search from "./Search";
import Hamburger from "./hamburger/Hamburger";
import SearchBtn from "./Search_btn/SearchBtn";
import "./_header.scss";

const Header = () => {
  return (
    <div className="header">
      <SearchBtn />
      <nav className="nav_left">
        <Logo />
        <Search />
      </nav>
      <Links />
      <Hamburger />
    </div>
  );
};

export default Header;
