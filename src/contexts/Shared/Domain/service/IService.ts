export interface IService<T> {
  get(id: string): T | undefined;
  getAll(): T[];
  update(id: string, object: T): T;
  create(T: T): T;
  delete(id: string): string | void;
}
