import { IEducationService } from "@/contexts/CoreContext/domain/interfaces/services/IEducationService";
import { Education } from "../../domain/entities/Education";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { IEducationDto } from "../../domain/interfaces/dtos/IEducationDto";
import { educationMapper } from "../../mappers/EducationMapper";
import { CreateEducationDto } from "../../domain/interfaces/dtos/CreateEducationDto";
import { DeleteEducationDto } from "../../domain/interfaces/dtos/DeleteEducationDto";

@injectable()
export default class EducationService implements IEducationService {
  constructor(
    @inject("AddEducationUseCase")
    private readonly addEducationUseCase: IUseCase<Education, Education>,
    @inject("EditEducationUseCase")
    private readonly editEducationUseCase: IUseCase<
      CreateEducationDto,
      Education
    >,
    @inject("GetEducationsUseCase")
    private readonly getEducationsUseCase: IUseCase<string, Education[]>,
    @inject("DeleteEducationUseCase")
    private readonly deleteEducationUseCase: IUseCase<DeleteEducationDto, void>
  ) {}
  async getAllOfFreelancer(freelancerId: string): Promise<IEducationDto[]> {
    try {
      const educations = await this.getEducationsUseCase.execute(freelancerId);
      return educationMapper.mapMannyDomainToDto(educations);
    } catch (error) {
      if (error as ApiError) throw error;
      else throw new ApiError();
    }
  }
  async addEducation(education: IEducationDto): Promise<IEducationDto> {
    try {
      const educationDomain = educationMapper.mapDtoToDomain(education);
      const newEducation =
        await this.addEducationUseCase.execute(educationDomain);
      return educationMapper.mapDomainToDto(newEducation);
    } catch (error) {
      if (error as ApiError) throw error;
      else throw new ApiError();
    }
  }
  async removeById(educationId: string, freelancerId: string): Promise<void> {
    try {
      await this.deleteEducationUseCase.execute({
        educationId: educationId,
        freelancerId: freelancerId,
      });
    } catch (error) {
      if (error as ApiError) throw error;
      else throw new ApiError();
    }
  }
  async updateEducation(
    education: IEducationDto,
    freelancerId: string
  ): Promise<IEducationDto> {
    try {
      const educationDomain = educationMapper.mapDtoToDomain({
        ...education,
        freelancerId: freelancerId,
      });
      const update = await this.editEducationUseCase.execute({
        education: educationDomain,
        freelancerId: freelancerId,
      });

      return educationMapper.mapDomainToDto(update);
    } catch (error) {
      if (error as ApiError) throw error;
      else throw new ApiError();
    }
  }
}
