import { useState, useMemo } from "react";
import { MOCK_STORES } from "./mockData";

export default function AdminStores() {
  const [stores, setStores] = useState(MOCK_STORES);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState({ field: "name", dir: 1 });

  function addStore(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get("name");
    const address = fd.get("address");
    const id = Math.floor(Math.random() * 10000) + 300;
    setStores((prev) => [{ id, name, address, rating: 0 }, ...prev]);
    e.target.reset();
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stores
      .filter((s) => {
        if (!q) return true;
        return (
          s.name.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const f = sortBy.field;
        if (a[f] < b[f]) return -1 * sortBy.dir;
        if (a[f] > b[f]) return 1 * sortBy.dir;
        return 0;
      });
  }, [stores, query, sortBy]);

  function toggleSort(field) {
    setSortBy((s) =>
      s.field === field ? { field, dir: -s.dir } : { field, dir: 1 },
    );
  }

  return (
    <div className="container" style={{ paddingTop: 18 }}>
      <h2>Admin — Stores</h2>
      <form
        onSubmit={addStore}
        className="form-card"
        style={{ marginBottom: 12 }}
      >
        <div className="form-row">
          <label>Name</label>
          <input name="name" className="form-input" required />
        </div>
        <div className="form-row">
          <label>Address</label>
          <input name="address" className="form-input" />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="btn btn-primary" type="submit">
            Add Store
          </button>
        </div>
      </form>

      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <input
          placeholder="Filter name/address"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-input"
          style={{ width: 320 }}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th onClick={() => toggleSort("name")}>Name</th>
            <th onClick={() => toggleSort("address")}>Address</th>
            <th onClick={() => toggleSort("rating")}>Rating</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.address}</td>
              <td>{(s.rating || 0).toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
