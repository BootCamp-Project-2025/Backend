import { IApiHealth } from "../interfaces/IApiHealth";

export class ApiHealth implements IApiHealth {
  uptime: number;
  message: string;
  date: Date;
  constructor(uptime: number, message: string, date: Date) {
    this.uptime = uptime;
    this.message = message;
    this.date = date;
  }
}
