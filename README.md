# TO-DO Application

Полнофункциональное приложение для управления задачами с аутентификацией.

## Быстрый старт

### 1. Запуск базы данных

```bash
docker-compose -f stack.local.yml up -d
```

### 2. Настройка Backend

```bash
cd backend
yarn install
```

Создайте файл `.env` в папке `backend/`:
```env
DB_HOST=localhost
DB_PORT=5454
DB_USERNAME=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_DATABASE=postgres_db

JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
PORT=8000
```

Запуск:
```bash
yarn start:dev
```

Backend будет доступен на `http://localhost:8000`
Swagger документация: `http://localhost:8000/api`

### 3. Настройка Frontend

```bash
cd frontend
yarn install
yarn dev
```

Frontend будет доступен на `http://localhost:5173` (или другой порт, указанный Vite)

## Структура проекта

- `backend/` - NestJS API сервер
- `frontend/` - React приложение на Vite
- `stack.local.yml` - Docker Compose конфигурация для PostgreSQL

