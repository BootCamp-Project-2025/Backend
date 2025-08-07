export default interface ISkillDto {
  name: string;
  level: "beginner" | "intermediate" | "advanced";
  id?: string;
}
