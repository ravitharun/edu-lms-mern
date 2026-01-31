console.log("Server updated at " + new Date().toLocaleTimeString());

require("dotenv").config();  // MUST be first l
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const Authrouter = require("./routes/AuthRoutes");

const app = express();
const server = http.createServer(app);
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
console.log("first")
console.log("Server updated at " + new Date().toLocaleTimeString());

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", Authrouter);

// Test root
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Socket.io
const io = new Server(server, { cors: { origin: "*" } });
io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);
    socket.on("update", (data) => io.emit("update", data));
    socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
