import MovieCard from '../MovieCard/MovieCard';
import { useMovieManager } from '../MovieManager/MovieManager';
import MovieFormModal from '../MovieFormModal/MovieFormModal';
import { useLocation, useNavigate } from 'react-router-dom';

const MovieList = () => {
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

  const location = useLocation();
  const { pathname } = location;
  const isWatchedMode = !(pathname === '/');

  const navigate = useNavigate();
  const handleImageClick = (id: number) => {
    navigate(`/movie/${id}`);
  };

  const filteredMovies = movies.filter((movie) =>
    isWatchedMode ? movie.watched : !movie.watched
  );

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
      <div className="header-block">
        <h1>{isWatchedMode ? 'Просмотренные фильмы' : 'Список фильмов'}</h1>
        <div className="button_block">
          <button onClick={() => setIsModalOpen(true)} className="add_button">
            ➕
          </button>
        </div>
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
