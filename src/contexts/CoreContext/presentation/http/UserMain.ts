import { UserService } from "../../application/services/UserService";
import { CreateUserFreelancerProfileUseCase } from "../../application/useCases/CreateUserFreelancerProfileUseCase";
import { CreateUserUseCase } from "../../application/useCases/CreateUserUseCase";
import { GetUserUseCase } from "../../application/useCases/GetUserUseCase";
import { UserRepository } from "../../infrastructure/persistence/UserRepository";
import { UserController } from "./controllers/UserController";

const repo = new UserRepository();
const createUseCase = new CreateUserUseCase(repo);
const getUserUseCase = new GetUserUseCase(repo);
const createUserFreelancerProfileUseCase =
  new CreateUserFreelancerProfileUseCase(repo);

const userService = new UserService(
  createUseCase,
  getUserUseCase,
  createUserFreelancerProfileUseCase
);

const userController = new UserController(userService);

export default userController;
