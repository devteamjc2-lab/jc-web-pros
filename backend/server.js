const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");


const initDatabase = require("./database/initDatabase");
const seedDatabase = require("./seeders/userSeeder");

const app = express();

app.use(cors());
app.use(express.json());


const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);


// Create HTTP Server
const server = http.createServer(app);


// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});


// Socket Connection
io.on("connection", (socket) => {

  console.log("🟢 User Connected:", socket.id);


  socket.on("send_message", (data) => {

    console.log("Message:", data);

    // Send message to all connected users
    io.emit("receive_message", data);

  });


  socket.on("disconnect", () => {
    console.log("🔴 User Disconnected:", socket.id);
  });

});


const PORT = 5000;


async function startServer() {

  await initDatabase(); 
  await seedDatabase();


  server.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
    console.log(`💬 Socket.IO Running`);
  });

}


startServer();