export interface Tags {
    title: string,
    color: string
}

export interface Todo {
    id: string;
    task: string;
    isCompleted: boolean;
    list?: Todo;
    dueDate?: Date;
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
    tags?: Tags
}