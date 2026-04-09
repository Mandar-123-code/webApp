export default function OwnerDashboard() {
  let ratings = {};
  try {
    ratings = JSON.parse(localStorage.getItem("user_ratings") || "{}");
  } catch {
    ratings = {};
  }
  const entries = Object.entries(ratings);

  const avg = entries.length
    ? (entries.reduce((s, [v]) => s + v, 0) / entries.length).toFixed(2)
    : "—";

  return (
    <div className="container" style={{ paddingTop: 18 }}>
      <h2>Store Owner Dashboard</h2>
      <p>
        Average rating for your store: <strong>{avg}</strong>
      </p>

      <section style={{ marginTop: 16 }}>
        <h3>Users who submitted ratings</h3>
        {entries.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>No ratings yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(([storeId, rate]) => (
                <tr key={storeId}>
                  <td>Example User</td>
                  <td>{rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
