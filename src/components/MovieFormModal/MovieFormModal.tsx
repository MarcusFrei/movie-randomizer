import React, { useState } from 'react';
import './MovieFormModal.css';
import { Movie } from '../../types';

interface MovieFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMovie?: Movie;
  onSubmit: (
    title: string,
    imageUrl: string,
    type: 'movie' | 'series',
    watched: boolean
  ) => void;
  buttonText: string;
}

const MovieFormModal: React.FC<MovieFormModalProps> = ({
  isOpen,
  onClose,
  initialMovie,
  onSubmit,
  buttonText,
}) => {
  const [title, setTitle] = useState(initialMovie?.title || '');
  const [imageUrl, setImageUrl] = useState(initialMovie?.imageUrl || '');
  const [type, setType] = useState<'movie' | 'series'>(
    initialMovie?.type || 'movie'
  );
  const [watched, setWatched] = useState(initialMovie?.watched || false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(title, imageUrl, type, watched);
    setTitle('');
    setImageUrl('');
    setType('movie');
    setWatched(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Название фильма / сериала..."
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Ссылка на постер"
              required
            />
          </div>

          <div className="type-selection">
            <label>
              <input
                type="radio"
                name="type"
                value="movie"
                checked={type === 'movie'}
                onChange={() => setType('movie')}
              />
              Фильм
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="series"
                checked={type === 'series'}
                onChange={() => setType('series')}
              />
              Сериал
            </label>
          </div>

          <div className="watched-checkbox">
            <label>
              <input
                type="checkbox"
                checked={watched}
                onChange={(e) => setWatched(e.target.checked)}
              />
              Просмотрено
            </label>
          </div>

          <button type="submit" className="add">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovieFormModal;

// Добавить ещё одно поле с чекбоксом просмотрено или нет, а фильм или сериал сделать радиокнопкой
// Нам нужно формапи в тг есть ссылка в чатике, чтобы избавится от стейтов, надо чтобы компонент снаружи принимал 3 пропса:
// открыто (меняем на id),
// handleClose,
// handleSubmit (на вход принимает весь фильм)
// Избавиться от стейта formState и от ошибок, лучше использовать require + invalid
//
