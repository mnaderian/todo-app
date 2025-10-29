'use client'

import { createTodo } from '@/lib/actions'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function CreateTodoForm() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await createTodo(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setError('')
        router.refresh() // Refresh to show new todo
      }
    })
  }

  return (
    <div className="p-6 border-b border-gray-200">
      <form action={handleSubmit} className="flex space-x-4">
        <input
          type="text"
          name="title"
          placeholder="What needs to be done?"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isPending ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}