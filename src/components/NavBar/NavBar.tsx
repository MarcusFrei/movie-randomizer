import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <Link to="/watched">Просмотренные</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
