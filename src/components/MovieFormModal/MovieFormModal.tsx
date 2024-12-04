import React, { useEffect, useState } from 'react';
import './MovieFormModal.css';
import { Movie } from '../../types';

interface MovieFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMovie?: Movie;
  onSubmit: (movie: Omit<Movie, 'id'>) => void;
  buttonText: string;
}

const MovieFormModal: React.FC<MovieFormModalProps> = ({
  isOpen,
  onClose,
  initialMovie,
  onSubmit,
  buttonText,
}) => {
  const [formData, setFormData] = useState<Omit<Movie, 'id'>>({
    title: '',
    imageUrl: '',
    type: 'movie',
    watched: false,
  });

  /// Сломал прошлым коммитом форму редактирования

  useEffect(() => {
    if (initialMovie) {
      setFormData({
        title: initialMovie.title,
        imageUrl: initialMovie.imageUrl,
        type: initialMovie.type,
        watched: initialMovie.watched,
      });
    } else {
      /// Если это новое добавление, тов форме передаются пустые значения
      setFormData({
        title: '',
        imageUrl: '',
        type: 'movie',
        watched: false,
      });
    }
  }, [initialMovie, isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
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
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Название фильма / сериала..."
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
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
                checked={formData.type === 'movie'}
                onChange={() => setFormData({ ...formData, type: 'movie' })}
              />
              Фильм
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="series"
                checked={formData.type === 'series'}
                onChange={() => setFormData({ ...formData, type: 'series' })}
              />
              Сериал
            </label>
          </div>

          <div className="watched-checkbox">
            <label>
              <input
                type="checkbox"
                checked={formData.watched}
                onChange={(e) =>
                  setFormData({ ...formData, watched: e.target.checked })
                }
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
