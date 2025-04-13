import React, { useState, useEffect } from "react";
import FlipCard from "../../detail/flipCard/FlipCard";
import tmdbApi from "../../../api/tmdbApi";
import SlideWrapper from "../mobileFlipCard/SlideWrapper";
import "./_mobileFlipCard.scss";

export const MobileFlipCard = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [detail, setDetail] = useState("");
  const [staff, setStaff] = useState(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isTransitioning, setTransition] = useState(true);
  const [prevIndex, setPrevIndex] = useState(null);
  const [realIndex, setRealIndex] = useState(currentIndex);
  const [lockRealIndex, setLockRealIndex] = useState(false);

  const extendedMovies = [movies[movies.length - 1], ...movies, movies[0]];

  const handlerNext = (e) => {
    setTransition(true);
    setPrevIndex(currentIndex);
    const nextIndex = currentIndex + 1;
    if (nextIndex === extendedMovies.length - 1) {
      setRealIndex(1);
      setLockRealIndex(true);
    } else if (!lockRealIndex) {
      setRealIndex(nextIndex);
    }
    setCurrentIndex((prev) => {
      return (prev + 1) % extendedMovies.length;
    });
  };

  const handlerPrev = (e) => {
    setTransition(true);
    setPrevIndex(currentIndex);
    const prevIndex = currentIndex - 1;
    if (prevIndex === 0) {
      setRealIndex(extendedMovies.length - 2);
      setLockRealIndex(true);
    } else if (!lockRealIndex) {
      setRealIndex(prevIndex);
    }
    setCurrentIndex((prev) => {
      return prev === 0 ? extendedMovies.length - 1 : prev - 1;
    });
  };

  useEffect(() => {
    if (currentIndex == 0) {
      setTimeout(() => {
        setTransition(false);
        setCurrentIndex(extendedMovies.length - 2);
        setLockRealIndex(false);
      }, 400);
    }
    if (currentIndex === extendedMovies.length - 1) {
      setTimeout(() => {
        setTransition(false);
        setCurrentIndex(1);
        setLockRealIndex(false);
      }, 400);
    }
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

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await tmdbApi.getDetail(extendedMovies[currentIndex].id, {
          params: {},
        });
        setDetail(res.data);
      } catch (err) {
        console.log("搜尋電影資訊失敗");
        console.log(err);
      }
    };
    fetchDetail();
  }, [movies, currentIndex]);

  useEffect(() => {
    if (detail) {
      const fetchStaff = async () => {
        try {
          const res = await tmdbApi.getCredits(
            extendedMovies[currentIndex].id,
            {
              params: {},
            }
          );
          setStaff(res.data);
        } catch (err) {
          console.log(err);
          console.log("蒐集演員資訊失敗");
        }
      };
      fetchStaff();
    }
  }, [movies, currentIndex]);

  useEffect(() => {}, []);

  return (
    <div className="MobileFlipCard">
      <SlideWrapper
        extendedMovies={extendedMovies}
        currentIndex={currentIndex}
        realIndex={realIndex}
      />
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
              {(index === currentIndex || index === prevIndex) && (
                <FlipCard
                  result={movie}
                  detail={detail}
                  staff={staff}
                  overview={detail?.overview ?? ""}
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
