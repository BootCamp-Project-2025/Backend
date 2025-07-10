import axios from "axios";

export const keycloakAxios = axios.create({
  baseURL: process.env.KEYCLOAK_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
