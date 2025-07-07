import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { IExternarlAuthService } from "../../../domain/interfaces/services/IExternalAuthService";
import { ApiError } from "../../../../Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { IUserRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IUserRepository";
import { User } from "@/contexts/CoreContext/domain/aggregates/User";

@injectable()
export class UpdateRoleUseCase
  implements IUseCase<{ user: User; role: string }, void> {
  constructor(
    @inject("IAuthManagerService") private authService: IExternarlAuthService,
    @inject("IUserRepository") private userRepository: IUserRepository
  ) { }

  async execute(
    params?: { user: User; role: string } | undefined
  ): Promise<void> {
    if (!params) {
      throw new ApiError(StatusCodes.UNAUTHORIZED);
    }
    const { user, role } = params;
    await this.authService.updateUserRoles(user.id.toString(), role);
    const updatedUser = await this.userRepository.addFreelancerProfile(
      user.id.toString()
    );
    if (!updatedUser) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to update user"
      );
    }
  }
}
