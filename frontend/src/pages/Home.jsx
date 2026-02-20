import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>Welcome to Chess Manager</h1>
      <p>Manage tournaments easily and professionally.</p>

      <button onClick={() => navigate("/login")} style={styles.button}>
        Go to Sign In
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Home;
