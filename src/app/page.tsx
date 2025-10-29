import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TodoList } from '@/components/ToDoList'
import { CreateTodoForm } from '@/components/CreateToDoForm'
import { SignOutButton } from '@/components/SignOutButton'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id! },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Todos</h1>
            <p className="text-sm text-gray-600">Welcome, {session.user.email}</p>
          </div>
          <SignOutButton />
        </div>
        <CreateTodoForm />
        <TodoList todos={todos} />
      </div>
    </div>
  )
}