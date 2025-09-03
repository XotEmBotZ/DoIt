export interface Tags {
    title: string,
    color: string
}

export interface Todo {
    id: string;
    task: string;
    isCompleted: boolean;
    subTodo?: Todo[];
    dueDate?: Date;
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
    tags?: Tags
}

export const priorityStr: string[] = ['high', 'medium', 'low']