import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList/MovieList';
import MovieForm from './components/MovieForm/MovieForm';
import RandomMovie from './components/RandomMovie/RandomMovie';
import WatchedMovies from './components/WatchedMovies/WatchedMovies';
import NavBar from './components/NavBar/NavBar';
import './App.css';

interface Movie {
  id: number;
  title: string;
  imageUrl: string;
  watched: boolean;
}

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  }, [movies]);

  const addMovie = (title: string, imageUrl: string) => {
    const newMovie: Movie = {
      id: movies.length + 1,
      title,
      watched: false,
      imageUrl,
    };
    setMovies([...movies, newMovie]);
  };

  const toggleWatched = (id: number) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  const editMovie = (id: number) => {
    const movie = movies.find((movie) => movie.id === id);
    if (movie) {
      setEditingMovie(movie);
    }
  };

  const updateMovie = (id: number, title: string, imageUrl: string) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, title, imageUrl } : movie
      )
    );
    setEditingMovie(null);
  };

  const deleteMovie = (id: number) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <Router>
      <div className="container">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Рандомайзер фильмов</h1>
                <RandomMovie
                  movies={movies.filter((movie) => !movie.watched)}
                />
                {editingMovie ? (
                  <MovieForm
                    initialMovie={editingMovie}
                    onSubmit={(title, imageUrl) =>
                      updateMovie(editingMovie!.id, title, imageUrl)
                    }
                    buttonText="Обновить"
                  />
                ) : (
                  <MovieForm onSubmit={addMovie} buttonText="Добавить" />
                )}
                <MovieList
                  movies={movies.filter((movie) => !movie.watched)}
                  toggleWatched={toggleWatched}
                  editMovie={editMovie}
                  deleteMovie={deleteMovie}
                />
              </>
            }
          />
          <Route
            path="/watched"
            element={
              <WatchedMovies movies={movies} toggleWatched={toggleWatched} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
