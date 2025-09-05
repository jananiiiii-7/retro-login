const express = require("express"); 
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Temporary in-memory "database"
const users = [];

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ Backend is running! Use /signup or /login");
});

// Signup
app.post("/signup", async (req, res) => {
  const { name, username, email, gender, password, confirmPassword } = req.body;

  if (!name || !username || !email || !gender || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const exists = users.find(u => u.username === username || u.email === email);
  if (exists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    username,
    email,
    gender,
    password: hashedPassword,
    bio: "",
    avatar: ""
  };

  users.push(newUser);

  res.json({
    success: true,
    message: "User registered successfully",
    user: { name, username, email, gender }
  });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ error: "User not found" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ username }, "secretkey");
  res.json({ token, user });
});

// Profile update
app.post("/profile", (req, res) => {
  const { username, bio, avatar } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ error: "User not found" });

  user.bio = bio;
  user.avatar = avatar;

  io.emit("profileUpdated", { username, bio, avatar });
  res.json({ message: "Profile updated", user });
});

server.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
