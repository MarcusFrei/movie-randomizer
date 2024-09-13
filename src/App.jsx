import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList/MovieList';
import AddMovie from './components/AddMovie/AddMovie';
import EditMovie from './components/EditMovie/EditMovie';
import RandomMovie from './components/RandomMovie/RandomMovie';
import WatchedMovies from './components/WatchedMovies/WatchedMovies';
import NavBar from './components/NavBar/NavBar';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    if (storedMovies) {
      setMovies(storedMovies);
    }
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  }, [movies]);

  const addMovie = (title, imageUrl) => {
    const newMovie = {
      id: movies.length + 1,
      title,
      watched: false,
      imageUrl,
    };
    setMovies([...movies, newMovie]);
  };

  const toggleWatched = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  const editMovie = (id) => {
    const movie = movies.find((movie) => movie.id === id);
    setEditingMovie(movie);
  };

  const updateMovie = (id, title, imageUrl) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, title, imageUrl } : movie
      )
    );
    setEditingMovie(null);
  };

  const deleteMovie = (id) => {
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
                  <EditMovie movie={editingMovie} updateMovie={updateMovie} />
                ) : (
                  <AddMovie addMovie={addMovie} />
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
