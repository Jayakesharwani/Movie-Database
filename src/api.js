const API_KEY = '5b097c94d4edd3a95f516fe82733b3dc'

export const API_STATUS = {
  INITIAL: 'INITIAL',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  IN_PROGRESS: 'IN_PROGRESS',
}

export const BASE_URL = 'https://api.themoviedb.org/3'

export const IMG_URL = 'https://image.tmdb.org/t/p/w500'

export const endpoints = {
  popular: page => `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
  topRated: page =>
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`,
  upcoming: page =>
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`,
  movieDetails: id => `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
  cast: id => `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`,
  search: (query, page) =>
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
}
