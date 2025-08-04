import "reflect-metadata";
import { CourseMapper } from "@/contexts/LearningContext/mappers/CourseMapper";
import { Course } from "@/contexts/LearningContext/domain/aggregates/Course";
import { Module } from "@/contexts/LearningContext/domain/entities/Module";
import { Lesson } from "@/contexts/LearningContext/domain/entities/Lesson";
import { CourseName } from "@/contexts/LearningContext/domain/valueObjects/CourseName";
import { CourseDescription } from "@/contexts/LearningContext/domain/valueObjects/CourseDescription";
import { CourseCategory } from "@/contexts/LearningContext/domain/valueObjects/CourseCategory";
import { CourseSubCategory } from "@/contexts/LearningContext/domain/valueObjects/CourseSubCategory";
import { CourseLanguage } from "@/contexts/LearningContext/domain/valueObjects/CourseLanguage";
import { CourseField } from "@/contexts/LearningContext/domain/valueObjects/CourseField";
import { CourseRequirements } from "@/contexts/LearningContext/domain/valueObjects/CourseRequirements";
import { Modules } from "@/contexts/LearningContext/domain/OneToMany/Modules";
import { Lessons } from "@/contexts/LearningContext/domain/OneToMany/Lessons";
import { LessonDescription } from "@/contexts/LearningContext/domain/valueObjects/LessonDescription";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { SyllabusSectionTitle } from "@/contexts/LearningContext/domain/valueObjects/SyllabusSectionTitle";
import { LessonResource } from "@/contexts/LearningContext/domain/valueObjects/LessonResource";
import { LessonVideoUrl } from "@/contexts/LearningContext/domain/valueObjects/LessonVideoUrl";

describe("CourseMapper - domainToIndex", () => {
  it("should correctly map Course domain to CourseIndex", () => {
    const lesson = Lesson.create({
      title: SyllabusSectionTitle.create({ title: "Lesson Title" }),
      description: LessonDescription.create({
        description:
          "This is a valid description that meets the 30 character minimum requirement.",
      }),
      resources: [
        LessonResource.create({
          name: "Resource 1",
          url: "https://resource.com/1",
        }),
      ],
      videoUrls: [LessonVideoUrl.create({ url: "https://video.com/1" })],
      position: 1,
    });

    const module = Module.create({
      title: SyllabusSectionTitle.create({ title: "Module 1" }),
      position: 1,
      quizzes: [],
      lessons: Lessons.create([lesson]),
    });

    const course = Course.create(
      {
        name: CourseName.create({ name: "Test Course" }),
        description: CourseDescription.create({ description: "Test Desc" }),
        category: CourseCategory.create({ category: "Math" }),
        subCategory: CourseSubCategory.create({ subCategory: "Algebra" }),
        language: CourseLanguage.create({ language: "English" }),
        field: CourseField.create({ field: "Science" }),
        requirements: CourseRequirements.create({ requirements: "None" }),
        time: 123456,
        imgSrc: "image.png",
        userId: UserId.create(new UniqueEntityID("user-1")),
        modules: Modules.create([module]),
      },
      new UniqueEntityID("course-1")
    );

    const index = CourseMapper.domainToIndex(course);

    expect(index).toMatchObject({
      id: "course-1",
      name: "Test Course",
      description: "Test Desc",
      category: "Math",
      subCategory: "Algebra",
      language: "English",
      field: "Science",
      time: 123456,
      userId: "user-1",
      modules: [
        {
          title: "Module 1",
          lessons: [
            {
              description:
                "This is a valid description that meets the 30 character minimum requirement.",
            },
          ],
        },
      ],
    });

    expect(index.createdAt).toBeInstanceOf(Date);
  });
});
