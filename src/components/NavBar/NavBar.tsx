import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav>
      <ul className="nav_menu">
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <Link to="/watched">Просмотренные</Link>
        </li>
        <li>
          <Link to="/random">Рандомайзер</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
