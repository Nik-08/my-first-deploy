import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type {
  CreateTodoDto,
  UpdateTodoDto,
  Todo,
} from '../../entities/todo/model/types';
import { TodoStatus } from '../../entities/todo/model/types';
import { ImageUpload } from '../../shared/ui/ImageUpload';
import styled from 'styled-components';

interface TodoFormProps {
  todo?: Todo | null;
  onSubmit: (data: CreateTodoDto | UpdateTodoDto) => Promise<void>;
  onCancel: () => void;
}

const FormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const FormCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

const FormTitle = styled.h2`
  margin: 0 0 20px 0;
  color: #333;
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
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  box-sizing: border-box;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
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

const FormActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 30px;
`;

const CancelButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  background: #e0e0e0;
  color: #333;

  &:hover {
    background: #d0d0d0;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
`;

export const TodoForm = ({ todo, onSubmit, onCancel }: TodoFormProps) => {
  const isEdit = !!todo;
  const [image, setImage] = useState<string | null>(todo?.image || null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTodoDto>({
    defaultValues: todo
      ? {
          title: todo.title,
          description: todo.description || '',
          status: todo.status,
          endDatetime: todo.endDatetime
            ? new Date(todo.endDatetime).toISOString().slice(0, 16)
            : '',
        }
      : {},
  });

  const onFormSubmit = async (data: CreateTodoDto) => {
    const submitData = {
      ...data,
      image: image || undefined,
      endDatetime: data.endDatetime || undefined,
    };
    await onSubmit(submitData);
  };

  return (
    <FormOverlay onClick={onCancel}>
      <FormCard onClick={(e) => e.stopPropagation()}>
        <FormTitle>
          {isEdit ? 'Редактировать задачу' : 'Создать задачу'}
        </FormTitle>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <FormGroup>
            <Label>Название *</Label>
            <Input
              type='text'
              {...register('title', { required: 'Название обязательно' })}
            />
            {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Описание</Label>
            <Textarea rows={4} {...register('description')} />
          </FormGroup>

          <FormGroup>
            <Label>Статус</Label>
            <Select {...register('status')}>
              <option value={TodoStatus.PENDING}>Ожидает</option>
              <option value={TodoStatus.IN_PROGRESS}>В работе</option>
              <option value={TodoStatus.COMPLETED}>Завершено</option>
              <option value={TodoStatus.CANCELLED}>Отменено</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Дата окончания</Label>
            <Input type='datetime-local' {...register('endDatetime')} />
          </FormGroup>

          <FormGroup>
            <Label>Изображение</Label>
            <ImageUpload value={image} onChange={setImage} />
          </FormGroup>

          <FormActions>
            <CancelButton type='button' onClick={onCancel}>
              Отмена
            </CancelButton>
            <SubmitButton type='submit'>
              {isEdit ? 'Сохранить' : 'Создать'}
            </SubmitButton>
          </FormActions>
        </form>
      </FormCard>
    </FormOverlay>
  );
};
