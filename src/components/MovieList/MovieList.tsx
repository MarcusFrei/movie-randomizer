import React from 'react';
import { Movie } from '../../types';
import MovieCard from '../MovieCard/MovieCard';

interface MovieListProps {
  movies: Movie[];
  toggleWatched: (id: number) => void;
  editMovie: (id: number) => void;
  deleteMovie: (id: number) => void;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  toggleWatched,
  editMovie,
  deleteMovie,
}) => {
  const buttonActions = [
    { text: 'Просмотрено', onClick: toggleWatched },
    { text: 'Редактировать', onClick: editMovie },
    { text: 'Удалить', onClick: deleteMovie },
  ];

  /// В массиве movies мы фильтруем дубликаты, используя метод filter с проверкой через findIndex, чтобы каждый id был уникальным

  const uniqueMovies = movies.filter(
    (movie, index, self) => index === self.findIndex((m) => m.id === movie.id)
  );

  return (
    <div>
      <h2>Великий список Анансьи и Марка:</h2>
      <ul>
        {uniqueMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} actions={buttonActions} />
        ))}
      </ul>
    </div>
  );
};

export default MovieList;

/// Сделать отдельный компонент карточки - сделано!
/// Типизировать WatchedMovies, а то не сделано! - сделано!
/// https://www.typescriptlang.org/docs/handbook/utility-types.html - читать ОБЯЗАТЕЛЬНО!!!
/// Избавится от повторов айдишников - сделано!
/// Комментарии в самом коде, что исправил и тд
/// Убрать лямбды строчка 44 (onClick) - сделано!
