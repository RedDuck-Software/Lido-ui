import styled, { css } from 'styled-components';

export const TermsStyle = styled.label`
  ${({ theme: { fontSizesMap, spaceMap, borderRadiusesMap, colors } }) => css`
    display: flex;
    align-items: center;
    font-size: ${fontSizesMap.xxs}px;
    line-height: 1.6em;
    padding: ${spaceMap.lg}px;
    margin-top: ${spaceMap.sm}px;
    margin-bottom: ${spaceMap.md}px;
    border-radius: ${borderRadiusesMap.lg}px;
    background: ${colors.foreground};
    cursor: pointer;
  `}
`;

export const TermsTextStyle = styled.span`
  margin-left: ${({ theme }) => theme.spaceMap.lg}px;
  text-align: left;
`;
