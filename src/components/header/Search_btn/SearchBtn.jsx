import React, { useState, useEffect, useRef } from "react";
import tmdbApi from "../../../api/tmdbApi";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdArrowBackIosNew } from "react-icons/md";
import "./_searchBtn.scss";

const SearchBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [words, setWords] = useState("");
  const searchRef = useRef(null);
  const debounceTimer = useRef(null);

  const debounce = (func, delay) => {
    return function (...args) {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  useEffect(() => {
    searchRef.current = debounce(async (text) => {
      const params = { query: text };
      try {
        const res = await tmdbApi.searchMovie({ params });
        const topResults = res.data.results.slice(0, 8);
        const movieTitle = topResults.map((result) => {
          return result.title;
        });
        setWords(movieTitle);
      } catch (err) {
        console.log("未搜尋到相關電影...");
      }
    }, 300);
  }, [keyword]);

  const inputHandler = (e) => {
    setKeyword(e.target.value);
    searchRef.current(e.target.value);
  };

  const btnHandler = (e) => {
    e.preventDefault();
    if (keyword !== "") {
      navigate(`/DetailPage?keyword=${encodeURIComponent(keyword.trim())}`);
      setKeyword("");
      setWords([]);
    }
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  };

  return (
    <div className="SearchBtn">
      <button
        className={`open_btn ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CiSearch className="open_icon" />
      </button>
      <div className={`Pagination ${isOpen ? "open" : ""}`}>
        <MdArrowBackIosNew
          className="back_btn"
          onClick={() => {
            setIsOpen(!isOpen);
            setKeyword("");
            setWords("");
          }}
        />
        <form action="">
          <div className="input_group">
            <button
              type="submit"
              className="search_btn"
              onClick={(e) => {
                btnHandler(e);
                setIsOpen(!isOpen);
              }}
            >
              <CiSearch className="search_icon" />
            </button>
            <input
              type="text"
              className="search_input"
              placeholder="搜尋"
              onChange={inputHandler}
              value={keyword}
            />
          </div>
          {words.length > 0 && (
            <ul className="search_list">
              {words.map((word) => {
                return (
                  <li
                    key={Math.random()}
                    onClick={() => {
                      navigate(
                        `/DetailPage?keyword=${encodeURIComponent(word.trim())}`
                      );
                      setKeyword("");
                      setWords([]);
                      setIsOpen(!isOpen);
                    }}
                  >
                    <span>{word}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchBtn;
