import { useMovieManager } from './components/MovieManager/MovieManager';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MovieList from './components/MovieList/MovieList';
import RandomMovie from './components/RandomMovie/RandomMovie';
import MovieDetails from './components/MovieDetails/MovieDetails';
import NavBar from './components/NavBar/NavBar';
import './App.css';

export const App: React.FC = () => {
  const { movies } = useMovieManager();
  const navigate = useNavigate();

  const handleImageClick = (id: number) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="container">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<MovieList mode="list" onImageClick={handleImageClick} />}
        />
        <Route
          path="/watched"
          element={<MovieList mode="watched" onImageClick={handleImageClick} />}
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

//// убрать дублирование MovieList,чтобы не было по 2 раза + чистить MovieManager + список вопросов для подготовки
