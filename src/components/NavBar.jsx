import { NavLink, Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import Logo from "./Logo";
export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <Logo />
      </Link>
      <ul>
        <li>
          <NavLink to="/pricing">pricing</NavLink>
        </li>
        <li>
          <NavLink to="/products">product</NavLink>
        </li>
        <li>
          <Link to="/login" className={styles.ctaLink}>
            login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
