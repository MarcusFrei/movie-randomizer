import { useState, useEffect } from 'react';
import { Movie } from '../../types';

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
      id: movies.length + 1,
      ...movie,
    };
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };

  const toggleWatched = (id: number): void => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  const editMovie = (id: number, movieData: Omit<Movie, 'id'>): void => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, ...movieData } : movie
      )
    );
  };

  const deleteMovie = (id: number): void => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  const getMovieById = (id: number): Movie | undefined => {
    return movies.find((movie) => movie.id === id);
  };

  const filterMovies = (isWatchedMode: boolean): Movie[] => {
    return movies.filter((movie) =>
      isWatchedMode ? movie.watched : !movie.watched
    );
  };

  return {
    movies,
    addMovie,
    toggleWatched,
    editMovie,
    deleteMovie,
    getMovieById,
    filterMovies,
  };
};
