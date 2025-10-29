# Next.js Todo App

A secure, full-stack todo application built with Next.js, featuring authentication and real-time CRUD operations.

## Features

- User authentication with Next-Auth
- CRUD operations (Create, Read, Update and Delete)
- Secure server actions with authorization checks
- Responsive design using Tailwind CSS
- Server-side rendering (SSR) for optimal performance
- Type-safe with full TypeScript coverage

## Tech Stack

- **Framework**: Next.js (App Router)
- **Authentication**: Next-Auth with Credentials Provider
- **Database**: MySQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Validation**: TypeScript

## Security & Architecture Decisions

### Security Measures

1. **Explicit Authorization**: Every server action includes explicit checks to verify user ownership of todos
2. **Database-Level Constraints**: Prisma schema enforces user-todo relationships with CASCADE delete
3. **No Public API Routes**: All mutations use Server Actions for enhanced security
4. **Input Validation**: TypeScript interfaces and runtime checks for all data

### Architecture Benefits

1. **Component-Driven UI**: Modular, reusable components with single responsibilities
2. **Type Safety**: Full TypeScript coverage with no `any` types
3. **Performance Optimized**: SSR for initial load, client-side mutations with revalidation
4. **Responsive Design**: Mobile-first approach with Tailwind CSS

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/mnaderian/todo-app.git
   cd todo-app
   npm install
   ```

2. **Setup MySQL DB:**
   
   Login and Create a database in MySQL:

   ```bash
   # login to MySQL
   mysql -u root -p

   # Create the database
   CREATE DATABASE todo_app;

   quit
   ```

3. **Create a `.env` file:**

   ```env
   # Database
   DATABASE_URL="mysql://<mysql_username>:<mysql_password>@localhost:3306/todo_app"

   # NextAuth
   NEXTAUTH_SECRET="<your-secret-key>"
   NEXTAUTH_URL="http://localhost:3000"
   ```

   If your MySQL doesn't have a password:
   ```env
   DATABASE_URL="mysql://<mysql_username>@localhost:3306/todo_app"
   ```

3. **Setup Prisma:**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Push schema to database
   npx prisma db push
   ```
4. **Run the app:**

   ```bash
   npm run dev
   ```
   Visit http://localhost:3000
