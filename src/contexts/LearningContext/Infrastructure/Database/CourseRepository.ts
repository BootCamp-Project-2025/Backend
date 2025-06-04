import { ICourseRepository } from "../../Domain/Interfaces/ICourseRepository";
import { Course } from "../../Domain/Aggregates/Course";
import prismaClient from "../../../SystemHealth/infrastructure/database/prismaClient"; // askDaniel
import { CourseMapper } from "../../Mappers/CourseMapper";

export class CourseRepository implements ICourseRepository {
    async findById(id: string): Promise<Course | null> {
        const course = await prismaClient.course.findUnique({
            where: { id },
        });

        if (!course) return null;

        return CourseMapper.toDomain(course);
    }

    async findAll(): Promise<Course[]> {
        const courses = await prismaClient.course.findMany();
        return courses.map(CourseMapper.toDomain);
    }
}
