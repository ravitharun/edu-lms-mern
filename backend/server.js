 

require("dotenv").config(); 

const express = require("express");
const redis = require("redis");
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
const { Manageholiday } = require("./routes/AddHolidaysRouter");
const { redisClient } = require("./Expose/redis");
const { initSocket } = require("./socket");
const { AttandanceRouter } = require("./routes/AttandanceROuter");
const { LeaveStatusRouter } = require("./routes/leaveStatusRouter");
const { ProfileNotificationRouter } = require("./routes/ProfileNotificationRouter");
const ApiMonitioring = require("./Middleware/ApiMonitorning");
const User = require("./models/User");
const app = express();
const server = http.createServer(app);



// Connect to MongoDBcd 

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Server running on port ${PORT}`);
    console.log(`Server running on port ${PORT}`);
  });
});// Middleware
const allowedOrigin = process.env.NODE_ENV === "development"

    ? "http://localhost:5173"
    : process.env.FRONTEND_URL; 
app.use(cors({
    origin: allowedOrigin ,// your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
initSocket(server);
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.set("trust proxy", 1);
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
app.use("/api/UsersCount", Admin_UserInfo);
app.use("/api/Manageholiday", Manageholiday);
app.use("/api/markAttandance", AttandanceRouter);
app.use("/api/LeaveStatusResponse", LeaveStatusRouter);
app.use("/api/ProfileViewnotification", ProfileNotificationRouter);
app.use(apiLimiter)
app.use(ApiMonitioring);
console.log(process.env.MONGO_URI,'locasl MONGO_URI');

// Test root
app.get("/", (req, res) => {
   
    res.json('server is runninf');
});
// app.get("")
// Connect to Redis
redisClient.connect()
    .then(() => console.log("Connected to Redis"))
    .catch((err) => console.error("Redis connection error:", err));
// Socket.io


// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
