import { useNavigate } from 'react-router';
import { Movie } from '../../types';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
  actions: { text: string; onClick: (id: number) => void }[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, actions }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/movie/${movie.id}`);
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
        {actions.map(({ text }) => (
          <button
            key={text}
            onClick={() =>
              actions.find((action) => action.text === text)?.onClick(movie.id)
            }
          >
            {text}
          </button>
        ))}
      </div>
    </li>
  );
};

export default MovieCard;

/// Вынес отдельный компонент карточки, чтобы его можно было удобно внедрять, если проект будет расширяться и добавляться новые вкладки,
/// это позволит каждый раз не рисовать каждый раз карточку по новой
/// findAction - исправить типизацию
