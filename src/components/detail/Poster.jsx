import React, { useEffect, useState } from "react";
import "./_detail.scss";
import apiConfig from "../../api/apiConfig";

const Poster = ({ result }) => {
  const [moviePoster, setMoviePoster] = useState(null);

  useEffect(() => {
    setMoviePoster(apiConfig.w500Image(result?.poster_path));
  }, [result]);

  return (
    <div className="movie_poster">
      {moviePoster ? (
        <img src={moviePoster} />
      ) : (
        <div className="poster_fallback">無圖片</div>
      )}
    </div>
  );
};

export default Poster;
