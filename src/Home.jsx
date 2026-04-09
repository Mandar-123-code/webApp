import StoreList from "./StoreList";

export default function Home() {
  return (
    <div className="page">
      <div className="page-header container">
        <h1>Welcome to Store Ratings</h1>
        <p style={{ color: "var(--muted)" }}>
          Browse stores and submit ratings.
        </p>
      </div>
      <StoreList />
    </div>
  );
}
