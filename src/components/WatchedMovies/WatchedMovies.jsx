import React from 'react';

const WatchedMovies = ({ movies, toggleWatched }) => {
  const watchedMovies = movies.filter((movie) => movie.watched);

  return (
    <div>
      <h1>Просмотренные фильмы</h1>
      {watchedMovies.length === 0 ? (
        <p>Список просмотренных фильмов пуст...</p>
      ) : (
        <ul>
          {watchedMovies.map((movie) => (
            <li key={movie.id}>
              <p>{movie.title}</p>
              {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} />}
              <button onClick={() => toggleWatched(movie.id)}>
                Вернуть в список
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WatchedMovies;
