import { Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList/MovieList';
import RandomMovie from './components/RandomMovie/RandomMovie';
import MovieDetails from './components/MovieDetails/MovieDetails';
import NavBar from './components/NavBar/NavBar';
import './App.css';

export const App: React.FC = () => {
  return (
    <div className="container">
      <NavBar />
      <Routes>
        {['/', '/watched'].map((route: string) => (
          <Route path={route} key={route} element={<MovieList />} />
        ))}
        <Route path="/random" element={<RandomMovie />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
};

export default App;
