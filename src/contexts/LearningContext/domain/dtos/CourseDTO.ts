export interface CourseDTO {
  name: string;
  description: string;
  imgSrc: string;
}

export interface CourseIdDTO extends CourseDTO {
  id: string;
}
