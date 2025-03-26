import React from "react";
import "./_detail.scss";

const Overview = ({ overview }) => {
  return (
    <div>
      <div className="movie_overview"> {overview}</div>
    </div>
  );
};

export default Overview;
