
export interface Todo {
    id: string;
    task: string;
    isCompleted: boolean;
    list?: Todo;
    dueDate?: Date;
    priority: 'low' | 'medium' | 'high';
    reminders?: Date[];
    createdAt: Date;
}