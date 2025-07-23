import { inject, injectable } from "tsyringe";
import { User } from "../../domain/aggregates/User";
import { IUserService } from "../../domain/interfaces/services/IUserService";
import { CreateUserFreelancerProfileUseCase } from "../useCases/CreateUserFreelancerProfileUseCase";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";
import { GetUserUseCase } from "../useCases/GetUserUseCase";
import { UpdateUserUseCase } from "../useCases/UpdateUserUseCase";
import { GetUserEnrollmentsUseCase } from "../useCases/GetUserEnrollmentsUseCase";
import { Enrollment } from "../../domain/aggregates/Enrollment";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject("CreateUserUseCase")
    private readonly createUserUseCase: CreateUserUseCase,
    @inject("GetUserUseCase")
    private readonly getUserUseCase: GetUserUseCase,
    @inject("CreateUserFreelancerProfileUseCase")
    private readonly createUserFreelancerProfileUseCase: CreateUserFreelancerProfileUseCase,
    @inject("UpdateUserUseCase")
    private readonly updateUserUseCase: UpdateUserUseCase,
    @inject("GetUserEnrollmentsUseCase")
    private readonly getUserEnrollmentsUseCase: GetUserEnrollmentsUseCase
  ) {}
  async createFreelanceProfile(id: string): Promise<User> {
    const updatedUser =
      await this.createUserFreelancerProfileUseCase.execute(id);

    return updatedUser;
  }
  delete(): Promise<string | void> {
    throw new Error("Method not implemented.");
  }
  addRole(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async get(id: string): Promise<User | null> {
    return await this.getUserUseCase.execute(id);
  }
  getAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  update(id: string, userData: User): Promise<User> {
    return this.updateUserUseCase.execute({ userId: id, userData });
  }
  async create(user: User): Promise<User> {
    return await this.createUserUseCase.execute(user);
  }

  async getEnrollments(userId: string): Promise<Enrollment[]> {
    try {
      return await this.getUserEnrollmentsUseCase.execute(userId);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error fetching enrollments"
      );
    }
  }
}
