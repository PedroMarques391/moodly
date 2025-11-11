interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

declare class Id {
    static generate(): string;
}

export { Id, type User };
