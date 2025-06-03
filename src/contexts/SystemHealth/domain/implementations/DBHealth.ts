import { IDBHealth } from "../IDbHealth";

export class DBHealth implements IDBHealth {
  constructor(public isConnected: boolean) {}
}
