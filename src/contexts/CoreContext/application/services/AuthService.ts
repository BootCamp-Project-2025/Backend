import { inject, injectable } from "tsyringe";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { IAuthService } from "../../domain/interfaces/services/IAuthService";
import { User } from "../../domain/aggregates/User";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject("SyncUserUseCase")
    private syncUserUseCase: IUseCase<User, User>
  ) {}

  async syncUser(user: User): Promise<User> {
    return this.syncUserUseCase.execute(user);
  }
}
