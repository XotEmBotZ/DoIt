'use client';
import { ModeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { H1, P } from '@/lib/typography';
import { cn } from '@/lib/utils';
import { Checkbox } from '@radix-ui/react-checkbox';
import React, { useState, useEffect, useMemo } from 'react';
import { Plus } from 'lucide-react'
import { Todo } from '@/lib/types';
// import Image from "next/image";

function TodoItem({ todo }: { todo: Todo }) {
  return <></>
}

export default function Home() {
  const [newTodoTxt, setNewTodoTxt] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([])

  const handleNewTodo = () => {
    setTodoList(prev => [...prev, {
      id: newTodoTxt.replace(' ', '-'),
      task: newTodoTxt,
      isCompleted: false,
      priority: 'low',
      createdAt: new Date()
    }])
    setNewTodoTxt('')
  }
  return (
    <>
      <nav className='flex flex-row justify-between items-center px-4 py-2'>
        <H1>DoIt</H1>
        <ModeToggle />
      </nav>
      <main className='md:max-w-4/5 m-auto mt-4'>
        <div className='flex flex-row gap-1'>
          <Input placeholder='Enter a TODO...' value={newTodoTxt} onChange={e => setNewTodoTxt(e.target.value)} onKeyUp={event => { if (event.key === 'Enter') { handleNewTodo() } }} />
          <Button variant={'outline'} onClick={handleNewTodo}><Plus /></Button>
        </div>
        <div>
          {JSON.stringify(todoList)}
        </div>
      </main>
    </>
  );
}