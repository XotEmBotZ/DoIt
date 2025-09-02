import { Todo } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card"
import { format } from "date-fns"
import { CircleArrowDown, CircleArrowUp, CircleDot } from "lucide-react"
import { useReducer } from "react"
import { HoverCardContent } from "./ui/hover-card"

export default function TodoItem({ todo, setTodos }: { todo: Todo, setTodos?: () => void }) {
    type TodoAction = { type: 'toggle-done' } |
    { type: 'update-priority', priority: Todo['priority'] }

    const reducer = (state: Todo, action: TodoAction): Todo => {
        switch (action.type) {
            case 'toggle-done':
                return { ...state, isCompleted: !state.isCompleted }
            case 'update-priority':
                return { ...state, priority: action.priority }
        }
    }
    const [todoData, dispatch] = useReducer(reducer, todo)
    return <div className='p-1 rounded-xl flex px-5 *:items-center *:gap-2 shadow-lg/5 bg-background border dark:bg-primary-foreground justify-between align-middle'>
        <div className='flex flex-row'>
            <Checkbox checked={todoData.isCompleted} onCheckedChange={e => dispatch({ type: 'toggle-done' })} />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    {(() => {
                        switch (todoData.priority) {
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
                    <DropdownMenuRadioGroup value={todoData.priority} onValueChange={e => dispatch({ type: 'update-priority', priority: e as Todo['priority'] })}>
                        <DropdownMenuRadioItem value="high">High</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="low">Low</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <p className={cn(' ', todoData.isCompleted ? 'line-through' : '')}>{todoData.task}</p>
        </div>
        <HoverCard>
            <HoverCardTrigger>
                <div>
                    <p className={cn(
                        'text-muted-foreground text-sm self-end',
                        todoData.dueDate && new Date() > todoData.dueDate ? 'text-destructive' : ''
                    )}>
                        {todoData.dueDate ? format(todoData.dueDate, 'd MMM H:mm') : ''}
                    </p>
                </div>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="w-fit">
                    <p>
                        CreatedAt: {format(todoData.createdAt, 'dd MMM yyyy HH:mm:ss')}
                    </p>
                </div>
            </HoverCardContent>
        </HoverCard>
    </div>

}
