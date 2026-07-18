const express = require("express");
const cors = require("cors");

const initDatabase = require("./database/initDatabase");
const seedDatabase = require("./seeders/userSeeder");

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const PORT = 5000;

async function startServer() {
  await initDatabase(); 
await seedDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
  });
}

startServer();