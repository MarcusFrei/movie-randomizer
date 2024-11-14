import React from 'react';
import { Season } from '../../types';
import EpisodeComponent from '../EpisodeComponent/EpisodeComponent';

interface SeasonComponentProps {
  season: Season;
  onEdit: (season: Season) => void;
  onDelete: (seasonId: number) => void;
  onSquareClick: (seasonId: number, squareId: number) => void;
}

const SeasonComponent: React.FC<SeasonComponentProps> = ({
  season,
  onEdit,
  onDelete,
  onSquareClick,
}) => {
  return (
    <div className="season-block">
      <h3>Сезон {season.id}</h3>
      <div className="squares-container">
        {season.episodes.map((episode) => (
          <EpisodeComponent
            key={episode.id}
            seasonId={season.id}
            episode={episode}
            onSquareClick={onSquareClick}
          />
        ))}
      </div>
      <div className="season-actions">
        <button onClick={() => onEdit(season)}>Редактировать</button>
        <button onClick={() => onDelete(season.id)}>Удалить</button>
      </div>
    </div>
  );
};

export default SeasonComponent;
