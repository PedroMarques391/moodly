interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    bio: string;
    baselineMood: "very_low" | "low" | "neutral" | "good" | "very_good" | undefined;
    triggers: string;
    copingStrategies: string;
    goals: string;
}

type CreateUser = Pick<User, "name" | "email" | "password">;

type LoginUser = Pick<User, "email" | "password">;

type Payload = Pick<User, "id" | "email" | "name">;

type UpdateUser = Partial<Omit<User, "id" | "email" | "password" | "createdAt" | "updatedAt">>;

interface UserRepositoryModel {
    findByEmail(email: string): Promise<User | null>;
    createUser(user: CreateUser): Promise<Payload>;
    findById(id: string): Promise<User | null>;
    update(id: string, user: Partial<User>): Promise<void>;
}

export type { CreateUser, LoginUser, Payload, UpdateUser, User, UserRepositoryModel };
