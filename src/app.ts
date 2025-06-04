import express from "express";
import healthRoutes from "./contexts/SystemHealth/presentation/http/routes/healthRoutes";

const app = express();

app.use(express.json());

app.use("/api/health", healthRoutes);

export default app;
