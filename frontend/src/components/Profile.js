import React, { useState } from "react";
import "./Popup.css";

export default function Profile({ user, onUpdate }) {
  const [minimized, setMinimized] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [msg, setMsg] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      fullName,
      username,
      email,
      gender,
    };

    if (onUpdate) {
      onUpdate(updatedUser);
    }

    setMsg("✅ Profile updated successfully!");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="popup">
        <div className="titlebar">
          <span className="title">🪪 PROFILE.EXE</span>
          <div className="window-controls">
            <button
              onClick={() => setMinimized(!minimized)}
              className="pixel-btn small"
              title="Minimize"
            >
              –
            </button>
          </div>
        </div>

        {!minimized && (
          <div className="popup-content">
            {!user ? (
              <p className="id-heading">⚠ Please sign in first</p>
            ) : (
              <div className="id-card">
                <div
                  className="id-photo"
                  style={{
                    backgroundImage: `url(${user?.avatar || "/avatar.png"})`,
                  }}
                />

                <div>
                  <form onSubmit={handleUpdate}>
                    <div className="id-row">
                      <div className="id-label">FULL NAME</div>
                      <input
                        className="input id-value"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>

                    <div className="id-row">
                      <div className="id-label">USERNAME</div>
                      <input
                        className="input id-value"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    <div className="id-row">
                      <div className="id-label">EMAIL</div>
                      <input
                        className="input id-value"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="id-row">
                      <div className="id-label">GENDER</div>
                      <input
                        className="input id-value"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="pixel-btn">
                      UPDATE ▶
                    </button>
                  </form>

                  {msg && (
                    <p className="small" style={{ marginTop: 12 }}>
                      {msg}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}