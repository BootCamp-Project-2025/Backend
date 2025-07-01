import { About } from "../../valueObjects/About";

export interface IAboutRepository {
  update(freelancerId: string, about: About): Promise<void>;
  get(freelancerId: string): Promise<About>;
}
