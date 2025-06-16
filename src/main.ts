import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const API_PORT = process.env.API_PORT || 3000;

app.listen(API_PORT, () => {
  console.log(`Server running on http://localhost:${API_PORT}`);
});
