import { ApiHealth } from "../../domain/implementations/ApiHealth";

export class CheckAPIHealthStatus {
  constructor() {}

  execute(): ApiHealth {
    return new ApiHealth(process.uptime(), "Ok", new Date());
  }
}
