import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import IUseCase from "../../domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteCourseUseCase implements IUseCase<string, void> {
    constructor(
        @inject("ICourseRepository") private readonly courseRepo: ICourseRepository
    ) { }

    async execute(id: string): Promise<void> {
        await this.courseRepo.delete(id);
    }
}
