export interface CourseIndex {
  id: string;
  name: string;
  description: string;
  category?: string;
  subCategory?: string;
  language?: string;
  field?: string;
  time?: number;
  userId: string;
  modules?: {
    title: string;
    lessons: {
      description: string;
    }[];
  }[];
}
