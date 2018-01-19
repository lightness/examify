export interface Service<T> {
    add(entity: T): Promise<T>;
    getAll(): Promise<T[]>;
    getById(id: number): Promise<T>;
    update(entity: T): Promise<T>;
    remove(entity: T): Promise<T>;
}
