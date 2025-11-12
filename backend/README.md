# Backend - TO-DO Application

NestJS backend приложение для управления TO-DO задачами с аутентификацией.

## Технологии

- NestJS
- TypeORM
- PostgreSQL
- JWT Authentication
- TypeScript
- Swagger/OpenAPI

## Установка

1. Установите зависимости:
```bash
cd backend
yarn install
```

2. Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

3. Настройте переменные окружения в `.env`:
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

## Запуск

```bash
# Разработка
yarn start:dev

# Продакшн
yarn build
yarn start:prod
```

Приложение будет доступно на `http://localhost:8000`
Swagger документация будет доступна на `http://localhost:8000/api`

## Swagger документация

После запуска приложения откройте браузер и перейдите по адресу:
```
http://localhost:8000/api
```

В Swagger UI вы сможете:
- Просмотреть все доступные endpoints
- Протестировать API прямо из браузера
- Авторизоваться через кнопку "Authorize" (введите JWT токен после логина)
- Увидеть примеры запросов и ответов

## API Endpoints

### Аутентификация

- `POST /auth/register` - Регистрация нового пользователя
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /auth/login` - Вход в систему
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
  Возвращает `access_token` для использования в заголовке `Authorization: Bearer <token>`

- `GET /auth/me` - Получение информации о текущем пользователе (требует токен)

- `POST /auth/reset-password` - Сброс пароля
  ```json
  {
    "email": "user@example.com",
    "newPassword": "newpassword123"
  }
  ```

### TO-DO задачи

Все endpoints требуют JWT токен в заголовке `Authorization: Bearer <token>`

- `POST /todos` - Создание задачи
  ```json
  {
    "title": "Task title",
    "description": "Task description (optional)",
    "status": "PENDING",
    "image": "base64encodedimage (optional)",
    "endDatetime": "2024-12-31T23:59:59Z"
  }
  ```

- `GET /todos` - Получение всех задач пользователя

- `GET /todos/:id` - Получение задачи по ID

- `PATCH /todos/:id` - Обновление задачи
  ```json
  {
    "title": "Updated title",
    "description": "Updated description",
    "status": "IN_PROGRESS",
    "image": "base64encodedimage",
    "endDatetime": "2024-12-31T23:59:59Z"
  }
  ```

- `PATCH /todos/:id/status` - Изменение статуса задачи
  ```json
  {
    "status": "COMPLETED"
  }
  ```
  Доступные статусы: `PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`

- `DELETE /todos/:id` - Удаление задачи

## Структура проекта

```
backend/
├── src/
│   ├── auth/           # Модуль аутентификации
│   ├── users/          # Модуль пользователей
│   ├── todos/          # Модуль задач
│   ├── app.module.ts   # Корневой модуль
│   └── main.ts         # Точка входа
├── package.json
└── tsconfig.json
```

