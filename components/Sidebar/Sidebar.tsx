import React, { FC } from 'react';
import {
  SidebarInsetContainer,
  SidebarLink,
  SideBarSubMenu,
  SideBarSubMenuItem,
  StyledSidebar,
} from './styles';
import {
  CalculatorIcon,
  ClaimIcon,
  DashboardIcon,
  DocIcon,
  StakeSideIcon,
  SwapIcon,
} from '../../ui/icons';
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints';
import { ISidebarProps } from './types';
import { useRouter } from 'next/router';

export type IPageName =
  | 'Dashboard'
  | 'Claim'
  | 'Calculator'
  | 'Stake'
  | 'Wrap'
  | 'History'
  | 'Stablecoin'
  | 'Swap';

export const getActivePage = (path: string): IPageName => {
  switch (path) {
    case '/':
      return 'Dashboard';
    case '/claim':
      return 'Claim';
    case '/calculator':
      return 'Calculator';
    case '/stake':
      return 'Stake';
    case '/stake/wrap':
      return 'Wrap';
    case '/stake/rewards':
      return 'History';
    case '/swap':
      return 'Swap';
    case '/stablecoin':
      return 'Stablecoin';
    default:
      return 'Dashboard';
  }
};

const Sidebar: FC<ISidebarProps> = ({ opened }) => {
  const { isMobile } = useMatchBreakpoints();
  const { pathname } = useRouter();
  const active = getActivePage(pathname);

  return (
    <StyledSidebar opened={opened}>
      <SidebarInsetContainer>
        <SidebarLink active={active === 'Dashboard'} href={'/'}>
          <DashboardIcon
            width={`${isMobile ? 20 : 24}px`}
            height={`${isMobile ? 20 : 24}px`}
          />
          Dashboard
        </SidebarLink>
        <SidebarLink active={active === 'Claim'} href="/claim">
          <ClaimIcon
            width={`${isMobile ? 20 : 24}px`}
            height={`${isMobile ? 20 : 24}px`}
          />
          Claim
        </SidebarLink>
        <SidebarLink active={active === 'Calculator'} href="/calculator">
          <CalculatorIcon
            width={`${isMobile ? 20 : 24}px`}
            height={`${isMobile ? 20 : 24}px`}
          />
          Calculator
        </SidebarLink>
        <SidebarLink active={active === 'Stake'} href="/stake">
          <SwapIcon
            width={`${isMobile ? 20 : 24}px`}
            height={`${isMobile ? 20 : 24}px`}
          />
          Stake
        </SidebarLink>
        {(active === 'Stake' || active === 'Wrap' || active === 'History') && (
          <SideBarSubMenu>
            <SideBarSubMenuItem active={active === 'Wrap'} href="/stake/wrap">
              <span>Wrap</span>
            </SideBarSubMenuItem>
            <SideBarSubMenuItem
              active={active === 'History'}
              href="/stake/rewards"
            >
              <span>History</span>
            </SideBarSubMenuItem>
          </SideBarSubMenu>
        )}

        <SidebarLink active={active === 'Stablecoin'} href="/stablecoin">
          <StakeSideIcon
            width={`${isMobile ? 20 : 24}px`}
            height={`${isMobile ? 20 : 24}px`}
          />
          Stablecoin
        </SidebarLink>
        <SidebarLink active={active === 'Swap'} href="/swap">
          <SwapIcon
            width={`${isMobile ? 20 : 24}px`}
            height={`${isMobile ? 20 : 24}px`}
          />
          Swap
        </SidebarLink>
        <SidebarLink href="/">
          <DocIcon
            width={`${isMobile ? 20 : 24}px`}
            height={`${isMobile ? 20 : 24}px`}
          />
          Docs
        </SidebarLink>
      </SidebarInsetContainer>

      <SidebarInsetContainer>
        <SidebarLink href="/">
          <DocIcon
            width={`${isMobile ? 20 : 24}px`}
            height={`${isMobile ? 20 : 24}px`}
          />
          Settings
        </SidebarLink>
        <SidebarLink href="/">
          <DocIcon
            width={`${isMobile ? 20 : 24}px`}
            height={`${isMobile ? 20 : 24}px`}
          />
          Log out
        </SidebarLink>
      </SidebarInsetContainer>
    </StyledSidebar>
  );
};

export default Sidebar;
