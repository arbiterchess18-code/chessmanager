import { useParams, useNavigate } from "react-router-dom";

const Signup = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  const handleSignup = () => {
    localStorage.setItem("role", role);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{role === "arbiter" ? "Arbiter Signup" : "Player Signup"}</h2>

      <input placeholder="Name" /><br /><br />
      <input placeholder="Email" /><br /><br />
      <input type="password" placeholder="Password" /><br /><br />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
