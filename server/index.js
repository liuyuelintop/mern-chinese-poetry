import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import poetryRoutes from "./routes/poetry.route.js";
import shijingRoutes from "./routes/shijing.route.js";
import searchRoutes from "./routes/search.route.js"; // 确保路径正确
import connectMongoDB from "./db/connectMongoDB.js";
import path from "path";
dotenv.config();

const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

// 路由
app.use("/api/poems", poetryRoutes);
app.use("/api/shijing", shijingRoutes);
app.use("/api/search", searchRoutes);

app.use(express.static(path.join(__dirname, "/client/dist"))); // vite-->dist || npx create -->build

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}\n`);
  connectMongoDB();
});
