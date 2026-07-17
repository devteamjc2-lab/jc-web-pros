# JC Web Pro Chat

Simple project scaffold for a Node backend and React frontend in separate folders.

## Structure

- `backend/` — Node.js Express API server
- `frontend/` — React app using Vite

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
   npm run start
   ```
4. Start the frontend:
   ```bash
   cd ../frontend
   npm run dev
   ```

The frontend expects the backend API at `http://localhost:4000`.

## Database

The backend uses MySQL/MariaDB, the same database server shown in phpMyAdmin.

```bash
cd backend
cp .env.example .env
```

Then edit `backend/.env` and set your phpMyAdmin/MySQL credentials:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=jc_web_chat
```

The backend creates the database/table automatically when it starts. You can also import `backend/schema.sql` manually in phpMyAdmin.

## API

- `GET /api/messages` - returns all chat messages
- `POST /api/messages` - accepts `{ "user": "Name", "text": "Message" }`
