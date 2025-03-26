import React, { useEffect, useState } from "react";
import "./_infos.scss";

const SectionTwo = ({ detail }) => {
  const [revenue, setRevenue] = useState("");
  const [runtime, setRuntime] = useState(null);

  const formatRevenue = (num) => {
    if (!num || typeof num !== "number") return "未知";

    if (num >= 1_0000_0000) {
      return (num / 1_0000_0000).toFixed(2).replace(/\.00$/, "") + " 億美元";
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(2).replace(/\.00$/, "") + " 百萬美元";
    } else {
      return Math.floor(num).toLocaleString() + " 美元";
    }
  };

  useEffect(() => {
    const revenueJudge = formatRevenue(detail.revenue);
    setRevenue(revenueJudge);
  }, [detail]);

  useEffect(() => {
    setRuntime(detail.runtime);
  }, [detail]);

  return (
    <section className="right_section">
      <div>
        <h4>票房: </h4>
        {revenue}
      </div>
      <div>
        <h4>片長: </h4>
        {runtime}分鐘
      </div>
    </section>
  );
};

export default SectionTwo;
