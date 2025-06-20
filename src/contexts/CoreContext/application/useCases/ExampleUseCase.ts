/*
import { Freelancer } from "../../domain/aggregates/Freelancer";
import { Language } from "../../domain/entities/Language";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";

export class ExampleUseCase {
  constructor(private readonly repository: ILanguagesRepository) {}

  async execute(id: string): Promise<void> {
    const freelancer: Freelancer = await this.repository.getById(id);
    freelancer.languages.edit(
      Language.create({ name: "spanish", level: "advanced" })
    );
    freelancer.languages.add(
      Language.create({ name: "spanish", level: "advanced" })
    );
    freelancer.languages.remove(
      Language.create({ name: "spanish", level: "advanced" })
    );
    this.repository.operation(freelancer.languages.getNew());
  }
}
*/
