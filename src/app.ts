import express from "express";
import cors from "cors";
import healthRoutes from "./contexts/SystemHealth/presentation/http/routes/healthRoutes";

import userRoutes from "./contexts/CoreContext/presentation/http/routes/UserRoutes";

import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);

app.use("/api/users", userRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
