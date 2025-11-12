import apiClient from '../../../shared/api/client';
import type { Todo, CreateTodoDto, UpdateTodoDto, TodoStatus } from '../../../shared/types';

export const todoApi = {
  getAll: async (): Promise<Todo[]> => {
    const response = await apiClient.get<Todo[]>('/todos');
    return response.data;
  },

  getById: async (id: string): Promise<Todo> => {
    const response = await apiClient.get<Todo>(`/todos/${id}`);
    return response.data;
  },

  create: async (data: CreateTodoDto): Promise<Todo> => {
    const response = await apiClient.post<Todo>('/todos', data);
    return response.data;
  },

  update: async (id: string, data: UpdateTodoDto): Promise<Todo> => {
    const response = await apiClient.patch<Todo>(`/todos/${id}`, data);
    return response.data;
  },

  updateStatus: async (id: string, status: TodoStatus): Promise<Todo> => {
    const response = await apiClient.patch<Todo>(`/todos/${id}/status`, { status });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/todos/${id}`);
  },
};

