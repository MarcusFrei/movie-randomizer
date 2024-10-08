import { useState, useEffect } from 'react';
import { Movie } from '../../types';
import './MovieForm.css';

interface MovieFormProps {
  initialMovie?: Movie;
  onSubmit: (title: string, imageUrl: string) => void;
  buttonText: string;
}

const MovieForm: React.FC<MovieFormProps> = ({
  initialMovie,
  onSubmit,
  buttonText,
}) => {
  const [title, setTitle] = useState(initialMovie?.title || '');
  const [imageUrl, setImageUrl] = useState(initialMovie?.imageUrl || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialMovie) {
      setTitle(initialMovie.title);
      setImageUrl(initialMovie.imageUrl);
    }
  }, [initialMovie]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      setError('Пожалуйста, заполните все поля!');
      return;
    }
    onSubmit(title, imageUrl);
    setTitle('');
    setImageUrl('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название фильма / сериала..."
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Ссылка на постер"
      />
      <button type="submit" className="add">
        {buttonText}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default MovieForm;

/// Посмотреть апи форм в JS, чтобы оптимизировать код
