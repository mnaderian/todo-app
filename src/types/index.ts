export interface Todo {
  id: string
  title: string
  completed: boolean
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  name?: string
}