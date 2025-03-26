import React, { useEffect, useState } from "react";
import { GiRoundStar } from "react-icons/gi";
import "./_infos.scss";

const SectionOne = ({ detail }) => {
  const [date, setDate] = useState("");
  const [score, setScore] = useState("");

  useEffect(() => {
    setDate(detail.release_date);
  }, [detail]);

  useEffect(() => {
    const average = detail?.vote_average?.toFixed(1);
    setScore(average);
  }, [detail]);

  return (
    <section className="left_section">
      <div>
        <h4>上映日期: </h4>
        {date}
      </div>
      <div>
        <h4>評分: </h4>
        <GiRoundStar className="star" />
        {score}/10
      </div>
    </section>
  );
};

export default SectionOne;
