import styled from 'styled-components';
import { TodoStatus } from '../model/types';

interface StatusBadgeProps {
  status: TodoStatus;
}

const StatusBadgeStyled = styled.span<{ status: TodoStatus }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${(props) => {
    switch (props.status) {
      case TodoStatus.PENDING:
        return '#fff3cd';
      case TodoStatus.IN_PROGRESS:
        return '#cfe2ff';
      case TodoStatus.COMPLETED:
        return '#d1e7dd';
      case TodoStatus.CANCELLED:
        return '#f8d7da';
      default:
        return '#e0e0e0';
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case TodoStatus.PENDING:
        return '#856404';
      case TodoStatus.IN_PROGRESS:
        return '#084298';
      case TodoStatus.COMPLETED:
        return '#0f5132';
      case TodoStatus.CANCELLED:
        return '#842029';
      default:
        return '#333';
    }
  }};
`;

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusLabel = (status: TodoStatus) => {
    switch (status) {
      case TodoStatus.PENDING:
        return 'Ожидает';
      case TodoStatus.IN_PROGRESS:
        return 'В работе';
      case TodoStatus.COMPLETED:
        return 'Завершено';
      case TodoStatus.CANCELLED:
        return 'Отменено';
      default:
        return status;
    }
  };

  return (
    <StatusBadgeStyled status={status}>
      {getStatusLabel(status)}
    </StatusBadgeStyled>
  );
};
