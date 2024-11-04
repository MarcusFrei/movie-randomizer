import React, { useEffect, useState } from 'react';
import './MovieModal.css';

interface Square {
  id: number;
  isWatched: boolean;
}

interface Season {
  id: number;
  seriesCount: number;
  episodes: Square[];
}

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  seasonsList: Array<Season>;
}

const MovieModal: React.FC<MovieModalProps> = ({
  isOpen,
  onClose,
  seasonsList,
}) => {
  const [seriesCount, setSeriesCount] = useState('');
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [editingSeason, setEditingSeason] = useState<Season | null>(null);

  /// console.log(seasons);

  const createSquares = (count: number): Square[] =>
    Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      isWatched: false,
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numberOfSquares = parseInt(seriesCount);

    if (!isNaN(numberOfSquares) && numberOfSquares > 0) {
      if (editingSeason) {
        updateSeason(editingSeason.id, numberOfSquares);
      } else {
        addSeason(numberOfSquares);
      }
    }
    setSeriesCount('');
  };

  const addSeason = (seriesCount: number) => {
    const newSeason: Season = {
      id: seasons.length + 1,
      seriesCount,
      episodes: createSquares(seriesCount),
    };
    setSeasons([...seasons, newSeason]);
  };

  const updateSeason = (seasonId: number, seriesCount: number) => {
    setSeasons((prevSeasons) =>
      prevSeasons.map((season) =>
        season.id === seasonId
          ? { ...season, seriesCount, squares: createSquares(seriesCount) }
          : season
      )
    );
    setEditingSeason(null);
  };

  useEffect(() => {
    if (!seasons.length && seasonsList.length) {
      setSeasons(seasonsList);
    }
  }, [seasonsList]);

  const handleSquareClick = (seasonId: number, squareId: number) => {
    setSeasons((prevSeasons) =>
      prevSeasons.map((season) =>
        season.id === seasonId
          ? {
              ...season,
              squares: season.episodes.map((square) =>
                square.id === squareId
                  ? { ...square, isClicked: !square.isWatched }
                  : square
              ),
            }
          : season
      )
    );
  };

  const handleEditSeason = (season: Season) => {
    setEditingSeason(season);
    setSeriesCount(season.seriesCount.toString());
  };

  const handleDeleteSeason = (seasonId: number) => {
    setSeasons((prevSeasons) =>
      prevSeasons.filter((season) => season.id !== seasonId)
    );
  };

  const handleClose = () => {
    onClose();
    setSeasons([]);
    setSeriesCount('');
    setEditingSeason(null);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>
          {editingSeason ? 'Редактировать сезон' : 'Добавить сезон и серии:'}
        </h2>
        <form onSubmit={handleSubmit}>
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

        <div className="seasons-container">
          {seasons.map((season) => (
            <div key={season.id} className="season-block">
              <h3>Сезон {season.id}</h3>
              <div className="squares-container">
                {season.episodes.map((episodes) => (
                  <div
                    key={episodes.id}
                    className="square"
                    onClick={() => handleSquareClick(season.id, episodes.id)}
                    style={{
                      backgroundColor: episodes.isWatched
                        ? '#646cff'
                        : 'rgb(74, 146, 217)',
                    }}
                  >
                    {episodes.id}
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
    </div>
  );
};

export default MovieModal;

/// Вынести на отдельную страницу, а не в модалке, так как не оч удобно.
/// Доделать интеграцию с localStorage, так как Нумерация сезонов не переписывается при удалении
/// Почитать про Utility Types ещё раз!!!!!!!!э
///
