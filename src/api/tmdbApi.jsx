import axiosClient from "./axiosClient";

export const movieType = {
  popular: "popular",
  upcoming: "upcoming",
  top_rated: "top_rated",
};

const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = "movie/" + movieType[type];
    return axiosClient.get(url, params);
  },
  searchMovie: (params) => {
    const url = "search/movie";
    return axiosClient.get(url, params);
  },
  getDetail: (id, params) => {
    const url = `movie/${id}`;
    return axiosClient.get(url, params);
  },
  getCredits: (id, params) => {
    const url = `movie/${id}/credits`;
    return axiosClient.get(url, params);
  },
};

export default tmdbApi;
