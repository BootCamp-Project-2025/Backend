export interface CourseDTO {
  id?: string;
  name: string;
  description: string;
  imgSrc: string;
  category?: string;
  subCategory?: string;
  language?: string;
  field?: string;
  time?: number;
  requirements?: string;
}
