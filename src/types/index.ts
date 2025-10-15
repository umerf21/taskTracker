export type Task = {
    id: string;
    name: string;
    description?: string;
    completed: boolean;
    synced?: boolean;
    createdAt: number;
};