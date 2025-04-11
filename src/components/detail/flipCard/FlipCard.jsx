import React, { useState } from "react";
import "./_flipCard.scss";
import Info from "../Infos/Info";
import Poster from "../Poster";
import "../../../scss/_index.scss";

const FlipCard = ({ isActive, result, detail, staff, overview }) => {
  const [flip, setFlip] = useState(true);

  return (
    <div
      className={`Flip ${flip ? "flipped" : ""} ${
        isActive ? "active" : "none"
      }`}
    >
      <div className="card">
        <div
          className="front"
          onClick={() => {
            setFlip((prev) => !prev);
          }}
        >
          <Poster result={result} />
        </div>
        <div
          className="back"
          onClick={() => {
            setFlip((prev) => !prev);
          }}
        >
          <Info detail={detail} staff={staff} flip={flip} />
          <div className="overview"> {overview}</div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
