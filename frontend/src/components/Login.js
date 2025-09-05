import React, { useState } from "react";
import "./Popup.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [minimized, setMinimized] = useState(false);
  const [closed, setClosed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin({ username });
    }
  };

  if (closed) return null;

  return (
    <div className="center">
      <div className="popup">
        <div className="titlebar">
          <span className="title">🔑 LOGIN.EXE</span>
          <div className="window-controls">
            <button
              onClick={() => setMinimized(!minimized)}
              className="pixel-btn small"
              title="Minimize"
            >
              –
            </button>
            <button
              onClick={() => setClosed(true)}
              className="pixel-btn small"
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {!minimized && (
          <div
            className="popup-content login-content"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <h2 className="id-heading">WELCOME, PLAYER!</h2>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                marginTop: "10px",
              }}
            >
              <input
                className="input id-value"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "250px" }}
              />
              <input
                className="input id-value"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "250px" }}
              />
              <button className="pixel-btn" style={{ width: "250px" }}>
                ▶ Login
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;