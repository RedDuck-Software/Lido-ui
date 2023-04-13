import styled from 'styled-components';
import Link from 'next/link';

export const StyledSidebar = styled.aside<{ opened?: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundDarken};
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 20px 50px 20px;
  box-sizing: border-box;
  transition: all 0.3s ease;

  ${({ theme }) => theme.mediaQueries.md} {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    max-height: 100vh;
    max-width: 220px;
    transform: translateX(${({ opened }) => (opened ? '0' : '-100%')});
    box-shadow: 0 0 ${({ opened }) => (opened ? 200 : 0)}px black;
    padding: 20px 10px;
  }
`;

export const SidebarInsetContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SidebarLink = styled(Link)<{ active?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: ${({ active }) =>
    active
      ? 'linear-gradient(\n    268.3deg,\n    #00fff9 -4.34%,\n    #00c5ff 13.53%,\n    #0078ff 93.71%\n  )'
      : 'transparent'};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.text} !important;
  font-size: 16px;
  font-weight: 500;
  font-family: Graphik, sans-serif;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
    background: ${({ active }) =>
      !active
        ? 'rgba(255, 255, 255, 0.1)'
        : 'linear-gradient(\n    268.3deg,\n    #00fff9 -4.34%,\n    #00c5ff 13.53%,\n    #0078ff 93.71%\n  )'};
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 13px;
    padding: 10px 18px;
    border-radius: 7px;
  }
`;

export const SideBarSubMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 80px;
  box-sizing: border-box;
  position: relative;
  transition: all 0.3s ease;
`;

export const SideBarSubMenuItem = styled(Link)<{ active?: boolean }>`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background: ${({ theme, active }) =>
    active
      ? '-webkit-linear-gradient(#00fff9, #00c5ff, #0078ff)'
      : theme.colors.text};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 16px;
  font-weight: 500;
  font-family: Graphik, sans-serif;
  text-decoration: none;
  transition: all 0.3s ease;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 13px;
  }

  &:hover {
    opacity: 0.8;
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: -20px;
    transform: translatey(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #00c5ff;
  }

  &:after {
    content: '';
    position: absolute;
    width: 2px;
    height: 115%;
    left: -18px;
    background: #00c5ff;
  }

  &:first-child {
    margin-bottom: 12px;
    &:after {
      top: 50%;
    }
  }
  &:last-child {
    margin-top: 12px;
    &:after {
      top: -50%;
    }
  }
`;
