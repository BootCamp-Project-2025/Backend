import { Client } from "../../domain/aggregates/Client";
import { IClientRepository } from "../../domain/interfaces/repositories/IClientRepository";
import prismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { injectable } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import ClientMapper from "../../mappers/ClientMapper";
import { IClientProfileDto } from "../../domain/interfaces/dtos/IClientProfileDto";

@injectable()
export class ClientRepository implements IClientRepository {
  async getClientProfileById(id: string): Promise<Client | null> {
    const clientProfile = await prismaClient.client.findUnique({
      where: { id },
      include: { socialLink: true },
    });

    if (!clientProfile) {
      throw new ApiError(StatusCodes.NOT_FOUND, "The client doesn't exist");
    }

    // Adapt prisma object to dto
    const clientProfileDto: IClientProfileDto = {
      id: clientProfile.id, //check this id here an in ClientMapper
      userId: clientProfile.userId,
      phoneNumber: clientProfile.phoneNumber || undefined,
      country: clientProfile.country || undefined,
      city: clientProfile.city || undefined,
      gender: clientProfile.gender || undefined,
      dateOfBirth: clientProfile.dateOfBirth || undefined,
      socialLinks: clientProfile.socialLink.map((link) => ({
        id: link.id,
        platform: link.platform,
        url: link.url,
      })),
    };

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
            deleteMany: {}, // this replace previous links each time
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

      // Map prisma to clientprofiledto
      const updatedClientDto: IClientProfileDto = {
        id: updatedClient.id,
        userId: updatedClient.userId,
        phoneNumber: updatedClient.phoneNumber || undefined,
        city: updatedClient.city || undefined,
        country: updatedClient.country || undefined,
        gender: updatedClient.gender || undefined,
        dateOfBirth: updatedClient.dateOfBirth || undefined,
        socialLinks: updatedClient.socialLink.map((link) => ({
          id: link.id,
          platform: link.platform,
          url: link.url,
        })),
      };

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
