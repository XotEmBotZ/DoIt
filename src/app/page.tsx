'use client';
import { ModeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { H1, P } from '@/lib/typography';
import { cn } from '@/lib/utils';
import React, { useState, useEffect, useReducer } from 'react';
import { CircleArrowDown, CircleArrowUp, CircleDot, Plus } from 'lucide-react'
import { Todo } from '@/lib/types';
import TodoItem from '@/components/todo-item';


export default function Home() {
  const [newTodoTxt, setNewTodoTxt] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([
    {
      "id": "Test",
      "task": "Test",
      "isCompleted": false,
      "priority": "medium",
      "createdAt": new Date("2025-09-02T16:40:13.161Z"),
      "dueDate": new Date("2025-08-05T16:40:15.327Z")
    },
    {
      "id": "Test-22",
      "task": "Test 2",
      "isCompleted": false,
      "priority": "low",
      "createdAt": new Date("2025-09-02T16:40:15.327Z")
    },
    {
      "id": "Test-2",
      "task": "Test 2",
      "isCompleted": false,
      "priority": "high",
      "createdAt": new Date("2025-09-02T16:40:15.327Z"),
      "dueDate": new Date("2025-09-05T16:40:15.327Z"),
    }
  ])

  const handleNewTodo = () => {
    setTodoList(prev => [...prev, {
      id: newTodoTxt.replace(' ', '-'),
      task: newTodoTxt,
      isCompleted: false,
      priority: 'medium',
      createdAt: new Date()
    }])
    setNewTodoTxt('')
    console.log(todoList)
  }
  return (
    <>
      <nav className='flex flex-row justify-between items-center px-4 py-2'>
        <H1>DoIt</H1>
        <ModeToggle />
      </nav>
      <main className='md:max-w-4/5 m-auto mt-4'>
        <div className='flex flex-row gap-1'>
          <Input placeholder='Enter a TODO...' value={newTodoTxt} onChange={e => setNewTodoTxt(e.target.value)} onKeyUp={event => { if (event.key === 'Enter') { handleNewTodo() } }} className='bg-background' />
          <Button variant={'outline'} onClick={handleNewTodo}><Plus /></Button>
        </div>
        <div className='mt-5 flex gap-2 flex-col'>
          {todoList.map(todo => <TodoItem todo={todo} key={todo.id} />)}
        </div>
      </main>
    </>
  );
}