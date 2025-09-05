import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import BackgroundMusic from "./components/BackgroundMusic";
import TreasureBox from "./components/TreasureBox"; // ✅ import chest
import "./index.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="arcade-scanlines">
      <Router>
        <BackgroundMusic />

        {/* === Top HUD Bar === */}
        <header className="topbar">
          {/* Hearts (top-left) */}
          <div className="hearts-container">
            <img src="/images/hearts.png" alt="Lives" className="hearts" />
          </div>

          {/* Centered menu */}
          <nav className="menu">
            <NavLink to="/login" className="menu-link pixel-btn" end>
              🔑 Login
            </NavLink>
            <NavLink to="/signup" className="menu-link pixel-btn">
              📝 Signup
            </NavLink>
            <NavLink to="/profile" className="menu-link pixel-btn">
              👤 Profile
            </NavLink>
          </nav>

          {/* Right slot */}
          <div className="hud-right neon">ARCADE v1.0</div>
        </header>

        {/* Page content */}
        <main className="page">
          <Routes>
            <Route
              path="/"
              element={user ? <Profile user={user} onUpdate={setUser} /> : <Login onLogin={setUser} />}
            />
            <Route path="/login" element={<Login onLogin={setUser} />} />
            <Route path="/signup" element={<Signup onSuccess={setUser} />} />
            <Route path="/profile" element={<Profile user={user} onUpdate={setUser} />} />
          </Routes>
        </main>
        <footer className="footer">
          <TreasureBox />
        </footer>
      </Router>
    </div>
  );
}

export default App;