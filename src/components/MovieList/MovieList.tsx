import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import MovieFormModal from '../MovieFormModal/MovieFormModal';
import { useMovieManagement } from '../useMovieManagement/useMovieManagement';
import { Movie } from '../../types';

const MovieList: React.FC = () => {
  const {
    movies,
    addMovie,
    toggleWatched,
    editMovie,
    deleteMovie,
    getMovieById,
    filterMovies,
  } = useMovieManagement();

  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isWatchedMode = !(location.pathname === '/');

  const handleImageClick = (id: number) => {
    navigate(`/movie/${id}`);
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
        {
          text: '✏️',
          onClick: () => {
            const movie = getMovieById(movieId);
            if (movie) {
              setEditingMovie(movie);
              setIsModalOpen(true);
            }
          },
        },
        {
          text: '🗑️',
          onClick: () => deleteMovie(movieId),
        }
      );
    }

    return actions;
  };

  const openAddMovieModal = () => {
    setEditingMovie(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (movieData: Omit<Movie, 'id'>) => {
    if (editingMovie) {
      editMovie(editingMovie.id, movieData);
    } else {
      addMovie(movieData);
    }
    setIsModalOpen(false);
    setEditingMovie(null);
  };

  const filteredMovies = filterMovies(isWatchedMode);

  return (
    <div>
      <div className="header-block">
        <h1>{isWatchedMode ? 'Просмотренные фильмы' : 'Список фильмов'}</h1>
        <div className="button_block">
          <button onClick={openAddMovieModal} className="add_button">
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
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default MovieList;
