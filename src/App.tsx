import { useMovieManager } from './components/MovieManager/MovieManager';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MovieComponent from './components/MovieComponent/MovieComponent';
import MovieForm from './components/MovieForm/MovieForm';
import RandomMovie from './components/RandomMovie/RandomMovie';
import Modal from './components/Modal/Modal';
import MovieDetails from './components/MovieDetails/MovieDetails';
import NavBar from './components/NavBar/NavBar';
import './App.css';

export const App: React.FC = () => {
  const {
    movies,
    editingMovie,
    isModalOpen,
    addMovie,
    toggleWatched,
    editMovie,
    updateMovie,
    deleteMovie,
    setIsModalOpen,
  } = useMovieManager();

  const navigate = useNavigate();

  const handleImageClick = (id: number) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="container">
      <NavBar />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <MovieForm
          initialMovie={editingMovie}
          onSubmit={(title, imageUrl, type) =>
            editingMovie
              ? updateMovie(editingMovie.id, title, imageUrl, type)
              : addMovie(title, imageUrl, type)
          }
          buttonText={editingMovie ? 'Обновить' : 'Добавить'}
        />
      </Modal>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <MovieComponent
                movies={movies}
                toggleWatched={toggleWatched}
                editMovie={editMovie}
                deleteMovie={deleteMovie}
                mode="list"
                onImageClick={handleImageClick} // Передаем onImageClick
              />
              <div className="button_block">
                <button
                  onClick={() => {
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
            <MovieComponent
              movies={movies}
              toggleWatched={toggleWatched}
              mode="watched"
              onImageClick={handleImageClick} // Передаем onImageClick
            />
          }
        />
        <Route
          path="/random"
          element={
            <RandomMovie movies={movies.filter((movie) => !movie.watched)} />
          }
        />
        <Route path="/movie/:id" element={<MovieDetails movies={movies} />} />
      </Routes>
    </div>
  );
};

export default App;
