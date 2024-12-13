import { Movie, Square } from '../types';

const createSquares = (count: number): Square[] =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    isWatched: false,
  }));

export const getMovieById = (
  movies: Movie[],
  id: number
): Movie | undefined => {
  return movies.find((movie) => movie.id === id);
};

export const filterMovies = (
  movies: Movie[],
  isWatchedMode: boolean
): Movie[] => {
  return movies.filter((movie) =>
    isWatchedMode ? movie.watched : !movie.watched
  );
};

export default createSquares;
