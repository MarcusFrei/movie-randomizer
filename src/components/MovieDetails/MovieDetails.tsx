import { useParams } from 'react-router-dom';
import { Movie, Season } from '../../types';
import SeasonsManager from '../SeasonManager/SeasonManager';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const getMovieFromLocalStorage = (movieId: number): Movie | undefined => {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      const movies: Movie[] = JSON.parse(storedMovies);
      return movies.find((m) => m.id === movieId);
    }
    return undefined;
  };

  const movie = getMovieFromLocalStorage(movieId);

  const saveSeasonsToLocalStorage = (updatedSeasons: Season[]) => {
    if (movie) {
      const storedMovies = localStorage.getItem('movies');
      if (storedMovies) {
        const parsedMovies: Movie[] = JSON.parse(storedMovies);
        const updatedMovies = parsedMovies.map((m) =>
          m.id === movie.id ? { ...m, seasonsList: updatedSeasons } : m
        );
        localStorage.setItem('movies', JSON.stringify(updatedMovies));
      }
    }
  };

  if (!movie) {
    return (
      <div>
        Фильм не найден, понятия не имею, как так вышло, и удивлён, что вообще
        видишь это сообщение!
      </div>
    );
  }

  return (
    <div className="movie-details">
      <div className="movie-header">
        <img src={movie.imageUrl} alt={movie.title} className="movie-image" />
        <div className="movie-info">
          <h1 className="movie-name">
            {movie.type === 'series' ? 'Сериал:' : 'Фильм:'} {movie.title}
          </h1>
          <p>Статус: {movie.watched ? 'Просмотрено' : 'Не просмотрено'}</p>
        </div>
      </div>

      <SeasonsManager
        movieId={movieId}
        savedSeasons={movie.seasonsList ?? []}
        onUpdate={saveSeasonsToLocalStorage}
      />
    </div>
  );
};

export default MovieDetails;
