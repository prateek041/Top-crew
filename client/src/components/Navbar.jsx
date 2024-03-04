import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className="">
        <div className="">Top Crew</div>
        <div>
          <div>Home</div>
          <div>Explore</div>
          <div>Profile</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
