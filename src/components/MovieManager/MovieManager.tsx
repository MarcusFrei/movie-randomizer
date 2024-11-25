import { useEffect, useState } from 'react';
import { Movie } from '../../types';

export const useMovieManager = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  }, [movies]);

  const addMovie = (
    title: string,
    imageUrl: string,
    type: 'movie' | 'series'
  ) => {
    const newMovie: Movie = {
      id: movies.length + 1,
      title,
      imageUrl,
      watched: false,
      type,
      seasons: type === 'series' ? [] : undefined,
    };
    setMovies([...movies, newMovie]);
    setIsModalOpen(false);
  };

  const toggleWatched = (id: number) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };
  const editOrUpdateMovie = (
    id: number,
    movieData?: { title: string; imageUrl: string; type: 'movie' | 'series' }
  ) => {
    if (movieData) {
      const { title, imageUrl, type } = movieData;
      setMovies(
        movies.map((movie) =>
          movie.id === id ? { ...movie, title, imageUrl, type } : movie
        )
      );
      setEditingMovie(null);
      setIsModalOpen(false);
    } else {
      const movie = movies.find((movie) => movie.id === id);
      if (movie) {
        setEditingMovie(movie);
        setIsModalOpen(true);
      }
    }
  };

  const deleteMovie = (id: number) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return {
    movies,
    editingMovie,
    isModalOpen,
    addMovie,
    toggleWatched,
    editOrUpdateMovie,
    deleteMovie,
    setIsModalOpen,
  };
};
