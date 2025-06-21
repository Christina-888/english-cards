import styles from "./header.module.css";
import logo from "../assets/images/icons/glasses.svg";
import { NavLink } from "react-router";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <NavLink to="/">
        <img className={styles.logoImg} src={logo} alt="logo" />
      </NavLink>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItems}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className={styles.navItems}>
            <NavLink to="/game">Game</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
