import React from 'react';
import { Episode } from '../../types';

interface EpisodeComponentProps {
  seasonId: number;
  episode: Episode;
  onSquareClick: (seasonId: number, squareId: number) => void;
}

const EpisodeComponent: React.FC<EpisodeComponentProps> = ({
  seasonId,
  episode,
  onSquareClick,
}) => {
  return (
    <div
      className={`square ${episode.isWatched ? 'watched' : ''}`}
      onClick={() => onSquareClick(seasonId, episode.id)}
    >
      {episode.id}
    </div>
  );
};

export default EpisodeComponent;
