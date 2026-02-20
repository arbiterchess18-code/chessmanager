const Dashboard = () => {
  const role = localStorage.getItem("role");

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Dashboard</h1>
      <h2>Logged in as: {role}</h2>

      {role === "arbiter" && <p>You can create and manage tournaments.</p>}
      {role === "player" && <p>You can join tournaments and view games.</p>}
    </div>
  );
};

export default Dashboard;
