import React, { useState, useEffect } from 'react';
import { Season } from '../../types';
import createSquares from '../../utils/utils';
import SeasonComponent from '../SeasonComponent/SeasonComponent';

interface SeasonsManagerProps {
  movieId: number;
  savedSeasons: Season[];
  onUpdate: (updatedSeasons: Season[]) => void;
}

const SeasonsManager: React.FC<SeasonsManagerProps> = ({
  movieId,
  savedSeasons,
  onUpdate,
}) => {
  const [seasons, setSeasons] = useState<Season[]>(savedSeasons);
  const [seriesCount, setSeriesCount] = useState<string>('');
  const [editingSeason, setEditingSeason] = useState<Season | null>(null);

  useEffect(() => {
    setSeasons(savedSeasons);
  }, [savedSeasons]);

  const createOrUpdateSeason = (
    seasonId: number | null,
    seriesCount: number
  ) => {
    const newSeason: Season = {
      id: seasonId ?? seasons.length + 1,
      seriesCount,
      episodes: createSquares(seriesCount),
    };

    const updatedSeasons = seasonId
      ? seasons.map((season) => (season.id === seasonId ? newSeason : season))
      : [...seasons, newSeason];

    setSeasons(updatedSeasons);
    onUpdate(updatedSeasons);
    if (seasonId) setEditingSeason(null);
  };

  const addSeason = (seriesCount: number) => {
    createOrUpdateSeason(null, seriesCount);
  };

  const updateSeason = (seasonId: number, seriesCount: number) => {
    createOrUpdateSeason(seasonId, seriesCount);
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
    onUpdate(updatedSeasons);
  };

  const handleEditSeason = (season: Season) => {
    setEditingSeason(season);
    setSeriesCount(season.seriesCount.toString());
  };

  const handleDeleteSeason = (seasonId: number) => {
    const updatedSeasons = seasons.filter((season) => season.id !== seasonId);

    const renumberedSeasons = updatedSeasons.map((season, index) => ({
      ...season,
      id: index + 1,
    }));

    setSeasons(renumberedSeasons);
    onUpdate(renumberedSeasons);
  };

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

  return (
    <div>
      <form onSubmit={handleSubmit} className="season-form">
        <input
          type="number"
          value={seriesCount}
          onChange={(e) => setSeriesCount(e.target.value)}
          placeholder="Количество серий"
          required
          className="season-input"
        />
        <button type="submit">
          {editingSeason ? 'Сохранить' : 'Добавить'}
        </button>
      </form>

      <div className="seasons-container">
        {seasons.map((season) => (
          <SeasonComponent
            key={season.id}
            season={season}
            onEdit={handleEditSeason}
            onDelete={handleDeleteSeason}
            onSquareClick={handleSquareClick}
          />
        ))}
      </div>
    </div>
  );
};

export default SeasonsManager;
