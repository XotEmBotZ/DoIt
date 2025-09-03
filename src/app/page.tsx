'use client';
import { ModeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { H1, P } from '@/lib/typography';
import { cn } from '@/lib/utils';
import React, { useState, useEffect, useReducer } from 'react';
import { CircleArrowDown, CircleArrowUp, CircleDot, Plus } from 'lucide-react'
import { priorityStr, Todo } from '@/lib/types';
import TodoItem from '@/components/todo-item';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'next/navigation';
import { url } from 'inspector';
import { toast } from "sonner"


export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const urlTodolist = useSearchParams().get('todoList');
  if (urlTodolist && todoList.length === 0) {
    console.log('Loading from URL')
    console.log(urlTodolist)
    setTodoList(JSON.parse(urlTodolist));
  }
  const [newTodoTxt, setNewTodoTxt] = useState('');
  const [domain, setDomain] = useState('')

  useEffect(() => {
    if (!urlTodolist) {
      setTodoList(JSON.parse(localStorage.getItem('todos') || '[]'))
    }
    setDomain(window.location.origin)
  }, [])


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList))
  }, [todoList])


  const handleNewTodo = () => {
    if (todoList.map(t => t.id).includes(newTodoTxt.replace(' ', '-'))) {
      toast("Todo already exists", { closeButton: true })
      return
    }
    setTodoList(prev => [...prev, {
      id: newTodoTxt.replace(' ', '-'),
      task: newTodoTxt,
      isCompleted: false,
      priority: 'medium',
      createdAt: new Date()
    }])
    setNewTodoTxt('')
  }

  const handleTodoEdit = (todoId: string, todo: Todo) => {
    setTodoList(prev => [...prev.map(t => t.id === todoId ? todo : t)])
  }

  const handleDeleteCompleted = () => {
    setTodoList(prev => prev.filter(val => !val.isCompleted))
  }
  const handleDeleteAll = () => {
    setTodoList(prev => [])
  }
  return (
    <>
      <nav className='flex flex-row justify-between items-center px-4 py-2'>
        <H1>DoIt</H1>
        <Popover>
          <PopoverTrigger>
            <Label className='p-3 bg-muted rounded-xl'>Get Shareable Link</Label>
          </PopoverTrigger>
          <PopoverContent>
            <Input value={domain + '?todoList=' + encodeURIComponent((JSON.stringify(todoList)))} readOnly />
          </PopoverContent>
        </Popover>
        <ModeToggle />
      </nav>
      <main className='md:max-w-4/5 m-auto mt-4 w-10/12'>
        <div className='flex flex-row gap-1'>
          <Input placeholder='Enter a TODO...' value={newTodoTxt} onChange={e => setNewTodoTxt(e.target.value)} onKeyUp={event => { if (event.key === 'Enter') { handleNewTodo() } }} className='bg-background' />
          <Button variant={'outline'} onClick={handleNewTodo}><Plus /></Button>
        </div>
        <div className='mt-5 flex gap-2 flex-col'>
          {todoList.sort((a, b) => {
            return priorityStr.indexOf(a.priority) - priorityStr.indexOf(b.priority)
          }).map(todo => <TodoItem todo={todo} key={todo.id} setTodo={handleTodoEdit} />)}
        </div>
        <div className='flex gap-1 justify-end mt-5'>
          <Button variant={'secondary'} onClick={handleDeleteCompleted}>Delete Completed</Button>
          <Button variant={'destructive'} onClick={handleDeleteAll}>Delete Alll</Button>
        </div>
      </main>

    </>
  );
}