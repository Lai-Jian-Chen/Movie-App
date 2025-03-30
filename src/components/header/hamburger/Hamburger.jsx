import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import "./_hamburger.scss";

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="empty">
      <div className={`hamburger ${isOpen ? "open" : ""}`}>
        <button
          className={`open_btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <CgMenuRightAlt className="open_icon" />
        </button>
        <ul className={`hamburger_list ${isOpen ? "open" : ""}`}>
          <button className="back_btn" onClick={() => setIsOpen(!isOpen)}>
            <MdOutlineArrowForwardIos className="back_icon" />
          </button>
          <li>
            <Link to={"/"} onClick={() => setIsOpen(!isOpen)}>
              Home
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/Lai-Jian-Chen/Movie-App"
              target={"_blank"}
              onClick={() => setIsOpen(!isOpen)}
            >
              ViewCode
            </a>
          </li>
          <li>
            <a
              href="#"
              target={"_blank"}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
              }}
            >
              Developer
            </a>
          </li>
        </ul>
      </div>
      <div
        className={`overlay ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
    </div>
  );
};

export default Hamburger;
