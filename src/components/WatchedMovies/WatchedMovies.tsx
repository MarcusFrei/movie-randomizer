import React from 'react';
import { Movie } from '../../types';
import MovieCard from '../MovieCard/MovieCard';

interface WatchedMoviesProps {
  movies: Movie[];
  toggleWatched: (id: number) => void;
}

const WatchedMovies: React.FC<WatchedMoviesProps> = ({
  movies,
  toggleWatched,
}) => {
  const watchedMovies = movies.filter((movie) => movie.watched);
  const buttonActions = [{ text: 'Вернуть в список', onClick: toggleWatched }];

  return (
    <div>
      <h1>Просмотренные фильмы</h1>
      {watchedMovies.length === 0 ? (
        <p>Список просмотренных фильмов пуст...</p>
      ) : (
        <ul>
          {watchedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} actions={buttonActions} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default WatchedMovies;
