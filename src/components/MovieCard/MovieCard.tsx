import { Movie } from '../../types';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
  actions: { text: string; onClick: (id: number) => void }[];
  onImageClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  actions,
  onImageClick,
}) => {
  return (
    <li className={`${movie.watched ? 'watched' : ''} card_li`}>
      <p>{movie.title}</p>
      {movie.imageUrl && (
        <img
          src={movie.imageUrl}
          alt={movie.title}
          onClick={() => onImageClick(movie)}
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
