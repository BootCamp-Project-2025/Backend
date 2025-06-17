import { IDBHealth } from "../interfaces/IDBHealth";

export class DBHealth implements IDBHealth {
  constructor(public isConnected: boolean) {}
}
