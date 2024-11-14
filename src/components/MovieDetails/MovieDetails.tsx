import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie, Season } from '../../types';
import SeasonsManager from '../SeasonManager/SeasonManager';
import './MovieDetails.css';

interface MovieDetailsProps {
  movies: Movie[];
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movies }) => {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  const movie = movies.find((m) => m.id === movieId);
  const [seasons, setSeasons] = useState<Season[]>([]);

  useEffect(() => {
    if (movie) {
      const storedMovies = localStorage.getItem('movies');
      if (storedMovies) {
        const parsedMovies: Movie[] = JSON.parse(storedMovies);
        const currentMovie = parsedMovies.find((m) => m.id === movie.id);

        if (currentMovie && currentMovie.seasonsList) {
          setSeasons(currentMovie.seasonsList);
        }
      }
    }
  }, [movie]);

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
        Фильм не найден, понятия не имею как так вышло и удивлён, что вообще
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
        savedSeasons={seasons}
        onUpdate={saveSeasonsToLocalStorage}
      />
    </div>
  );
};

export default MovieDetails;
