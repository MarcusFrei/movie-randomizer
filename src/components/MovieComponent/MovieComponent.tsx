import React from 'react';
import { Movie } from '../../types';
import MovieCard from '../MovieCard/MovieCard';

interface MovieComponentProps {
  movies: Movie[];
  toggleWatched: (id: number) => void;
  editMovie?: (id: number) => void;
  deleteMovie?: (id: number) => void;
  mode: 'watched' | 'list';
  onImageClick?: (id: number) => void;
}

const MovieComponent: React.FC<MovieComponentProps> = ({
  movies,
  toggleWatched,
  editMovie,
  deleteMovie,
  mode,
  onImageClick,
}) => {
  const isWatchedMode = mode === 'watched';

  const filteredMovies = isWatchedMode
    ? movies.filter((movie) => movie.watched)
    : movies.filter((movie) => !movie.watched);

  const handleToggleWatched = (id: number) => {
    toggleWatched(id);
  };

  const handleEditMovie = (id: number) => {
    if (editMovie) {
      editMovie(id);
    }
  };

  const handleDeleteMovie = (id: number) => {
    if (deleteMovie) {
      deleteMovie(id);
    }
  };

  const buttonActions = (movieId: number) =>
    isWatchedMode
      ? [
          {
            text: 'Вернуть в список',
            onClick: () => handleToggleWatched(movieId),
          },
        ]
      : [
          { text: '👁️', onClick: () => handleToggleWatched(movieId) },
          { text: '✏️', onClick: () => handleEditMovie(movieId) },
          { text: '🗑️', onClick: () => handleDeleteMovie(movieId) },
        ];

  return (
    <div>
      <h1>{isWatchedMode ? 'Просмотренные фильмы:' : 'Список фильмов:'}</h1>
      {filteredMovies.length === 0 ? (
        <p>
          {isWatchedMode
            ? 'Список просмотренных фильмов пуст...'
            : 'Фильмов нет...'}
        </p>
      ) : (
        <ul>
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              actions={buttonActions(movie.id)}
              onImageClick={
                onImageClick ? () => onImageClick(movie.id) : undefined
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieComponent;

/// Сделать отдельный компонент карточки - сделано!
/// Типизировать WatchedMovies, а то не сделано! - сделано!
/// https://www.typescriptlang.org/docs/handbook/utility-types.html - !!!ЧИТАТЬ ОБЯЗАТЕЛЬНО!!!
/// Избавится от повторов айдишников - сделано!
/// Комментарии в самом коде, что исправил и тд
/// Убрать лямбды строчка 44 (onClick) - сделано!
/// Объединить компоненты watchedMovies и MovieList - сделано!
/// Закинуть в отдельную урлу рандомный фильм - сделано!
/// Кнопки карточек сделать иконами, а не буковками, не в столбик, а в ряд - сделано, хоть и ненмого иначе!
/// Кнопку добавить опустить под список, а инпуты перенети в модалку, тоже самое с редактированием - сделано!
/// сделать папочку pages, куда передаются отдельно все странички
/// Вы не знаете JS - почитать
/// MofieForm - продолжение банкета
