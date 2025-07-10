import axios from "axios";
import dotevn from "dotenv";
dotevn.config();

export const keycloakAxios = axios.create({
  baseURL: process.env.KEYCLOAK_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
