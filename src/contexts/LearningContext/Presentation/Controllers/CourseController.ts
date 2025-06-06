/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { CreateCourseUseCase } from "../../application/useCases/CreateCourseUseCase";
import { ICourseController } from "../../Domain/Interfaces/ICourseController";
import { CourseDTO } from "../../Domain/dtos/CourseDTO";

export class CourseController implements ICourseController {
  constructor(private readonly createCourseService: CreateCourseUseCase) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const dto = req.body as CourseDTO;
      const result = await this.createCourseService.execute(dto);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
