import apiClient from '../../../shared/api/client';
import type {
  AuthResponse,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  User,
} from '../../../shared/types';

export const userApi = {
  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  resetPassword: async (
    data: ResetPasswordDto
  ): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(
      '/auth/reset-password',
      data
    );
    return response.data;
  },
};
