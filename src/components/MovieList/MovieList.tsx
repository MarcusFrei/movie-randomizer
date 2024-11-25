import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { useMovieManager } from '../MovieManager/MovieManager';
import MovieFormModal from '../MovieFormModal/MovieFormModal';

interface MovieListProps {
  mode: 'watched' | 'list';
  onImageClick?: (id: number) => void;
}

const MovieList: React.FC<MovieListProps> = ({ mode, onImageClick }) => {
  const {
    movies,
    editingMovie,
    isModalOpen,
    addMovie,
    toggleWatched,
    editOrUpdateMovie,
    deleteMovie,
    setIsModalOpen,
  } = useMovieManager();

  const isWatchedMode = mode === 'watched';

  const filteredMovies = movies.filter((movie) =>
    isWatchedMode ? movie.watched : !movie.watched
  );

  const handleImageClick = (id: number) => {
    if (onImageClick) onImageClick(id);
  };

  const buttonActions = (movieId: number) => {
    const actions = [
      {
        text: isWatchedMode ? 'Вернуть в список' : '👁️',
        onClick: () => toggleWatched(movieId),
      },
    ];

    if (!isWatchedMode) {
      actions.push(
        { text: '✏️', onClick: () => editOrUpdateMovie(movieId) },
        { text: '🗑️', onClick: () => deleteMovie(movieId) }
      );
    }

    return actions;
  };

  return (
    <div>
      <h1>{isWatchedMode ? 'Просмотренные фильмы' : 'Список фильмов'}</h1>
      <div className="button_block">
        <button onClick={() => setIsModalOpen(true)} className="add_button">
          ➕
        </button>
      </div>
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
              onImageClick={() => handleImageClick(movie.id)}
            />
          ))}
        </ul>
      )}
      <MovieFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialMovie={editingMovie}
        onSubmit={(title, imageUrl, type) =>
          editingMovie
            ? editOrUpdateMovie(editingMovie.id, { title, imageUrl, type })
            : addMovie(title, imageUrl, type)
        }
        buttonText={editingMovie ? 'Обновить' : 'Добавить'}
      />
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
/// Объединить компоненты watchedMovies и MovieList - сделано!
/// Закинуть в отдельную урлу рандомный фильм - сделано!
/// Кнопки карточек сделать иконами, а не буковками, не в столбик, а в ряд - сделано, хоть и ненмого иначе!
/// Кнопку добавить опустить под список, а инпуты перенети в модалку, тоже самое с редактированием - сделано!
/// сделать папочку pages, куда передаются отдельно все странички
/// Вы не знаете JS - почитать
/// MofieForm - продолжение банкета
