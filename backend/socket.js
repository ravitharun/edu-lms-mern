const User = require("./models/User");

let io;

const initSocket = (server) => {
    const { Server } = require("socket.io");
    const allowedOrigin = process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : process.env.FRONTEND_URL; // your deployed frontend URL
    io = new Server(server, {
        cors: {
            origin: "*"
        },
    });

    const onlineUsers = new Map()
io.on("connection", async (socket) => {
    try {
        console.log("✅ User connected:", socket.id);

        const userId = socket.handshake.query.userId;
        if (!userId) return;

        onlineUsers.set(userId, socket.id);

      
        await User.findByIdAndUpdate(userId, { isActive: true });

       
        io.emit("userStatus", { userId, status: "online" });

        // ❌ Disconnect
        socket.on("disconnect", async () => {
            console.log("❌ User disconnected:", socket.id);

            onlineUsers.delete(userId);

            await User.findByIdAndUpdate(userId, {
                isActive: false,
                lastSeen: new Date()
            });

            io.emit("userStatus", { userId, status: "offline" });
        });

    } catch (err) {
        console.log("Socket Error:", err);
    }
});

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};

module.exports = { initSocket, getIO };