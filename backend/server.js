const express = require("express");
const app = express();
app.use(express.json());
const userRoutes = require("./routes/userRoutes");
// Route connect
app.use("/api/users", userRoutes);

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});