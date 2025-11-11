interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
type CreateUser = Pick<User, "name" | "email" | "password">;
type LoginUser = Pick<User, "email" | "password">;

interface UserRepositoryModel {
    findByEmail(email: string): Promise<User | null>;
    createUser(user: CreateUser): Promise<void>;
    login(user: LoginUser): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    update(id: string, user: Partial<User>): Promise<void>;
}

declare class Encrypt {
    static generate(password: string): Promise<string>;
    static compare(password: string, hash: string): Promise<boolean>;
}

declare class Id {
    static generate(): string;
}

export { type CreateUser, Encrypt, Id, type LoginUser, type User, type UserRepositoryModel };
