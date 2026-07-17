# JC Web Pros

This repository contains a full-stack project with a Next.js backend and a Vite frontend.

## Structure

- backend/ — database-connected Next.js app with API routes
- frontend/ — Vite React frontend

## Setup

1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
3. Start the backend:
   ```bash
   cd ../backend
   npm run dev
   ```
4. Start the frontend:
   ```bash
   cd ../frontend
   npm run dev
   ```

## Database

The backend uses MySQL. Configure credentials in backend/.env.local or backend/.env:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=jc_web_pros
```

## API

- GET /api/db — returns database records
- POST /api/db — inserts a new record
- PUT /api/db — updates a record
- DELETE /api/db?id=1 — deletes a record
