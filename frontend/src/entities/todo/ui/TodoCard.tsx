import type { Todo } from '../model/types';
import { TodoStatus } from '../model/types';
import { StatusBadge } from './StatusBadge';
import styled from 'styled-components';

interface TodoCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
}

const TodoCardContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const TodoImage = styled.div`
  margin-bottom: 15px;
`;

const TodoImageImg = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;

const TodoContent = styled.div``;

const TodoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const TodoTitle = styled.h3`
  margin: 0;
  color: #333;
  flex: 1;
`;

const TodoDescription = styled.p`
  color: #666;
  margin: 10px 0;
  line-height: 1.5;
`;

const TodoMeta = styled.div`
  margin: 15px 0;
  font-size: 14px;
  color: #999;
`;

const TodoDate = styled.span`
  display: block;
`;

const TodoActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
`;

const StatusSelect = styled.select`
  padding: 8px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  flex: 1;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const EditButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
  background: #667eea;
  color: white;

  &:hover {
    background: #5568d3;
  }
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
  background: #e74c3c;
  color: white;

  &:hover {
    background: #c0392b;
  }
`;

export const TodoCard = ({
  todo,
  onEdit,
  onDelete,
  onStatusChange,
}: TodoCardProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TodoCardContainer>
      {todo.image && (
        <TodoImage>
          <TodoImageImg src={todo.image} alt={todo.title} />
        </TodoImage>
      )}
      <TodoContent>
        <TodoHeader>
          <TodoTitle>{todo.title}</TodoTitle>
          <StatusBadge status={todo.status} />
        </TodoHeader>
        {todo.description && (
          <TodoDescription>{todo.description}</TodoDescription>
        )}
        <TodoMeta>
          {todo.endDatetime && (
            <TodoDate>До: {formatDate(todo.endDatetime)}</TodoDate>
          )}
        </TodoMeta>
        <TodoActions>
          <StatusSelect
            value={todo.status}
            onChange={(e) =>
              onStatusChange(todo.id, e.target.value as TodoStatus)
            }
          >
            <option value={TodoStatus.PENDING}>Ожидает</option>
            <option value={TodoStatus.IN_PROGRESS}>В работе</option>
            <option value={TodoStatus.COMPLETED}>Завершено</option>
            <option value={TodoStatus.CANCELLED}>Отменено</option>
          </StatusSelect>
          <EditButton onClick={() => onEdit(todo)}>Редактировать</EditButton>
          <DeleteButton onClick={() => onDelete(todo.id)}>Удалить</DeleteButton>
        </TodoActions>
      </TodoContent>
    </TodoCardContainer>
  );
};
