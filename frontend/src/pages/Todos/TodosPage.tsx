import { useState, useEffect } from 'react';
import type {
  Todo,
  CreateTodoDto,
  UpdateTodoDto,
} from '../../entities/todo/model/types';
import type { TodoStatus } from '../../entities/todo/model/types';
import { todoApi } from '../../entities/todo/api/todoApi';
import { TodoCard } from '../../entities/todo/ui/TodoCard';
import { TodoForm } from '../../widgets/TodoForm/TodoForm';
import { Header } from '../../widgets/Header/Header';
import styled from 'styled-components';

const TodosPageContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
`;

const TodosContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const TodosHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const TodosTitle = styled.h2`
  margin: 0;
  color: #333;
  font-size: 32px;
`;

const CreateButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #fcc;
  cursor: pointer;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const EmptyStateText = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
`;

const TodosList = styled.div`
  display: grid;
  gap: 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 18px;
  color: #666;
`;

export const TodosPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка загрузки задач');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (data: CreateTodoDto | UpdateTodoDto) => {
    try {
      await todoApi.create(data as CreateTodoDto);
      await loadTodos();
      setShowForm(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка создания задачи');
    }
  };

  const handleUpdate = async (data: CreateTodoDto | UpdateTodoDto) => {
    if (!editingTodo) return;
    try {
      await todoApi.update(editingTodo.id, data as UpdateTodoDto);
      await loadTodos();
      setEditingTodo(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка обновления задачи');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту задачу?')) return;
    try {
      await todoApi.delete(id);
      await loadTodos();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка удаления задачи');
    }
  };

  const handleStatusChange = async (id: string, status: TodoStatus) => {
    try {
      await todoApi.updateStatus(id, status);
      await loadTodos();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка изменения статуса');
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTodo(null);
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <LoadingContainer>
          <div>Загрузка...</div>
        </LoadingContainer>
      </div>
    );
  }

  return (
    <TodosPageContainer>
      <Header />
      <TodosContainer>
        <TodosHeader>
          <TodosTitle>Мои задачи</TodosTitle>
          <CreateButton onClick={() => setShowForm(true)}>
            + Создать задачу
          </CreateButton>
        </TodosHeader>

        {error && (
          <ErrorMessage onClick={() => setError('')}>
            {error} (нажмите, чтобы закрыть)
          </ErrorMessage>
        )}

        {todos.length === 0 ? (
          <EmptyState>
            <EmptyStateText>У вас пока нет задач</EmptyStateText>
            <CreateButton onClick={() => setShowForm(true)}>
              Создать первую задачу
            </CreateButton>
          </EmptyState>
        ) : (
          <TodosList>
            {todos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </TodosList>
        )}

        {(showForm || editingTodo) && (
          <TodoForm
            todo={editingTodo}
            onSubmit={editingTodo ? handleUpdate : handleCreate}
            onCancel={handleCancelForm}
          />
        )}
      </TodosContainer>
    </TodosPageContainer>
  );
};
