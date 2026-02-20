import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Chess Manager</h2>

      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/login" style={styles.link}>Sign In</Link>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    backgroundColor: "#1f2937",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  link: {
    color: "white",
    marginLeft: "20px",
    textDecoration: "none",
  },
};

export default Navbar;
