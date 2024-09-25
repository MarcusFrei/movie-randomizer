import React from 'react';
import { Movie } from '../../types';

interface MovieCardProps {
  movie: Movie;
  actions: { text: string; onClick: (id: number) => void }[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, actions }) => {
  return (
    <li className={movie.watched ? 'watched' : ''}>
      <p>{movie.title}</p>
      {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} />}
      {actions.map(({ text, onClick }) => (
        <button key={text} onClick={() => onClick(movie.id)}>
          {text}
        </button>
      ))}
    </li>
  );
};

export default MovieCard;

/// Вынес отдельный компонент карточки, чтобы его можно было удобно внедрять, если проект будет расширяться и добавляться новые вкладки,
/// это позволит каждый раз не рисовать каждый раз карточку по новой
