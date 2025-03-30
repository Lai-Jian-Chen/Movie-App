import React, { useEffect, useState } from "react";
import { GiRoundStar } from "react-icons/gi";
import "./_homePage.scss";
import { useNavigate } from "react-router-dom";

const MovieTitle = ({ movies, currentIndex }) => {
  const [Title, setTitle] = useState([0]);
  const [movieAverage, setAverage] = useState("");
  const [titleSlide, setTitleSlide] = useState("slide-in");
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(
      movies.map((movie) => {
        return movie.title;
      })
    );
  }, [movies]);

  useEffect(() => {
    setAverage(
      movies.map((movie) => {
        const average = movie.vote_average.toFixed(1);
        return average;
      })
    );
  }, [movies]);

  useEffect(() => {
    setTitleSlide("slide-out");
    const timer = setTimeout(() => {
      setTitleSlide("slide-in");
    }, 4600);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className={`movieTitle ${titleSlide}`}>
      <h1
        className="title"
        onClick={() =>
          navigate(
            `/DetailPage?keyword=${encodeURIComponent(
              Title[currentIndex].trim()
            )}`
          )
        }
      >
        {Title[0]}
      </h1>
      <div className="average_star">
        <GiRoundStar className="star" />
        <h3 className="average">{movieAverage[currentIndex]}</h3>
      </div>
    </div>
  );
};

export default MovieTitle;
