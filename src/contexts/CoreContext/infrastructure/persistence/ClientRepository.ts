import { Client } from "../../domain/aggregates/Client";
import { IClientRepository } from "../../domain/interfaces/repositories/IClientRepository";
import prismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { injectable } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import ClientMapper from "../../mappers/ClientMapper";

@injectable()
export class ClientRepository implements IClientRepository {
  async getClientProfileById(id: string): Promise<Client> {
    const clientProfile = await prismaClient.client.findUnique({
      where: { id },
      include: { socialLink: true },
    });

    if (!clientProfile) {
      throw new ApiError(StatusCodes.NOT_FOUND, "The client doesn't exist");
    }
    const clientProfileDto = ClientMapper.persistanceToDto(clientProfile);
    return ClientMapper.persistanceTodomain(clientProfileDto);
  }

  async updateClientProfile(clientId: string, client: Client): Promise<Client> {
    try {
      const clientDto = ClientMapper.domainToGetClientDto(client);

      const updatedClient = await prismaClient.client.update({
        where: { id: clientId },
        data: {
          phoneNumber: clientDto.phoneNumber ?? "",
          city: clientDto.city ?? "",
          country: clientDto.country ?? "",
          gender: clientDto.gender ?? "",
          dateOfBirth: clientDto.dateOfBirth ?? null,
          socialLink: {
            deleteMany: {},
            create:
              clientDto.socialLinks?.map((link) => ({
                platform: link.platform,
                url: link.url,
              })) || [],
          },
        },
        include: {
          socialLink: true,
        },
      });

      const updatedClientDto = ClientMapper.persistanceToDto(updatedClient);
      return ClientMapper.persistanceTodomain(updatedClientDto);
    } catch (error) {
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to update client profile"
      );
    }
  }
}
