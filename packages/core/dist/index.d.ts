interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    createUser(user: Pick<User, "name" | "email" | "password">): Promise<void>;
    login(user: Pick<User, "email" | "password">): Promise<User | null>;
}

declare class Id {
    static generate(): string;
}

export { type IUserRepository, Id, type User };
