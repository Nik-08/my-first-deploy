import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { userApi } from '../../entities/user/api/userApi';
import { useState } from 'react';
import styled from 'styled-components';
import type { ResetPasswordDto } from '../../shared/types';

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const AuthCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin: 0 0 30px 0;
  text-align: center;
  color: #333;
  font-size: 28px;
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #fcc;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ErrorText = styled.span`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
  display: block;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const AuthLinks = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const AuthLink = styled(Link)`
  display: block;
  color: #667eea;
  text-decoration: none;
  margin: 8px 0;
  transition: color 0.3s;

  &:hover {
    color: #764ba2;
    text-decoration: underline;
  }
`;

const SuccessMessage = styled.p`
  color: #0f5132;
  text-align: center;
`;

interface ResetPasswordFormData extends ResetPasswordDto {
  confirmPassword: string;
}

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  const newPassword = watch('newPassword');

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setIsLoading(true);
      setError('');
      await userApi.resetPassword({
        email: data.email,
        newPassword: data.newPassword,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Ошибка сброса пароля. Попробуйте снова.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <AuthContainer>
        <AuthCard>
          <Title>Пароль успешно изменен</Title>
          <SuccessMessage>Перенаправление на страницу входа...</SuccessMessage>
        </AuthCard>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <AuthCard>
        <Title>Сброс пароля</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type='email'
              {...register('email', {
                required: 'Email обязателен',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Неверный формат email',
                },
              })}
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Новый пароль</Label>
            <Input
              type='password'
              {...register('newPassword', {
                required: 'Пароль обязателен',
                minLength: {
                  value: 6,
                  message: 'Пароль должен быть не менее 6 символов',
                },
              })}
            />
            {errors.newPassword && (
              <ErrorText>{errors.newPassword.message}</ErrorText>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Подтвердите новый пароль</Label>
            <Input
              type='password'
              {...register('confirmPassword', {
                required: 'Подтвердите пароль',
                validate: (value) =>
                  value === newPassword || 'Пароли не совпадают',
              })}
            />
            {errors.confirmPassword && (
              <ErrorText>{errors.confirmPassword.message}</ErrorText>
            )}
          </FormGroup>

          <SubmitButton type='submit' disabled={isLoading}>
            {isLoading ? 'Сброс...' : 'Сбросить пароль'}
          </SubmitButton>
        </form>

        <AuthLinks>
          <AuthLink to='/login'>Вернуться к входу</AuthLink>
        </AuthLinks>
      </AuthCard>
    </AuthContainer>
  );
};
