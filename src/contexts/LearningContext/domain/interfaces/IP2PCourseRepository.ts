import { P2PCourse } from "../aggregates/P2PCourse";

export default interface IP2PCourseRepository {
  create(p2pCourse: P2PCourse): Promise<P2PCourse>;
  findById(p2pCourseId: string): Promise<P2PCourse | null>;
  findByUserIdAndCourseId(
    p2pCourseId: string,
    userId: string
  ): Promise<P2PCourse | null>;
  findByUserId(userId: string): Promise<P2PCourse[] | []>
}
