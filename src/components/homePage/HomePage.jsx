import React, { useState, useEffect } from "react";
import tmdbApi, { movieType } from "../../api/tmdbApi";
import BackgroundCarousel from "./BackgroundCarousel";
import "./_homePage.scss";
import MovieTitle from "./MovieTitle";

const MainBody = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const params = { page: 1 };
    const fetchMovies = async () => {
      try {
        const res = await tmdbApi.getMoviesList(movieType.top_rated, {
          params,
        });
        setMovies(res.data.results.slice(0, 10));
      } catch (err) {
        console.log("載入電影失敗", err);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev === movies.length - 1 ? 0 : prev + 1;
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [movies]);

  return (
    <div className="homePage">
      <BackgroundCarousel movies={movies} currentIndex={currentIndex} />
      <MovieTitle movies={movies} currentIndex={currentIndex} />
    </div>
  );
};

export default MainBody;
