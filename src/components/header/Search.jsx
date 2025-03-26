import React, { useState, useEffect, useRef } from "react";
import tmdbApi from "../../api/tmdbApi";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import "./_header.scss";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [words, setWords] = useState("");
  const searchRef = useRef(null);

  const debounce = (func, delay) => {
    let timeId;
    return function (...args) {
      clearTimeout(timeId);
      timeId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const inputHandler = (e) => {
    setKeyword(e.target.value);
    searchRef.current(e.target.value);
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
    }, 500);
  }, []);

  useEffect(() => {
    if (words.length != 0) {
      console.log(words);
    }
  }, [words]);

  const btnHandler = (e) => {
    e.preventDefault();
    if (keyword !== "") {
      navigate(`/DetailPage?keyword=${encodeURIComponent(keyword.trim())}`);
      setKeyword("");
      setWords([]);
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
