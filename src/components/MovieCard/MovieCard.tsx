import React from 'react';
import { useNavigate } from 'react-router';
import { Movie } from '../../types';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
  isWatchedMode: boolean;
  updateMovie: (id: number, updates: Partial<Movie>) => void;
  deleteMovie: (id: number) => void;
  onEdit?: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isWatchedMode,
  updateMovie,
  deleteMovie,
  onEdit,
}) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const toggleWatched = () => {
    updateMovie(movie.id, { watched: !movie.watched });
  };

  const handleEdit = () => {
    onEdit?.(movie);
  };

  const handleDelete = () => {
    deleteMovie(movie.id);
  };

  const buttonActions = [
    {
      text: isWatchedMode ? 'Вернуть в список' : '👁️',
      onClick: toggleWatched,
    },
    ...(!isWatchedMode
      ? [
          {
            text: '✏️',
            onClick: handleEdit,
          },
          {
            text: '🗑️',
            onClick: handleDelete,
          },
        ]
      : []),
  ];

  return (
    <li className={`${movie.watched ? 'watched' : ''} card_li`}>
      <p>{movie.title}</p>
      {movie.imageUrl && (
        <img
          src={movie.imageUrl}
          alt={movie.title}
          onClick={handleImageClick}
        />
      )}
      <div className="card_buttons">
        {buttonActions.map(({ text, onClick }) => (
          <button key={text} onClick={onClick}>
            {text}
          </button>
        ))}
      </div>
    </li>
  );
};

export default MovieCard;
