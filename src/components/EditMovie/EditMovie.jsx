import React, { useState } from 'react';

const EditMovie = ({ movie, updateMovie }) => {
  const [title, setTitle] = useState(movie.title);
  const [imageUrl, setImageUrl] = useState(movie.imageUrl);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }
    updateMovie(movie.id, title, imageUrl);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Редактировать название"
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Редактировать постер"
      />
      <button type="submit">Обновить</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default EditMovie;
