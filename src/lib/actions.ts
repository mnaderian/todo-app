'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Security helper function
async function authenticateAndAuthorize(todoId?: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error('Unauthorized: Please sign in')
  }
  
  if (todoId) {
    const todo = await prisma.todo.findUnique({
      where: { id: todoId }
    })
    
    if (!todo || todo.userId !== session.user.id) {
      throw new Error('Forbidden: You do not have permission to modify this todo')
    }
    
    return { userId: session.user.id, todo }
  }
  
  return { userId: session.user.id }
}

// Helper to extract data from FormData or object
function getFormDataValue(data: FormData | any, key: string): string {
  if (data instanceof FormData) {
    return data.get(key) as string
  } else {
    return data[key] as string
  }
}

export async function createTodo(formData: FormData | { title: string }) {
  try {
    // Use helper function to safely get title
    const title = getFormDataValue(formData, 'title')
    
    if (!title || title.trim().length === 0) {
      return { error: 'Title is required' }
    }

    const { userId } = await authenticateAndAuthorize()
    
    await prisma.todo.create({
      data: { 
        title: title.trim(), 
        userId 
      }
    })
    
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Create todo error:', error)
    return { error: 'Failed to create todo' }
  }
}

export async function updateTodo(formData: FormData | { id: string; completed: boolean }) {
  try {
    const id = getFormDataValue(formData, 'id')
    const completed = getFormDataValue(formData, 'completed') === 'true'
    
    await authenticateAndAuthorize(id)
    
    await prisma.todo.update({
      where: { id },
      data: { completed }
    })
    
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Update todo error:', error)
    return { error: 'Failed to update todo' }
  }
}

export async function deleteTodo(formData: FormData | { id: string }) {
  try {
    const id = getFormDataValue(formData, 'id')
    
    await authenticateAndAuthorize(id)
    
    await prisma.todo.delete({
      where: { id }
    })
    
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Delete todo error:', error)
    return { error: 'Failed to delete todo' }
  }
}