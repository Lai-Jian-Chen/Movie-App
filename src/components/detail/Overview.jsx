import React from "react";
import "./_detail.scss";

const Overview = ({ overview }) => {
  return (
    <div>
      <div className="overview"> {overview}</div>
    </div>
  );
};

export default Overview;
