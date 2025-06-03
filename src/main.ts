import express from "express";
import healthRoutes from "./contexts/SystemHealth/presentation/http/routes/healthRoutes";

const app = express();
app.use(express.json());

app.use("/api/health", healthRoutes);

// app.use('/equipos', equipoRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
