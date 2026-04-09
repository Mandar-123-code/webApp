import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MOCK_STORES } from "./mockData";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function StoreDetail() {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchStore() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/stores/${id}`);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setStore({ ...data, id: data._id });
    } catch (err) {
      console.warn("Failed to fetch store from API, using mock:", err.message);
      const sidNum = Number(id);
      const m = MOCK_STORES.find((s) => s.id === sidNum);
      setStore(m || null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStore();
  }, [id]);

  function getUserRatingForStore(s) {
    const user = localStorage.getItem("current_user");
    if (!user || !s?.ratings) return undefined;
    return s.ratings.find((r) => r.user === user)?.rating;
  }

  async function submitRating() {
    const user =
      localStorage.getItem("current_user") ||
      prompt("Enter your name (will be saved)");
    if (!user) return;
    localStorage.setItem("current_user", user);

    const val = prompt("Enter rating 1-5");
    const n = Number(val);
    if (!n || n < 1 || n > 5) return alert("Invalid rating");

    if (store && store.id && typeof store.id === "string") {
      try {
        const res = await fetch(`${API_BASE}/api/stores/${store.id}/rate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user, rating: n }),
        });
        if (!res.ok) throw new Error("Failed to submit rating");
        await fetchStore();
      } catch (err) {
        alert("Could not submit rating: " + err.message);
      }
    } else {
      const prev = JSON.parse(localStorage.getItem("user_ratings") || "{}");
      prev[id] = n;
      localStorage.setItem("user_ratings", JSON.stringify(prev));
      window.location.reload();
    }
  }

  if (loading)
    return (
      <div className="container" style={{ paddingTop: 20 }}>
        Loading...
      </div>
    );
  if (!store)
    return (
      <div className="container" style={{ paddingTop: 20 }}>
        <h2>Store not found</h2>
      </div>
    );

  return (
    <div className="container" style={{ paddingTop: 20 }}>
      <h2>{store.name}</h2>
      <p style={{ color: "var(--muted)" }}>{store.address}</p>
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <div
          style={{
            padding: 12,
            background: "var(--card)",
            borderRadius: 8,
            boxShadow: "var(--shadow)",
          }}
        >
          <strong>Overall Rating</strong>
          <div style={{ fontSize: 20 }}>{(store.rating ?? 0).toFixed(1)}</div>
        </div>
        <div style={{ padding: 12 }}>
          <strong>Your Rating</strong>
          <div>{getUserRatingForStore(store) ?? "—"}</div>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={submitRating}
            style={{ marginLeft: 8 }}
          >
            Submit/Change Rating
          </button>
        </div>
      </div>
    </div>
  );
}
