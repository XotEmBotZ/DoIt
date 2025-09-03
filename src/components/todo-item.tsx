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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function TodoEditor(todo: Todo, dispatch: (newTodo: Todo) => void) {
    const [taskInp, setTaskInp] = useState(todo.task)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>

            <div className="flex items-center gap-3">
                <Checkbox
                    id="isCompleted"
                    name="isCompleted"
                    checked={todo.isCompleted}
                    onCheckedChange={e => dispatch({ ...todo, isCompleted: e as boolean })}
                    style={{ width: '16px', height: '16px' }}
                />
                <div>
                    {/* <Label htmlFor="task" style={{ display: 'block', marginBottom: '4px' }}>Task</Label> */}
                    <Input
                        id="task"
                        type="text"
                        name="task"
                        value={taskInp}
                        onChange={e => setTaskInp(e.target.value)}
                        onBlur={e => {
                            dispatch({ ...todo, task: taskInp, id: taskInp.replace(' ', '-') })
                        }}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="priority" style={{ display: 'block', marginBottom: '4px' }}>Priority</Label>
                <Select defaultValue={todo.priority} onValueChange={(val) => dispatch({ ...todo, priority: val as Todo['priority'] })}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Meduim</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="dueDate" style={{ display: 'block', marginBottom: '4px' }}>Due Date</Label>
                <DateTimePicker date={todo.dueDate} setDate={date => dispatch({ ...todo, dueDate: date })} />
            </div>
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
                setTodo && setTodo(todo.id, { ...todo, isCompleted: !todo.isCompleted })
                break;

            case 'update-priority':
                setTodo && setTodo(todo.id, { ...todo, priority: action.priority })
                break;

            case 'edit':
                setTodo && setTodo(todo.id, { ...todo, ...action.newTodo })
                break;

        }
    }

    return <div className='p-1 rounded-lg flex px-5 *:items-center *:gap-2 shadow-lg/5 bg-background border dark:bg-primary-foreground justify-between align-middle max-w-full'>
        <div className='flex flex-row max-w-4/5'>
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
                <PopoverTrigger className="max-w-full">
                    <p className={cn('overflow-hidden overflow-ellipsis w-full text-nowrap', todo.isCompleted ? 'line-through' : '')}>{todo.task}</p>
                </PopoverTrigger>
                <PopoverContent className="mt-3">
                    {TodoEditor(todo, (newTodo) => dispatch({ type: 'edit', newTodo }))}
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
