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
    { text: '👁️', onClick: toggleWatched },
    { text: '✏️', onClick: editMovie },
    { text: '🗑️', onClick: deleteMovie },
  ];

  const uniqueMovies = movies.filter(
    (movie, index, self) => index === self.findIndex((m) => m.id === movie.id)
  );

  return (
    <div>
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
/// https://www.typescriptlang.org/docs/handbook/utility-types.html - !!!ЧИТАТЬ ОБЯЗАТЕЛЬНО!!!
/// Избавится от повторов айдишников - сделано!
/// Комментарии в самом коде, что исправил и тд
/// Убрать лямбды строчка 44 (onClick) - сделано!
/// Объединить компоненты watchedMovies и MovieList
/// Закинуть в отдельную урлу рандомный фильм - сделано!
/// Кнопки карточек сделать иконами, а не буковками, не в столбик, а в ряд - сделано, хоть и ненмого иначе!
/// Кнопку добавить опустить под список, а инпуты перенети в модалку, тоже самое с редактированием - сделано!
/// сделать папочку pages, куда передаются отдельно все странички
/// Вы не знаете JS - почитать
/// MofieForm - продолжение банкета
