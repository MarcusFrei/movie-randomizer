import React, { useState } from 'react';
import { Season } from '../../types';
import createSquares from '../../utils/utils';
import SeasonComponent from '../SeasonComponent/SeasonComponent';

interface SeasonsManagerProps {
  movieId: number;
  savedSeasons: Season[];
  onUpdate: (updatedSeasons: Season[]) => void;
}

const SeasonsManager: React.FC<SeasonsManagerProps> = ({
  savedSeasons,
  onUpdate,
}) => {
  const [seasons, setSeasons] = useState<Season[]>(savedSeasons);
  const [seriesCount, setSeriesCount] = useState('');
  const [editingSeason, setEditingSeason] = useState<Season | null>(null);

  const createOrUpdateSeason = (
    seasonId: number | null,
    seriesCount: number
  ): void => {
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

    if (seasonId) {
      setEditingSeason(null);
      setSeriesCount('');
    }
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

  const handleDeleteSeason = (seasonId: number) => {
    const updatedSeasons = seasons
      .filter((season) => season.id !== seasonId)
      .map((season, index) => ({
        ...season,
        id: index + 1,
      }));

    setSeasons(updatedSeasons);
    onUpdate(updatedSeasons);
  };

  const handleEditSeason = (season: Season) => {
    setEditingSeason(season);
    setSeriesCount(season.seriesCount.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numberOfSquares = parseInt(seriesCount, 10);

    if (numberOfSquares > 0) {
      editingSeason
        ? createOrUpdateSeason(editingSeason.id, numberOfSquares)
        : createOrUpdateSeason(null, numberOfSquares);
    }
  };

  const submitButtonText = editingSeason ? 'Сохранить' : 'Добавить';

  return (
    <div className="seasons-manager">
      <form onSubmit={handleSubmit} className="season-form">
        <input
          type="number"
          value={seriesCount}
          onChange={(e) => setSeriesCount(e.target.value)}
          placeholder="Количество серий"
          required
          min="1"
          className="season-input"
        />
        <button type="submit">{submitButtonText}</button>
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

export default React.memo(SeasonsManager);
