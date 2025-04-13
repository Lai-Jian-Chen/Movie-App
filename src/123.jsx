import React, { useState, useEffect } from "react";
import FlipCard from "../../detail/flipCard/FlipCard";
import tmdbApi from "../../../api/tmdbApi";
import apiConfig from "../../../api/apiConfig";
import "./_mobileFlipCard.scss";

const MobileFlipCard = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isTransitioning, setTransition] = useState(true);
  const [bufferData, setBufferData] = useState({});
  const [visibleIndices, setVisibleIndices] = useState([currentIndex]);

  const extendedMovies = [movies[movies.length - 1], ...movies, movies[0]];

  const safeIndex = (i) => {
    if (i < 0) return extendedMovies.length - 2;
    if (i >= extendedMovies.length) return 1;
    return i;
  };

  const fetchAll = async (index) => {
    const indices = [
      safeIndex(index),
      safeIndex(index - 1),
      safeIndex(index + 1),
    ];

    const newData = {};

    for (let idx of indices) {
      const id = extendedMovies[idx].id;
      if (!bufferData[id]) {
        try {
          const detailRes = await tmdbApi.getDetail(id, {
            params: {},
          });
          const staffRes = await tmdbApi.getCredits(id, {
            params: {},
          });
          newData[id] = {
            detail: detailRes.data,
            staff: staffRes.data,
          };
        } catch (err) {
          console.log("預抓資料失敗");
          console.log(err);
        }
      }
    }
    setBufferData((prev) => ({ ...prev, ...newData }));
  };

  useEffect(() => {
    fetchAll(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex == 0) {
      setTimeout(() => {
        setTransition(false);
        setCurrentIndex(extendedMovies.length - 2);
      }, 400);
    }
    if (currentIndex === extendedMovies.length - 1) {
      setTimeout(() => {
        setTransition(false);
        setCurrentIndex(1);
      }, 400);
    }
    setTransition(true);
  }, [currentIndex]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = touchStartX - endX;
    if (Math.abs(diff) > 70 && Math.abs(diff) < 350) {
      if (diff > 0) {
        handlerNext();
      } else {
        handlerPrev();
      }
    }
  };

  const handlerNext = async (e) => {
    const nextIndex = safeIndex(currentIndex + 1);
    await fetchAll(nextIndex);
    setVisibleIndices([currentIndex, nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const handlerPrev = async (e) => {
    const prevIndex = safeIndex(currentIndex - 1);
    await fetchAll(prevIndex);
    setVisibleIndices([currentIndex, prevIndex]);
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleIndices([currentIndex]);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const isDataReady = (movie) => {
    const data = bufferData[movie.id];
    return (
      data &&
      data.detail &&
      data.staff &&
      typeof data.detail.overview === "string"
    );
  };

  useEffect(() => {
    // const indices = [
    //   safeIndex(currentIndex),
    //   safeIndex(currentIndex - 1),
    //   safeIndex(currentIndex + 1),
    // ];
    //   indices.forEach((i) => {
    //     const id = extendedMovies[i].id;
    //     if (!bufferData[id]) {
    //       console.log(`❌ 卡片 ${i}（ID: ${id}）還沒準備好`);
    //     } else {
    //       console.log(`✅ 卡片 ${i}（ID: ${id}）準備好了`);
    //     }
    //   });
    console.log(isTransitioning);
  }, [currentIndex]);

  return (
    <div className="MobileFlipCard">
      {extendedMovies.map((movie, index) => {
        const img = apiConfig.originalImage(movie?.backdrop_path);
        return (
          <div
            key={`${movie.id}-${index}`}
            style={{ backgroundImage: `url(${img})` }}
            className={`carousel-slide ${
              index === currentIndex ? "active" : ""
            }`}
          ></div>
        );
      })}
      <div className="group">
        <div
          className="slider_wrapper"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? "transform 0.4s ease-in-out" : "none",
            width: `${extendedMovies.length * 100}%`,
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {extendedMovies.map((movie, index) => (
            <div className="slider_item" key={`${movie.id}-${index}`}>
              {visibleIndices.includes(index) && isDataReady(movie) && (
                <FlipCard
                  result={movie}
                  detail={bufferData[movie.id].detail}
                  staff={bufferData[movie.id].staff}
                  overview={bufferData[movie.id].detail?.overview}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileFlipCard;
