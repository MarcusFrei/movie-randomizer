import React from 'react';

interface Movie {
  id: number;
  title: string;
  imageUrl?: string;
  watched: boolean;
}

interface MovieListProps {
  movies: Movie[];
  toggleWatched: (id: number) => void;
  editMovie: (id: number) => void;
  deleteMovie: (id: number) => void;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  toggleWatched,
  editMovie,
  deleteMovie,
}) => {
  return (
    <div>
      <h2>Великий список Анансьи и Марка:</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id} className={movie.watched ? 'watched' : ''}>
            <p>{movie.title}</p>
            {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} />}
            <button onClick={() => toggleWatched(movie.id)}>Просмотрено</button>
            <button onClick={() => editMovie(movie.id)}>Редактировать</button>
            <button onClick={() => deleteMovie(movie.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
