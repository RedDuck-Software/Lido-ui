import { H1 } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const LayoutTitleStyle = styled(H1)`
  font-weight: 800;
  font-size: ${({ theme }) => theme.fontSizesMap.xl}px;
  margin-bottom: 0.2em;
  line-height: 1.2em;
  text-align: center;

  &:empty {
    display: none;
  }
`;

export const LayoutSubTitleStyle = styled.h4`
  font-weight: 500;
  color: var(--lido-color-textSecondary);
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
  font-size: ${({ theme }) => theme.fontSizesMap.xxs}px;
  line-height: 1.5em;
  text-align: center;

  &:empty {
    display: none;
  }
`;

export const LayoutWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 1fr;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 100vw;
    overflow-x: hidden;
    grid-template-columns: 1fr;
  }
`;

export const LayoutInsertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: unset;
  }
`;
