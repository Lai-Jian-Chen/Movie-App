const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "0ed5a41be570c59e7e3f2c36f3d431bd",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  language: "zh-TW",
};

export default apiConfig;
