import styled from 'styled-components';

export const BurgerWrapper = styled.div<{ active?: boolean }>`
  margin-left: 20px;
  width: 24px;
  height: ${({ active }) => (active ? 0 : 3)}px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.secondary};

  &:before {
    content: '';
    position: absolute;
    top: ${({ active }) => (active ? 0 : -7)}px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: rotate(${({ active }) => (active ? -45 : 0)}deg);
    transition: top 0.3s ease, transform 0.3s ease;
  }
  &:after {
    content: '';
    position: absolute;
    top: ${({ active }) => (active ? 0 : 'calc(100% + 4px)')};
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: rotate(${({ active }) => (active ? 45 : 0)}deg);
    transition: top 0.3s ease, transform 0.3s ease;
  }
`;
