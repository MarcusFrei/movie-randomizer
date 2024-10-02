import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList/MovieList';
import MovieForm from './components/MovieForm/MovieForm';
import RandomMovie from './components/RandomMovie/RandomMovie';
import WatchedMovies from './components/WatchedMovies/WatchedMovies';
import Modal from './components/Modal/Modal';
import NavBar from './components/NavBar/NavBar';
import './App.css';
import { Movie } from './types';

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false);
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
      setIsModalOpen(true);
    }
  };

  const updateMovie = (id: number, title: string, imageUrl: string) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, title, imageUrl } : movie
      )
    );
    setEditingMovie(null);
    setIsModalOpen(false);
  };

  const deleteMovie = (id: number) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <Router>
      <div className="container">
        <NavBar />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <MovieForm
            initialMovie={editingMovie}
            onSubmit={(title, imageUrl) =>
              editingMovie
                ? updateMovie(editingMovie.id, title, imageUrl)
                : addMovie(title, imageUrl)
            }
            buttonText={editingMovie ? 'Обновить' : 'Добавить'}
          />
        </Modal>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Великий список Ананасьи и Марка:</h1>
                <MovieList
                  movies={movies.filter((movie) => !movie.watched)}
                  toggleWatched={toggleWatched}
                  editMovie={editMovie}
                  deleteMovie={deleteMovie}
                />
                <div className="button_block">
                  <button
                    onClick={() => {
                      setEditingMovie(null); // Очищаем состояние редактируемого фильма для добавления нового
                      setIsModalOpen(true);
                    }}
                    className="add_button"
                  >
                    ➕
                  </button>
                </div>
              </>
            }
          />
          <Route
            path="/watched"
            element={
              <WatchedMovies movies={movies} toggleWatched={toggleWatched} />
            }
          />
          <Route
            path="/random"
            element={
              <RandomMovie movies={movies.filter((movie) => !movie.watched)} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
