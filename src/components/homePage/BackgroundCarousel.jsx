import React from "react";
import apiConfig from "../../api/apiConfig";
import "./_homePage.scss";

const BackgroundCarousel = ({ movies, currentIndex }) => {
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
          ></div>
        );
      })}
    </div>
  );
};

export default BackgroundCarousel;
