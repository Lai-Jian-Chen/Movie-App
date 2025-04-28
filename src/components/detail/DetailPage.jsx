import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import "./_detail.scss";
import Poster from "./Poster";
import Info from "./Infos/Info";
import FlipCard from "./flipCard/FlipCard";

const DetailPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [result, setResult] = useState({});
  const [movieOriginal, setMovieOriginal] = useState(null);
  const [detail, setDetail] = useState(null);
  const [staff, setStaff] = useState({ cast: [] });

  useEffect(() => {
    const params = { query: keyword };
    const fetchMovies = async () => {
      try {
        const res = await tmdbApi.searchMovie({ params });
        setResult(res.data.results[0]);
      } catch (err) {
        console.log("搜尋電影失敗");
        console.log(err);
      }
    };
    fetchMovies();
  }, [keyword]);

  useEffect(() => {
    if (!result) {
      alert("找不到這部電影");
      setDetail(null);
      setStaff(null);
      console.log("失敗");
      navigate("/");
      return;
    }
    const fetchDetail = async () => {
      try {
        const res = await tmdbApi.getDetail(result.id, { params: {} });
        setDetail(res.data);
      } catch (err) {
        console.log("搜尋電影資訊失敗");
        console.log(err);
      }
    };
    fetchDetail();
  }, [result]);

  useEffect(() => {
    if (detail) {
      const fetchStaff = async () => {
        try {
          const res = await tmdbApi.getCredits(detail?.id, { params: {} });
          setStaff(res.data);
        } catch (err) {
          console.log(err);
          console.log("蒐集演員資訊失敗");
        }
      };
      fetchStaff();
    }
  }, [detail]);

  useEffect(() => {
    if (result) {
      setMovieOriginal(apiConfig.originalImage(result?.backdrop_path));
    }
  }, [detail]);

  return (
    <>
      {detail && (
        <div className="detail_page">
          <div
            className="background_img"
            style={{ backgroundImage: `url(${movieOriginal})` }}
          ></div>
          <div className="detail_body">
            <Poster result={result} />
            <div className="detail_font">
              <Info detail={detail} staff={staff} />
              <div className="overview">{detail.overview}</div>
            </div>
          </div>
          <FlipCard
            result={result}
            detail={detail}
            staff={staff}
            overview={detail.overview}
          />
        </div>
      )}
    </>
  );
};

export default DetailPage;
