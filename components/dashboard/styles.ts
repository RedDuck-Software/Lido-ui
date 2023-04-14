import styled from 'styled-components';

export const DashboardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
export const DashboardTablesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 2fr;
  gap: 30px;
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    flex-direction: column;
  }
`;
export const DashboardContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.foreground};
  border-radius: 14px;
`;
export const DashboardStatsContainer = styled.div`
  width: 100%;
  padding: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 40px;
  box-sizing: border-box;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 18px;
    gap: 18px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
`;

export const DashboardRebaseContainer = styled.div`
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-sizing: border-box;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 18px;
    gap: 18px;
  }
`;

export const DashboardRebaseStatContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  gap: 40px;
  box-sizing: border-box;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 18px;
    gap: 18px;
  }
`;

export const DashboardGraphContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 180px;
  }
`;

export const DashboardTableContainer = styled.div`
  padding: 40px;
  box-sizing: border-box;
  max-width: 100%;
  overflow-x: scroll;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 18px;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const DashboardLabel = styled.div<{ lg?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  font-family: Graphik, sans-serif;

  div {
    display: flex;
    align-items: center;
    gap: 8px;
    ${({ theme }) => theme.mediaQueries.md} {
      gap: 3px;
    }

    div {
      position: relative;
      width: 24px;
      height: 24px;
      ${({ theme }) => theme.mediaQueries.md} {
        width: 18px;
        height: 18px;
      }
    }
    p {
      color: ${({ theme }) => theme.colors.text};
      font-size: ${({ lg }) => (lg ? 18 : 15)}px;
      line-height: ${({ lg }) => (lg ? 21 : 18)}px;
      font-weight: 500;
      letter-spacing: -0.02em;
      opacity: 0.6;
      ${({ theme }) => theme.mediaQueries.md} {
        font-size: ${({ lg }) => (lg ? 15 : 11)}px;
        line-height: ${({ lg }) => (lg ? 19 : 14)}px;
      }
    }
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ lg }) => (lg ? 28 : 20)}px;
    line-height: ${({ lg }) => (lg ? 36 : 25)}px;
    font-weight: 500;
    opacity: 0.8;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: ${({ lg }) => (lg ? 18 : 14)}px;
      line-height: ${({ lg }) => (lg ? 22 : 17)}px;
    }
  }
`;
