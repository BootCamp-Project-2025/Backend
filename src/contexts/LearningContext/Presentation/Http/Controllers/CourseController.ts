import { Request, Response } from "express";
import { CourseService } from "../../../Infrastructure/Services/CourseService";

export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    async getAllCourses(req: Request, res: Response): Promise<void> {
        try {
            const courses = await this.courseService.getAllCourses();
            res.status(200).json(courses);
        } catch (error) {
            console.error("Error in CourseController.getAllCourses:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
