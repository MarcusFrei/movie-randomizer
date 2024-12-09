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
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const movie: Omit<Movie, 'id'> = {
      title: formData.get('title') as string,
      imageUrl: formData.get('imageUrl') as string,
      type: formData.get('type') as 'movie' | 'series',
      watched: formData.has('watched'),
    };

    onSubmit(movie);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <form onSubmit={handleSubmit} id="filmInfo">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Название фильма / сериала..."
              required
              defaultValue={initialMovie?.title}
            />
          </div>

          <div>
            <input
              type="text"
              name="imageUrl"
              placeholder="Ссылка на постер"
              required
              defaultValue={initialMovie?.imageUrl}
            />
          </div>

          <div className="type-selection">
            <label>
              <input
                type="radio"
                name="type"
                value="movie"
                defaultChecked={initialMovie?.type === 'movie'}
              />
              Фильм
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="series"
                defaultChecked={initialMovie?.type === 'series'}
              />
              Сериал
            </label>
          </div>

          <div className="watched-checkbox">
            <label>
              <input
                type="checkbox"
                name="watched"
                defaultChecked={initialMovie?.watched}
              />
              Просмотрено
            </label>
          </div>

          <button type="submit" className="add">
            {initialMovie ? 'Обновить' : 'Добавить'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovieFormModal;
