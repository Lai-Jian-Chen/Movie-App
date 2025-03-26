import React from "react";
import apiConfig from "../../api/apiConfig";
import "./_homePage.scss";
import { useNavigate } from "react-router-dom";

const BackgroundCarousel = ({ movies, currentIndex }) => {
  const navigate = useNavigate();
  return (
    <div className="backgroundCarousel">
      {movies.map((movie, index) => {
        const img = apiConfig.originalImage(
          movie?.backdrop_path || movie?.poster_path
        );
        return (
          <div
            key={movie.id}
            style={{ backgroundImage: `url(${img})` }}
            className={`carousel-slide ${
              index === currentIndex ? "active" : ""
            }`}
            onClick={() =>
              navigate(
                `/DetailPage?keyword=${encodeURIComponent(movie.title.trim())}`
              )
            }
          ></div>
        );
      })}
    </div>
  );
};

export default BackgroundCarousel;
