require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes=require("./routes/authRoutes")
const taskRoutes=require("./routes/taskRoutes")

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://task-manager-frontend.vercel.app"
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});