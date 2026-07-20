const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const initDatabase = require("./database/initDatabase");
const seedDatabase = require("./seeders/userSeeder");
const getDbPool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://jc-web-pros.vercel.app"
    ],
    methods: ["GET", "POST"],
  },
});

// Socket Connection
io.on("connection", (socket) => {
  console.log("🟢 User Connected:", socket.id);

  socket.on("join_conversation", ({ conversationId, userId }) => {
    if (conversationId) {
      socket.join(`conversation:${conversationId}`);
      console.log(`👥 User ${userId} joined conversation ${conversationId}`);
    }
  });

  socket.on("leave_conversation", (conversationId) => {
    if (conversationId) {
      socket.leave(`conversation:${conversationId}`);
    }
  });

  socket.on("send_message", (data) => {
    try {
      const { conversationId, senderId, message, senderName } = data;
      if (!conversationId || !senderId || !message?.trim()) {
        return;
      }

      io.to(`conversation:${conversationId}`).emit("receive_message", {
        conversationId,
        senderId,
        senderName: senderName || "User",
        message: message.trim(),
      });
    } catch (error) {
      console.error("Socket message error:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 User Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`;
  if (error.code === "EADDRINUSE") {
    console.error(`❌ ${bind} is already in use. Please stop the existing process or set a different PORT.`);
    process.exit(1);
  }

  throw error;
});

async function startServer() {
  await initDatabase();
  await seedDatabase();

  server.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
    console.log(`💬 Socket.IO Running`);
  });
}

startServer();