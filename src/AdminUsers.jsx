import { useState, useMemo } from "react";
import { MOCK_USERS } from "./mockData";

export default function AdminUsers() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortBy, setSortBy] = useState({ field: "name", dir: 1 });

  function addUser(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get("name");
    const email = fd.get("email");
    const address = fd.get("address");
    const role = fd.get("role");
    const id = Math.floor(Math.random() * 10000) + 200;
    setUsers((prev) => [{ id, name, email, address, role }, ...prev]);
    e.target.reset();
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users
      .filter((u) => {
        if (roleFilter && u.role !== roleFilter) return false;
        if (!q) return true;
        return (
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.address || "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const f = sortBy.field;
        if (a[f] < b[f]) return -1 * sortBy.dir;
        if (a[f] > b[f]) return 1 * sortBy.dir;
        return 0;
      });
  }, [users, query, roleFilter, sortBy]);

  function toggleSort(field) {
    setSortBy((s) =>
      s.field === field ? { field, dir: -s.dir } : { field, dir: 1 },
    );
  }

  return (
    <div className="container" style={{ paddingTop: 18 }}>
      <h2>Admin — Users</h2>
      <form
        onSubmit={addUser}
        className="form-card"
        style={{ marginBottom: 12 }}
      >
        <div className="form-row">
          <label>Name</label>
          <input
            name="name"
            className="form-input"
            required
            minLength={20}
            maxLength={60}
          />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input name="email" className="form-input" type="email" required />
        </div>
        <div className="form-row">
          <label>Address</label>
          <textarea name="address" className="form-textarea" maxLength={400} />
        </div>
        <div className="form-row">
          <label>Role</label>
          <select name="role" className="form-input">
            <option value="normal">Normal User</option>
            <option value="admin">Admin</option>
            <option value="store_owner">Store Owner</option>
          </select>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="btn btn-primary" type="submit">
            Add User
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
          placeholder="Filter name/email/address"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-input"
          style={{ width: 320 }}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="form-input"
          style={{ width: 160 }}
        >
          <option value="">All roles</option>
          <option value="normal">Normal</option>
          <option value="admin">Admin</option>
          <option value="store_owner">Store Owner</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th onClick={() => toggleSort("name")}>Name</th>
            <th onClick={() => toggleSort("email")}>Email</th>
            <th onClick={() => toggleSort("address")}>Address</th>
            <th onClick={() => toggleSort("role")}>Role</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
