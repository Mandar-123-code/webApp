export default function AdminDashboard() {
  const usersCount = 42;
  const storesCount = 3;
  const ratingsCount = (() => {
    try {
      const r = JSON.parse(localStorage.getItem("user_ratings") || "{}");
      return Object.keys(r).length;
    } catch {
      return 0;
    }
  })();

  return (
    <div className="container" style={{ paddingTop: 18 }}>
      <h2>Admin Dashboard</h2>
      <div className="stat-cards">
        <div className="stat">
          <strong>Total Users</strong>
          <div style={{ fontSize: 24, marginTop: 8 }}>{usersCount}</div>
        </div>
        <div className="stat">
          <strong>Total Stores</strong>
          <div style={{ fontSize: 24, marginTop: 8 }}>{storesCount}</div>
        </div>
        <div className="stat">
          <strong>Total Ratings</strong>
          <div style={{ fontSize: 24, marginTop: 8 }}>{ratingsCount}</div>
        </div>
      </div>
    </div>
  );
}
