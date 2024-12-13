import { useState, useEffect } from 'react';
import { Movie } from '../../types';
import { filterMovies } from '../../utils/utils';

export const useMovieManagement = () => {
  const storedMovies = localStorage.getItem('movies') ?? '';
  const [movies, setMovies] = useState<Movie[]>(JSON.parse(storedMovies) ?? []);

  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  }, [movies]);

  const addMovie = (movie: Omit<Movie, 'id'>): void => {
    const newMovie: Movie = {
      id: movies.length > 0 ? Math.max(...movies.map((m) => m.id)) + 1 : 1,
      ...movie,
    };
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };

  const updateMovie = (id: number, updates: Partial<Movie>): void => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, ...updates } : movie
      )
    );
  };

  return {
    movies,
    setMovies,
    addMovie,
    updateMovie,
    filterMovies: (isWatchedMode: boolean) =>
      filterMovies(movies, isWatchedMode),
  };
};
