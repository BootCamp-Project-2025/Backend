import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import IUseCase from "../../domain/interfaces/IUseCase";
import { injectable, inject } from "tsyringe";

export interface PublishInput {
  id: string;
  published: boolean;
}

@injectable()
export class PublishCourseUseCase implements IUseCase<PublishInput, boolean> {
  constructor(@inject("ICourseRepository") private repo: ICourseRepository) {}

  async execute(input: PublishInput): Promise<boolean> {
    return await this.repo.publish(input.id, input.published);
  }
}
