// Общие типы
export interface User {
  id: string;
  email: string;
  createdAt?: string;
}

export interface Todo {
  id: string;
  title: string;
  description: string | null;
  status: TodoStatus;
  creatorId: string;
  image: string | null;
  endDatetime: string | null;
  createDatetime: string;
  createdAt: string;
  updatedAt: string;
}

export const TodoStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export type TodoStatus = (typeof TodoStatus)[keyof typeof TodoStatus];

// DTO типы
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
}

export interface ResetPasswordDto {
  email: string;
  newPassword: string;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  status?: TodoStatus;
  image?: string;
  endDatetime?: string;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  status?: TodoStatus;
  image?: string;
  endDatetime?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
