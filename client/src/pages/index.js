// This is the landing page.
import Navbar from '../components/Navbar';
import styles from '../styles/Index.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.nav}>
        <Navbar />
      </div>
      <div className={styles.center}>
        This is the home section, This will also contain
      </div>
      <div className={styles.right}> This is the suggested feed section</div>
    </div>
  );
}
