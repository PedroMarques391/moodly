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

interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    createUser(user: CreateUser): Promise<void>;
    login(user: LoginUser): Promise<User | null>;
}

declare class Id {
    static generate(): string;
}

export { type CreateUser, type IUserRepository, Id, type LoginUser, type User };
