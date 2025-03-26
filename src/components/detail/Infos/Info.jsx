import React, { useEffect, useState } from "react";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import "./_infos.scss";

const info = ({ detail, staff }) => {
  const [actor, setActor] = useState("");

  useEffect(() => {
    if (!!staff) {
      const actors = staff.cast.slice(0, 2);
      const lead = actors.map((actor) => {
        return actor.name;
      });
      setActor(lead);
    }
  }, [staff]);

  return (
    <div className="info">
      <div className="staff">
        <h4>主演:</h4>
        {actor[0]}、{actor[1]}
      </div>
      <div className="section">
        <SectionOne detail={detail} />
        <SectionTwo detail={detail} />
      </div>
    </div>
  );
};

export default info;
