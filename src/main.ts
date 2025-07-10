import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const API_HOST = process.env.API_HOST || "localhost";
const API_PORT = process.env.API_PORT || 3000;

app.listen(API_PORT, () => {
  console.log(`Server running on http://${API_HOST}:${API_PORT}`);
});
