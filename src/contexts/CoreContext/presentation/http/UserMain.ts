import { UserService } from "../../application/services/UserService";
import { CreateUserUseCase } from "../../application/useCases/CreateUserUseCase";
import { GetUserUseCase } from "../../application/useCases/GetUserUseCase";
import { UserRepository } from "../../infrastructure/persistence/UserRepository";
import { UserController } from "./controllers/UserController";

const repo = new UserRepository();
const createUseCase = new CreateUserUseCase(repo);
const getUserUseCase = new GetUserUseCase(repo);

const userService = new UserService(createUseCase, getUserUseCase);

const userController = new UserController(userService);

export default userController;
