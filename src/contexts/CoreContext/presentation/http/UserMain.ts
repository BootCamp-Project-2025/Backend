import { container } from "tsyringe";
import { IUserController } from "../../domain/interfaces/controllers/IUserController";

const userController = container.resolve<IUserController>("IUserController");

export default userController;
