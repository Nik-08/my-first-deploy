import { useAuth } from '../../app/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const HeaderUser = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserEmail = styled.span`
  font-size: 14px;
  opacity: 0.9;
`;

const LogoutButton = styled.button`
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderTitle>TO-DO App</HeaderTitle>
        <HeaderUser>
          <UserEmail>{user?.email}</UserEmail>
          <LogoutButton onClick={handleLogout}>Выйти</LogoutButton>
        </HeaderUser>
      </HeaderContent>
    </HeaderContainer>
  );
};

