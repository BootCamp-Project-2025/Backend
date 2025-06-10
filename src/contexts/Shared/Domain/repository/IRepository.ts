export interface IRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  delete(id: string): Promise<string | void>;
  create(object: T): Promise<T>;
  update(id: string, object: T): Promise<T>;
}
