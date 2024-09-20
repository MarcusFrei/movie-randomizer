import React, { useState } from 'react';

const RandomMovie = ({ movies }) => {
  const [randomMovie, setRandomMovie] = useState('');

  const getRandomMovie = () => {
    const unwatchedMovies = movies.filter((movie) => !movie.watched);
    if (unwatchedMovies.length === 0) return 'Нет фильмов для просмотра ;(';
    const randomIndex = Math.floor(Math.random() * unwatchedMovies.length);
    setRandomMovie(unwatchedMovies[randomIndex].title);
  };

  return (
    <div>
      <h2>Случайный фильм / сериал:</h2>
      <div className="random">
        <p>{randomMovie || 'Нажми, чтобы узнать следущий случайный сериал!'}</p>
        <button onClick={getRandomMovie}>Нажми</button>
      </div>
    </div>
  );
};

export default RandomMovie;
