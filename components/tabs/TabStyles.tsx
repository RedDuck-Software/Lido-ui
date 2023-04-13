// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import styled from 'styled-components';

interface TabProps {
  onClick: () => void;
  isSelected: boolean;
}
export const TabWrapper = styled.div`
  width: 186px;
  height: 44px;
  background-color: ${({ theme }) => theme.colors.backgroundDarken};
  border-radius: 22px;
  position: relative;
  display: flex;
  justify-content: space-around;
  -webkit-box-align: center;
  align-items: center;
  user-select: none;
  margin: 0px auto 15px auto;
`;

export const TabSlider = styled.div<{ selectedOption: number }>`
  width: 93px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 20px;
  position: absolute;
  transition: left 0.3s ease 0s;
  top: 2px;
  z-index: 1;
  left: ${({ selectedOption }) => {
    return selectedOption <= 0 ? `2px` : `${selectedOption * 90}px`;
  }};
`;

export const TabLabel = styled.p<TabProps>`
  z-index: 2;
  margin: 0;
  width: 25%;
  text-align: center;
  opacity: ${(props) => (!props.isSelected ? `0.5` : `1`)};
  transition: opacity 0.3s ease 0s;
  line-height: 1.6em;
  font-size: 10px;
  font-family: Manrope;
  letter-spacing: 0.3px;
  font-weight: 800;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
`;
