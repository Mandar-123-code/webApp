import Login from "./Login";
import Navbar from "./Navbar";
import Signup from "./Signup";
import Home from "./Home";
import AdminDashboard from "./AdminDashboard";
import OwnerDashboard from "./OwnerDashboard";
import StoreList from "./StoreList";
import AdminUsers from "./AdminUsers";
import AdminStores from "./AdminStores";
import StoreDetail from "./StoreDetail";
import UserProfile from "./UserProfile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/stores" element={<StoreList />} />
          <Route path="/stores/:id" element={<StoreDetail />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/stores" element={<AdminStores />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/owner" element={<OwnerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
