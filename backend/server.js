const express = require("express");
const cors = require("cors");

const app = express();

// CORS middleware
app.use(cors());

app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});