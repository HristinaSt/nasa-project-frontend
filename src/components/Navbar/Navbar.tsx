import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.navbarBrand} to="/apod">
        NASA API
      </Link>
      <div className={styles.navbarMenu}>

        <div className={styles.navItem}>
          <Link className={styles.navLink} to="/apod">
            APOD
          </Link>
        </div>
        <div className={styles.navItem}>
          <Link className={styles.navLink} to="/mars-rover-photos">
            Mars Rover Photos
          </Link>
        </div>
        <div className={styles.navItem}>
          <Link className={styles.navLink} to="/neolist">
            NEO List
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
