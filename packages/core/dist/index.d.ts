type BaselineMood = "very_low" | "low" | "neutral" | "good" | "very_good";

interface Mood {
    id: string;
    rating: BaselineMood;
    dateLogged: Date;
    description: string;
    emoji: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

interface MoodRepositoryModel {
    createMood(userId: string, data: CreateMoodDTO): Promise<void>;
    deleteMood(id: string): Promise<void>;
    updateMood(id: string, data: UpdateMoodDTO): Promise<void>;
    getMoodById(id: string): Promise<Mood | null>;
    getMoods(userId: string): Promise<Mood[] | []>;
    getMoodsByDateRange(userId: string, initalDate: Date, finalDate: Date): Promise<Mood[] | []>;
    checkMoodExistsByDate(userId: string, date: Date): Promise<boolean>;
}

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

type LoginUser = Pick<User, "email" | "password">;

type Payload = Pick<User, "id" | "email" | "name">;

interface UserRepositoryModel {
    findByEmail(email: string): Promise<User | null>;
    createUser(user: createUserDTO): Promise<Payload>;
    findById(id: string): Promise<User | null>;
    update(id: string, user: Partial<User>): Promise<void>;
}

interface CreateMoodDTO {
    rating: BaselineMood;
    description: string;
    emoji: string;
    dateLogged: Date;
}

interface UpdateMoodDTO {
    rating?: BaselineMood;
    description?: string;
    emoji?: string;
}

interface createUserDTO {
    name: string;
    email: string;
    password: string;
}

interface updateUserDTO {
    name?: string;
    image?: string;
    bio?: string;
    baselineMood?: BaselineMood;
    triggers?: string;
    copingStrategies?: string;
    goals?: string;
}

export type { BaselineMood, CreateMoodDTO, LoginUser, Mood, MoodRepositoryModel, Payload, UpdateMoodDTO, User, UserRepositoryModel, createUserDTO, updateUserDTO };
