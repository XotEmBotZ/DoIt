'use client'
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { priorityStr, Todo } from "@/lib/types"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CircleArrowDown, CircleArrowUp, CircleDot } from "lucide-react"
import { useState } from "react"
import { DateTimePicker } from "./date-time-picker"
import { HoverCardContent } from "./ui/hover-card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

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
    const [newTodoTxt, setNewTodoTxt] = useState('')
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

    const handleNewTodo = () => {
        let newSubTodo: Todo[] = Array.isArray(todo.subTodo) ? [...todo.subTodo] : []
        if (todo.subTodo?.map(e => e.id).includes(newTodoTxt.replace(' ', '-'))) {
            toast("SubTodo already exists", { closeButton: true })
            return
        }
        newSubTodo.push({
            id: newTodoTxt.replace(' ', '-'),
            task: newTodoTxt,
            isCompleted: false,
            priority: 'medium',
            createdAt: new Date()
        })
        setTodo && setTodo(todo.id, { ...todo, subTodo: newSubTodo })
    }

    const handleEditSubTodo = (id: string, subTodo: Todo) => {
        dispatch({
            type: 'edit',
            newTodo: { ...todo, subTodo: todo.subTodo ? todo.subTodo.map(t => t.id === id ? subTodo : t) : [subTodo] }
        })
    }

    return (
        <div>
            <div className='p-1 rounded-lg flex px-5 *:items-center *:gap-2 shadow-lg/5 bg-background border dark:bg-primary-foreground justify-between align-middle max-w-full'>
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

                <div className="flex flex-row gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div>
                                <Plus className="" onClick={e => console.log("GAR MARA")} />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <div className='flex flex-row gap-1 p-1'>
                                <Input placeholder='Enter a TODO...' value={newTodoTxt} onChange={e => setNewTodoTxt(e.target.value)} onKeyUp={event => { if (event.key === 'Enter') { handleNewTodo() } }} className='bg-background' />
                                <Button variant={'outline'} onClick={handleNewTodo}><Plus /></Button>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <HoverCard>
                        <HoverCardTrigger>
                            <p className={cn(
                                'text-muted-foreground text-sm self-end',
                                todo.dueDate && new Date() >= todo.dueDate ? 'text-destructive' : ''
                            )}>
                                {todo.dueDate ? format(todo.dueDate, 'd MMM H:mm') : ''}
                            </p>

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
            </div>
            <div className="pl-5 flex gap-1 flex-col mt-1">
                {todo.subTodo ? todo.subTodo.sort((a, b) => {
                    return priorityStr.indexOf(a.priority) - priorityStr.indexOf(b.priority)
                }).map(todo => <TodoItem todo={todo} setTodo={handleEditSubTodo} />) : <></>}
            </div>
        </div>
    )
}
