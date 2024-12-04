import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import MovieFormModal from '../MovieFormModal/MovieFormModal';
import { Movie } from '../../types';

const MovieList: React.FC = () => {
  const storedMovies = localStorage.getItem('movies') ?? '';
  const [movies, setMovies] = useState<Movie[]>(JSON.parse(storedMovies) ?? []);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  }, [movies]);

  const addMovie = (
    title: string,
    imageUrl: string,
    type: 'movie' | 'series',
    watched: boolean
  ) => {
    const newMovie: Movie = {
      id: movies.length + 1,
      title,
      imageUrl,
      type,
      watched,
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
    movieData?: {
      title: string;
      imageUrl: string;
      type: 'movie' | 'series';
      watched: boolean;
    }
  ) => {
    if (movieData) {
      const { title, imageUrl, type, watched } = movieData;
      setMovies(
        movies.map((movie) =>
          movie.id === id ? { ...movie, title, imageUrl, type, watched } : movie
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
        onSubmit={(title, imageUrl, type, watched) =>
          editingMovie
            ? editOrUpdateMovie(editingMovie.id, {
                title,
                imageUrl,
                type,
                watched,
              })
            : addMovie(title, imageUrl, type, watched)
        }
        buttonText={editingMovie ? 'Обновить' : 'Добавить'}
      />
    </div>
  );
};

export default MovieList;
