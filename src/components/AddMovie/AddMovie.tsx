import { useState } from 'react';

interface AddMovieProps {
  addMovie: (title: string, imageUrl: string) => void;
}

const AddMovie = ({ addMovie }: AddMovieProps) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }
    addMovie(title, imageUrl);
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
        placeholder="Добавить новый фильм / сериал для совместного уютного просмотра..."
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Добавить ссылку для постера..."
      />
      <button type="submit">Добавить</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default AddMovie;
