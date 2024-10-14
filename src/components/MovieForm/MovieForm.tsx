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
  const [formState, setFormState] = useState({
    title: initialMovie?.title || '',
    imageUrl: initialMovie?.imageUrl || '',
  });

  const [errors, setErrors] = useState({
    title: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (initialMovie) {
      setFormState({
        title: initialMovie.title,
        imageUrl: initialMovie.imageUrl,
      });
    }
  }, [initialMovie]);

  const validateForm = () => {
    const newErrors = { title: '', imageUrl: '' };

    if (!formState.title) {
      newErrors.title = 'Поле название - обязательно!';
    }

    if (!formState.imageUrl) {
      newErrors.imageUrl = 'Поле ссылки - обязательно!';
    }

    setErrors(newErrors);

    return !newErrors.title && !newErrors.imageUrl;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formState.title, formState.imageUrl);
      setFormState({ title: '', imageUrl: '' });
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

      <button type="submit" className="add">
        {buttonText}
      </button>
    </form>
  );
};

export default MovieForm;
