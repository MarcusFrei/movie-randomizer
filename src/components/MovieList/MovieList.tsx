import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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

  const isWatchedMode = !(location.pathname === '/');

  // const toggleModal =

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
