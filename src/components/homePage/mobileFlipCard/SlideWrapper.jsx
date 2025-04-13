import React from "react";
import apiConfig from "../../../api/apiConfig";
import "./_mobileFlipCard.scss";

const SlideWrapper = ({ extendedMovies, currentIndex, realIndex }) => {
  return (
    <div className="SlideWrapper">
      {extendedMovies.map((movie, index) => {
        const img = apiConfig.originalImage(movie?.backdrop_path);
        return (
          <div
            key={`${movie.id}-${index}`}
            style={{
              backgroundImage: `url(${img})`,
              transition: "opacity 0.8s ease, transform 0.8s ease",
              opacity: index === realIndex ? 1 : 0,
              transform: index === realIndex ? "scale(1)" : "scale(1.1)",
            }}
            className={`carousel-slide ${
              index === currentIndex ? "active" : ""
            }`}
          ></div>
        );
      })}
    </div>
  );
};

export default SlideWrapper;
