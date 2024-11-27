import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../../types';
import './RandomMovie.css';

const RandomMovie = () => {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
  const navigate = useNavigate();

  const getMoviesFromLocalStorage = (): Movie[] => {
    const storedMovies = localStorage.getItem('movies');
    return storedMovies ? JSON.parse(storedMovies) : [];
  };

  const getRandomMovie = () => {
    const movies = getMoviesFromLocalStorage();
    const unwatchedMovies = movies.filter((movie) => !movie.watched);

    if (unwatchedMovies.length === 0) {
      setRandomMovie(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * unwatchedMovies.length);
    setRandomMovie(unwatchedMovies[randomIndex]);
  };

  const handleMovieClick = () => {
    if (randomMovie) {
      navigate(`/movie/${randomMovie.id}`);
    }
  };

  return (
    <div>
      <h2>Случайный фильм / сериал:</h2>
      <div className="random">
        <p>
          {randomMovie ? (
            <span onClick={handleMovieClick}>{randomMovie.title}</span>
          ) : (
            'Нажми, чтобы узнать следующий случайный фильм или сериал!'
          )}
        </p>
        <button onClick={getRandomMovie}>Нажми</button>
      </div>
    </div>
  );
};

export default RandomMovie;
