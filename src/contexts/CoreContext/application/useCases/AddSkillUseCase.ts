import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Skill } from "../../domain/valueObjects/Skill";
import { inject, injectable } from "tsyringe";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { CreateSkillDto } from "../../domain/interfaces/dtos/CreateSkillDto";
import { SkillService } from "../../domain/services/SkillService";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export default class AddSkillUseCase implements IUseCase<CreateSkillDto, void> {
  constructor(
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}
  async execute({ skill, freelancerId }: CreateSkillDto): Promise<void> {
    try {
      const skills: Skill[] =
        await this.freelancerRepository.getSkills(freelancerId);
      const skillService: SkillService = SkillService.create(skills);
      skillService.add(skill);
      await this.freelancerRepository.updateSkills(
        freelancerId,
        skillService.getAll()
      );
    } catch (error) {
      console.log(error);
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
}
