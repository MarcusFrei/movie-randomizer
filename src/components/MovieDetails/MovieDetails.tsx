import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie, Square, Season } from '../../types';
import './MovieDetails.css';

interface MovieDetailsProps {
  movies: Movie[];
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movies }) => {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  const movie = movies.find((m) => m.id === movieId);

  // Состояние для сезонов
  const [seriesCount, setSeriesCount] = useState<string>('');
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [editingSeason, setEditingSeason] = useState<Season | null>(null);

  const createSquares = (count: number): Square[] =>
    Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      isWatched: false,
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numberOfSquares = parseInt(seriesCount);
    setSeriesCount('');

    if (!!numberOfSquares) {
      return editingSeason
        ? updateSeason(editingSeason.id, numberOfSquares)
        : addSeason(numberOfSquares);
    }
  };

  const addSeason = (seriesCount: number) => {
    const newSeason: Season = {
      id: seasons.length + 1,
      seriesCount,
      episodes: createSquares(seriesCount),
    };
    const updatedSeasons = [...seasons, newSeason];
    setSeasons(updatedSeasons);
    saveSeasonsToLocalStorage(updatedSeasons); // Сохранение в LocalStorage
  };

  const updateSeason = (seasonId: number, seriesCount: number) => {
    const updatedSeasons = seasons.map((season) =>
      season.id === seasonId
        ? { ...season, seriesCount, episodes: createSquares(seriesCount) }
        : season
    );
    setSeasons(updatedSeasons);
    saveSeasonsToLocalStorage(updatedSeasons); // Сохранение в LocalStorage
    setEditingSeason(null);
  };

  const handleSquareClick = (seasonId: number, squareId: number) => {
    const updatedSeasons = seasons.map((season) =>
      season.id === seasonId
        ? {
            ...season,
            episodes: season.episodes.map((square) =>
              square.id === squareId
                ? { ...square, isWatched: !square.isWatched }
                : square
            ),
          }
        : season
    );

    setSeasons(updatedSeasons);
    saveSeasonsToLocalStorage(updatedSeasons); // Сохраняем обновленное состояние в LocalStorage
  };

  const handleEditSeason = (season: Season) => {
    setEditingSeason(season);
    setSeriesCount(season.seriesCount.toString());
  };

  const handleDeleteSeason = (seasonId: number) => {
    const updatedSeasons = seasons.filter((season) => season.id !== seasonId);

    // Переопределяем идентификаторы оставшихся сезонов
    const renumberedSeasons = updatedSeasons.map((season, index) => ({
      ...season,
      id: index + 1, // Новый ID начинается с 1
    }));

    setSeasons(renumberedSeasons);
    saveSeasonsToLocalStorage(renumberedSeasons); // Сохраняем в LocalStorage
  };

  const saveSeasonsToLocalStorage = (seasons: Season[]) => {
    if (movie) {
      const updatedMovie = { ...movie, seasonsList: seasons };
      localStorage.setItem(`movie-${movie.id}`, JSON.stringify(updatedMovie));

      //// использовать movies из основного localStarage-а и обновить массив сезонов
    }
  };

  const loadSeasonsFromLocalStorage = () => {
    if (movie) {
      const savedMovie = localStorage.getItem(`movie-${movie.id}`);
      if (savedMovie) {
        const parsedMovie = JSON.parse(savedMovie);
        setSeasons(parsedMovie.seasonsList || []);
      }
      /// по хорошему надо избавится от этой штуки
    }
  };

  useEffect(() => {
    loadSeasonsFromLocalStorage(); // Загружаем сезоны из LocalStorage при монтировании
  }, [movie]);

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
      {/* Блок с картинкой, названием и статусом */}
      <div className="movie-header">
        <img src={movie.imageUrl} alt={movie.title} className="movie-image" />
        <div className="movie-info">
          <h1>
            {movie.type === 'series' ? 'Сериал:' : 'Фильм:'} {movie.title}
          </h1>
          <p>Статус: {movie.watched ? 'Просмотрено' : 'Не просмотрено'}</p>
        </div>
      </div>

      {/* Форма для добавления сезона и серий */}
      <form onSubmit={handleSubmit} className="season-form">
        <input
          type="number"
          value={seriesCount}
          onChange={(e) => setSeriesCount(e.target.value)}
          placeholder="Количество серий"
          required
        />
        <button type="submit">
          {editingSeason ? 'Сохранить' : 'Добавить'}
        </button>
      </form>

      {/* Отображение сезонов и серий */}
      <div className="seasons-container">
        {seasons.map((season) => (
          <div key={season.id} className="season-block">
            <h3>Сезон {season.id}</h3>
            <div className="squares-container">
              {season.episodes.map((episode) => (
                <div
                  key={episode.id}
                  className={`square ${episode.isWatched ? 'watched' : ''}`}
                  onClick={() => handleSquareClick(season.id, episode.id)}
                >
                  {episode.id}
                </div>
              ))}
            </div>
            <div className="season-actions">
              <button onClick={() => handleEditSeason(season)}>
                Редактировать
              </button>
              <button onClick={() => handleDeleteSeason(season.id)}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
