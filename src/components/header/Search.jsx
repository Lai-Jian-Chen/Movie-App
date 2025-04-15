import React, { useState, useEffect, useRef } from "react";
import tmdbApi from "../../api/tmdbApi";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import "./_header.scss";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [words, setWords] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef(null);
  const suggestionRef = useRef(null);
  const searchRef = useRef(null);
  const debounceTimer = useRef(null);
  const navigate = useNavigate();

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
        const topResults = res.data.results.slice(0, 5);
        const movieTitle = topResults.map((result) => {
          return result.title;
        });
        setWords(movieTitle);
        setShowSuggestions(true);
      } catch (err) {
        console.log("未搜尋到相關電影...");
      }
    }, 300);
  }, []);

  const inputHandler = (e) => {
    setKeyword(e.target.value);
    searchRef.current(e.target.value);
  };

  const handleSelect = (word) => {
    navigate(`/DetailPage?keyword=${encodeURIComponent(word.trim())}`);
    setKeyword("");
    setWords([]);
    setShowSuggestions(false);
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        suggestionRef.current &&
        !suggestionRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <form action="">
      <div className="input_group">
        <button type="submit" className="search_btn" onClick={btnHandler}>
          <CiSearch id="search_icon" />
        </button>
        <input
          type="text"
          className="search_input"
          placeholder="搜尋"
          onChange={inputHandler}
          value={keyword}
          ref={inputRef}
          onFocus={() => {
            if (keyword.trim().length > 0) setShowSuggestions(true);
          }}
        />
      </div>
      {showSuggestions && words.length > 0 && (
        <ul className="search_list" ref={suggestionRef}>
          {words.map((word) => {
            return (
              <li key={word} onClick={() => handleSelect(word)}>
                <span key={Math.random()}>{word}</span>
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
};

export default Search;
