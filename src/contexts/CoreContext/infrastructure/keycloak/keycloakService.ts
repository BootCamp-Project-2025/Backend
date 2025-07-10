import { IExternarlAuthService } from "../../domain/interfaces/services/IExternalAuthService";
import { injectable } from "tsyringe";
import { keycloakAxios } from "../../../Shared/infrastructure/axiosInstance";
import dotenv from "dotenv";
dotenv.config();

console.log(`${process.env.KEYCLOAK_URL}`);
console.log(`${process.env.KEYCLOAK_REALM}`);
console.log(`${process.env.KEYCLOAK_CLIENT_ID}`);
console.log(`${process.env.KEYCLOAK_CLIENT_SECRET}`);
@injectable()
export class KeycloakService implements IExternarlAuthService {
  constructor() { }

  keycloakUrl = process.env.KEYCLOAK_URL || "http://localhost:8080/auth";
  keycloakRealm = process.env.KEYCLOAK_REALM || "LTCrowd";
  keycloakClientId = process.env.KEYCLOAK_CLIENT_ID || "backend-client";
  keycloakClientSecret =
    process.env.KEYCLOAK_CLIENT_SECRET || "ClientSecretPlaceholder";
  keycloakBackendClientId =
    process.env.KEYCLOAK_BACKEND_CLIENT_ID || "backend-client";

  public async getAdminToken(): Promise<string> {

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", this.keycloakClientId);
    params.append("client_secret", this.keycloakClientSecret);

    try {
      const response = await keycloakAxios.post(
        `/realms/${this.keycloakRealm}/protocol/openid-connect/token`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(
          `Failed to get admin token: ${response.status} ${response.statusText}`
        );
      }

      return response.data.access_token;
    } catch (error) {
      throw new Error(
        `Error getting admin token: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  public async getRealmRoles(
    token: string
  ): Promise<Array<{ id: string; name: string }>> {
    try {
      const response = await keycloakAxios.get(
        `/admin/realms/${this.keycloakRealm}/roles`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(
          `Failed to get realm roles: ${response.status} ${response.statusText}`
        );
      }

      return response.data;
    } catch (error) {
      throw new Error(
        `Error getting realm roles: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  public async updateUserRoles(userId: string, role: string): Promise<void> {
    const token = await this.getAdminToken();

    const realmRoles = await this.getRealmRoles(token);

    const assignedRoles = realmRoles.filter((realmRole) => {
      if (realmRole.name === role) return realmRole;
    });

    try {
      const response = await keycloakAxios.post(
        `/admin/realms/${this.keycloakRealm}/users/${userId}/role-mappings/realm`,
        assignedRoles,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 204) {
        throw new Error(
          `Failed to update user roles: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      throw new Error(
        `Error updating user roles: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  public async updateUserData(
    userId: string,
    userData: Record<string, string>
  ): Promise<void> {
    const token = await this.getAdminToken();
    await keycloakAxios.put(
      `/admin/realms/${this.keycloakRealm}/users/${userId}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
}
