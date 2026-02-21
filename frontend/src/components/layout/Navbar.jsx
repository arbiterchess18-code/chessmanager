import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { User, LogOut } from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("userData");
      if (user) {
        setIsLoggedIn(true);
        setUserData(JSON.parse(user));
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkAuth();
    // Listen for storage changes to handle login/logout in other tabs
    window.addEventListener("storage", checkAuth);
    // Custom event for same-tab updates
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");
      localStorage.removeItem("role");
      window.dispatchEvent(new Event("authChange"));
      navigate("/login");
    }
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Chess Manager</Link>
      </h2>

      <div style={styles.linksContainer}>
        <Link to="/" style={styles.link}>Home</Link>

        {isLoggedIn ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/profile" style={styles.link}>Profile</Link>
            <div style={styles.userSection}>
              <div style={styles.avatar}>
                <User size={18} />
                <span style={{ marginLeft: "8px" }}>{userData?.name || "Player"}</span>
              </div>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Sign In</Link>
            <Link to="/signup" style={styles.signupBtn}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#111827",
    color: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: "800",
    letterSpacing: "-0.5px",
  },
  linksContainer: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "#d1d5db",
    marginLeft: "24px",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "500",
    transition: "color 0.2s",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    marginLeft: "24px",
    paddingLeft: "24px",
    borderLeft: "1px solid #374151",
  },
  avatar: {
    display: "flex",
    alignItems: "center",
    color: "#fbbf24", // Chess gold
    fontWeight: "600",
  },
  signupBtn: {
    marginLeft: "24px",
    padding: "8px 18px",
    backgroundColor: "#fbbf24",
    color: "#111827",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.9rem",
    transition: "transform 0.2s",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginLeft: "20px",
    background: "none",
    border: "none",
    color: "#9ca3af",
    cursor: "pointer",
    fontSize: "0.9rem",
    padding: "5px 10px",
    borderRadius: "4px",
    transition: "all 0.2s",
  },
};

export default Navbar;
