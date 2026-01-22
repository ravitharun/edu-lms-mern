// Load environment variables
const dotenv = require("dotenv");
dotenv.config();

// Express and HTTP server
const express = require("express");
const http = require("http");
const app = express();

// Middleware
const cors = require("cors");
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use("/uploads", express.static("uploads")); // serve uploaded files

// DB Connection
const connectDB = require("./config/db");
connectDB();

// Routes
const courseRoutes = require("./routes/courseRoutes");
// Add other routes like userRoutes, attendanceRoutes here
app.use("/api/courses", courseRoutes);

// Socket.io for real-time updates
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // allow frontend to connect
});

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Example: listen for updates and broadcast
  socket.on("update", (data) => {
    io.emit("update", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
