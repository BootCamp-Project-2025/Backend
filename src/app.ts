import express from "express";
import cors from "cors";
import healthRoutes from "./contexts/SystemHealth/presentation/http/routes/healthRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);

export default app;
