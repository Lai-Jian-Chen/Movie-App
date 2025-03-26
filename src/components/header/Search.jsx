import React, { useState, useEffect, useRef } from "react";
import tmdbApi from "../../api/tmdbApi";
import { useNavigate, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import "./_header.scss";

const Search = () => {
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
        const topResults = res.data.results.slice(0, 4);
        const movieTitle = topResults.map((result) => {
          return result.title;
        });
        setWords(movieTitle);
      } catch (err) {
        console.log("未搜尋到相關電影...");
      }
    }, 300);
  }, [keyword]);

  useEffect(() => {
    console.log(words);
  }, [words]);

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
    <form action="">
      <button type="submit" className="search_btn" onClick={btnHandler}>
        <CiSearch id="search_icon" />
      </button>
      <input
        type="text"
        className="search_input"
        placeholder="搜尋"
        onChange={inputHandler}
        value={keyword}
      />
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
                }}
              >
                {word}
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
};

export default Search;
