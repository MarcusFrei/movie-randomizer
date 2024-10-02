import { Movie } from '../../types';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
  actions: { text: string; onClick: (id: number) => void }[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, actions }) => {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = event.currentTarget.id.split('__')[0];
    const findAction = actions.find((action) => action.text === buttonId);
    if (findAction) {
      findAction.onClick(movie.id);
    }
  };

  return (
    <li className={`${movie.watched ? 'watched' : ''} card_li`}>
      <p>{movie.title}</p>
      {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} />}
      <div className="card_buttons">
        {actions.map(({ text }) => (
          <button
            key={text}
            onClick={handleButtonClick}
            id={`${text}__${movie.id}`}
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
