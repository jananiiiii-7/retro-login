import React, { useState } from "react";
import axios from "axios";
import "./Popup.css";

function Signup({ onSuccess }) {
  const [minimized, setMinimized] = useState(false);
  const [closed, setClosed] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMsg("Username and password are required.");
      return;
    }
    if (password !== confirmPassword) {
      setMsg("Passwords do not match.");
      return;
    }

    try {
const res = await axios.post("https://retro-login-1.onrender.com/", {
  name,
  username,
  email,
  gender,
  password,
});

      if (res.status === 200 && res.data?.message) {
        setMsg("✅ Signup successful!");
        setSuccess(true);
        const userObj = {
          name,
          username,
          email,
          gender,
          avatar: "",
        };
        if (onSuccess) onSuccess(userObj);
      } else {
        setMsg("Signup failed");
      }
    } catch (err) {
      setMsg(err.response?.data?.error || "Signup failed");
    }
  };

  if (closed) return null;

  return (
    <div className="center">
      <div className="popup">
        <div className="titlebar">
          <span className="title">SIGNUP.EXE</span>
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
          <div className="popup-content">
            {!success ? (
              <form onSubmit={handleSignup}>
                <input
                  className="input"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className="input"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <select
                  className="input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">♂ Male</option>
                  <option value="Female">♀ Female</option>
                  <option value="Other">⚧ Other</option>
                </select>
                <input
                  className="input"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className="input"
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="pixel-btn">SIGN UP ▶</button>
                {msg && <p className="small">{msg}</p>}
              </form>
            ) : (
              <div>
                <p className="small">{msg}</p>
                <button
                  className="pixel-btn"
                  onClick={() => (window.location.href = "/profile")}
                >
                  🚀 Go to Profile
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;