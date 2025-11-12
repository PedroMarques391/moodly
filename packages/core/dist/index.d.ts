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
type Payload = Pick<User, "id" | "email" | "name">;

interface UserRepositoryModel {
    findByEmail(email: string): Promise<User | null>;
    createUser(user: CreateUser): Promise<Payload>;
    findById(id: string): Promise<User | null>;
    update(id: string, user: Partial<User>): Promise<void>;
}

export type { CreateUser, LoginUser, Payload, User, UserRepositoryModel };
