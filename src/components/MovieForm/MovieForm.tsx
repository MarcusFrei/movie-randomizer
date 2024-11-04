import { useState, useEffect } from 'react';
import { Movie } from '../../types';
import './MovieForm.css';

interface MovieFormProps {
  initialMovie?: Movie;
  onSubmit: (title: string, imageUrl: string, type: 'movie' | 'series') => void;
  buttonText: string;
}

interface FormState {
  title: string;
  imageUrl: string;
  type: 'movie' | 'series';
}

interface FormErrors {
  title: string;
  imageUrl: string;
}

const MovieForm: React.FC<MovieFormProps> = ({
  initialMovie,
  onSubmit,
  buttonText,
}) => {
  const [formState, setFormState] = useState<FormState>({
    title: initialMovie?.title || '',
    imageUrl: initialMovie?.imageUrl || '',
    type: initialMovie?.type || 'movie',
  });

  const [errors, setErrors] = useState<FormErrors>({
    title: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (initialMovie) {
      setFormState({
        title: initialMovie.title,
        imageUrl: initialMovie.imageUrl,
        type: initialMovie.type,
      });
    }
  }, [initialMovie]);

  const validateForm = () => {
    const newErrors: FormErrors = { title: '', imageUrl: '' };

    if (!formState.title) {
      newErrors.title = 'Поле название - обязательно!';
    }

    if (!formState.imageUrl) {
      newErrors.imageUrl = 'Поле ссылки - обязательно!';
    }

    setErrors(newErrors);

    return !newErrors.title && !newErrors.imageUrl;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formState.title, formState.imageUrl, formState.type);
      setFormState({ title: '', imageUrl: '', type: 'movie' });
      setErrors({ title: '', imageUrl: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleChange}
          placeholder="Название фильма / сериала..."
        />
        {errors.title && <p className="error-message">{errors.title}</p>}
      </div>

      <div>
        <input
          type="text"
          name="imageUrl"
          value={formState.imageUrl}
          onChange={handleChange}
          placeholder="Ссылка на постер"
        />
        {errors.imageUrl && <p className="error-message">{errors.imageUrl}</p>}
      </div>

      <div>
        <select
          className="type"
          name="type"
          value={formState.type}
          onChange={handleChange}
        >
          <option value="movie">Фильм</option>
          <option value="series">Сериал</option>
        </select>
      </div>

      <button type="submit" className="add">
        {buttonText}
      </button>
    </form>
  );
};

export default MovieForm;
