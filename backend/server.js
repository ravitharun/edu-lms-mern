console.log("Server updated at " + new Date().toLocaleTimeString());

require("dotenv").config();  // MUST be first l
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const Authrouter = require("./routes/AuthRoutes");
const Subjects = require("./routes/SubjectsRouter");
const updatePasswordRouter = require("./routes/updatePass");
const { SubjectTeacher } = require("./routes/AssiginSubjectrouter");
const { classlist } = require("./routes/GetallClasslistrouter");
const AccountDeactivateRouter = require("./routes/AccountDeactivateRouter");
const { leaveRouter } = require("./routes/ApplyleaveRouter");
const ProfileRouter = require("./routes/ProfileRoute");
const AnnouncementRouter = require("./routes/Announcement");
const { HandelAcademicRouter } = require("./routes/AcandemicRouter");
const { HandelFetchTimeTableRouter } = require("./routes/FetchTimetableRouter");
const { apiLimiter } = require("./Middleware/ReateLimeter");
const { Admin_UserInfo } = require("./routes/AdminUserRouter");

const app = express();
const server = http.createServer(app);
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
console.log("first")
console.log("first")
console.log("first")
console.log("Server updated at " + new Date().toLocaleTimeString());

app.use(express.json());
app.use("/uploads", express.static("uploads"));
console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("API_KEY:", process.env.API_KEY);
console.log("API_SECRET:", process.env.API_SECRET);
// Routes
app.use("/api/auth", Authrouter);
app.use("/api/subjects", Subjects);
app.use("/api/password", updatePasswordRouter);
app.use("/api/AssignSubjects", SubjectTeacher);
app.use("/api/classlist", classlist);
app.use("/api/Account", AccountDeactivateRouter);
app.use("/api/LeaveApply", leaveRouter);
app.use("/api/Profile", ProfileRouter);
app.use("/api/Announcement", AnnouncementRouter);
app.use("/api/Academic", HandelAcademicRouter);
app.use("/api/FetchStudentsTimeTabel", HandelFetchTimeTableRouter);
app.use("/api/FetchStudentsTimeTabel", HandelFetchTimeTableRouter);
app.use("/api/UsersCount", Admin_UserInfo);
app.use(apiLimiter)

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
