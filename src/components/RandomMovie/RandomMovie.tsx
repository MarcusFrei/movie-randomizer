import React, { useState } from 'react';
import { Movie } from '../../types';

interface RandomMovieProps {
  movies: Movie[];
}

const RandomMovie: React.FC<RandomMovieProps> = ({ movies }) => {
  const [randomMovie, setRandomMovie] = useState<string>('');

  const getRandomMovie = () => {
    const unwatchedMovies = movies.filter((movie) => !movie.watched);
    if (unwatchedMovies.length === 0) {
      setRandomMovie(' фильмов для просмотра ;(');
      return;
    }
    const randomIndex = Math.floor(Math.random() * unwatchedMovies.length);
    setRandomMovie(unwatchedMovies[randomIndex].title);
  };

  return (
    <div>
      <h2>Случайный фильм / сериал:</h2>
      <div className="random">
        <p>
          {randomMovie || 'Нажми, чтобы узнать следующий случайный сериал!'}
        </p>
        <button onClick={getRandomMovie}>Нажми</button>
      </div>
    </div>
  );
};

export default RandomMovie;
