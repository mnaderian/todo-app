'use client'

import { updateTodo, deleteTodo } from '@/lib/actions'
import { Todo } from '@/types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const [completed, setCompleted] = useState(todo.completed)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleToggle = async () => {
    const newCompleted = !completed
    setCompleted(newCompleted)
    
    const formData = new FormData()
    formData.append('id', todo.id)
    formData.append('completed', newCompleted.toString())
    
    await updateTodo(formData)
    router.refresh() // Refresh to show updated state
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    
    const formData = new FormData()
    formData.append('id', todo.id)
    
    await deleteTodo(formData)
    router.refresh() // Refresh to show todo removed
  }

  return (
    <div className={`flex items-center justify-between p-4 border-b border-gray-200 ${isDeleting ? 'opacity-50' : ''}`}>
      <div className="flex items-center space-x-3 flex-1">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggle}
          className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span className={`flex-1 ${completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-600 hover:text-red-800 disabled:opacity-50 ml-2"
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  )
}