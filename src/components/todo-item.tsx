'use client'
import { Todo } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card"
import { format, set } from "date-fns"
import { Check, CircleArrowDown, CircleArrowUp, CircleDot } from "lucide-react"
import { useReducer, useState } from "react"
import { HoverCardContent } from "./ui/hover-card"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { DateTimePicker } from "./date-time-picker"


function TodoEditor(todo: Todo, dispatch: (newTodo: Todo) => void) {
    const [todoData, setTodoData] = useState(todo)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        const newValue =
            type === 'checkbox' ? (e.target as HTMLInputElement).checked
                : type === 'date' ? (value ? new Date(value) : undefined)
                    : value;

        setTodoData(prev => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleChk = (checked: boolean) => {
        setTodoData(prev => ({
            ...prev,
            isCompleted: checked,
        }));
    }

    const handleSaveChanges = () => {
        dispatch(todoData);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>

            <div className="flex items-center gap-3">
                <Checkbox
                    id="isCompleted"
                    name="isCompleted"
                    checked={todoData.isCompleted}
                    onCheckedChange={handleChk}
                    style={{ width: '16px', height: '16px' }}
                />
                <div>
                    {/* <Label htmlFor="task" style={{ display: 'block', marginBottom: '4px' }}>Task</Label> */}
                    <Input
                        id="task"
                        type="text"
                        name="task"
                        value={todoData.task}
                        onChange={e => setTodoData(prev => { return { ...prev, task: e.target.value, id: e.target.value.replace(' ', '-') } })}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="priority" style={{ display: 'block', marginBottom: '4px' }}>Priority</Label>
                <select
                    id="priority"
                    name="priority"
                    value={todoData.priority}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div>
                <Label htmlFor="dueDate" style={{ display: 'block', marginBottom: '4px' }}>Due Date</Label>
                <DateTimePicker date={todoData.dueDate} setDate={date => setTodoData(prev => {
                    return { ...prev, dueDate: date }
                })} />
            </div>
            <Button onClick={handleSaveChanges} style={{ padding: '10px', cursor: 'pointer' }}>
                Save Changes
            </Button>
        </div>
    );

}

export default function TodoItem({ todo, setTodo }: { todo: Todo, setTodo?: (id: string, todo: Todo) => void }) {
    type TodoAction = { type: 'toggle-done' } |
    { type: 'update-priority', priority: Todo['priority'] } |
    { type: 'edit', newTodo: Todo }

    const dispatch = (action: TodoAction) => {

        switch (action.type) {
            case 'toggle-done':
                console.log(action, todo)
                setTodo && setTodo(todo.id, { ...todo, isCompleted: !todo.isCompleted })
                break;

            case 'update-priority':
                console.log(action, todo)
                setTodo && setTodo(todo.id, { ...todo, priority: action.priority })
                break;

            case 'edit':
                console.log(action, todo)
                setTodo && setTodo(todo.id, { ...todo, ...action.newTodo })
                break;

        }
    }
    // const [todoData, dispatch] = useReducer(reducer, todo)



    return <div className='p-1 rounded-lg flex px-5 *:items-center *:gap-2 shadow-lg/5 bg-background border dark:bg-primary-foreground justify-between align-middle'>
        <div className='flex flex-row'>
            <Checkbox checked={todo.isCompleted} onCheckedChange={e => dispatch({ type: 'toggle-done' })} />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    {(() => {
                        switch (todo.priority) {
                            case 'high':
                                return <CircleArrowUp className='text-destructive' />
                            case 'low':
                                return <CircleArrowDown className='text-warning' />
                            case 'medium':
                                return <CircleDot />
                        }
                    })()}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit">
                    <DropdownMenuLabel>Priority</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={todo.priority} onValueChange={e => dispatch({ type: 'update-priority', priority: e as Todo['priority'] })}>
                        <DropdownMenuRadioItem value="high">High</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="low">Low</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <Popover>
                <PopoverTrigger>
                    <p className={cn(' ', todo.isCompleted ? 'line-through' : '')}>{todo.task}</p>
                </PopoverTrigger>
                <PopoverContent className="mt-3">
                    {/* {TodoEditor(todoData, (newTodo) => dispatch({ type: 'edit', newTodo }))} */}
                </PopoverContent>
            </Popover>

        </div>
        <HoverCard>
            <HoverCardTrigger>
                <div>
                    <p className={cn(
                        'text-muted-foreground text-sm self-end',
                        todo.dueDate && new Date() > todo.dueDate ? 'text-destructive' : ''
                    )}>
                        {todo.dueDate ? format(todo.dueDate, 'd MMM H:mm') : ''}
                    </p>
                </div>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="w-fit">
                    <p>
                        CreatedAt: {format(todo.createdAt, 'dd MMM yyyy HH:mm:ss')}
                    </p>
                </div>
            </HoverCardContent>
        </HoverCard>
    </div>

}
