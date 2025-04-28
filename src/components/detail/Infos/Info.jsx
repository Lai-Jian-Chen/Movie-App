import React, { useState, useEffect, useRef } from "react";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import "./_infos.scss";

const info = ({ detail, staff, flip }) => {
  const [actor, setActor] = useState("");
  const [isOverflowing, setIsOverflowing] = useState(false);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    const container = containerRef.current;
    if (title && container) {
      setIsOverflowing(title.scrollWidth > container.clientWidth);
    }
  }, [detail?.title, flip]);

  useEffect(() => {
    if (!!staff) {
      const actors = staff.cast.slice(0, 2);
      if (actors.length === 0) {
        setActor(["暫無資料"]);
      } else {
        const lead = actors.map((actor) => actor.name);
        setActor(lead);
      }
    }
  }, [staff]);

  return (
    <div className="info">
      <div className="upper_part">
        <div ref={containerRef} className="marquee_wrapper">
          <div className={`marquee_inner ${isOverflowing ? "marquee" : ""}`}>
            <h1 ref={titleRef}>{detail?.title}</h1>
            {isOverflowing && <h1 aria-hidden="true">{detail.title}</h1>}
          </div>
        </div>
        <div className="staff">
          <h4>主演:</h4>
          {actor[0]}、{actor[1]}
        </div>
      </div>
      <div className="section">
        <SectionOne detail={detail} />
        <SectionTwo detail={detail} />
      </div>
    </div>
  );
};

export default info;
