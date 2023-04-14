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
  LogoutIcon,
  SettingsIcon,
  StakeSideIcon,
  SwapIcon,
} from '../../ui/icons';
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints';
import { ISidebarProps } from './types';
import { useRouter } from 'next/router';
import { useDisconnect } from '../../sdk';

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

const Sidebar: FC<ISidebarProps> = ({ opened, setOpenedSidebar }) => {
  const { isMobile } = useMatchBreakpoints();
  const { pathname } = useRouter();
  const active = getActivePage(pathname);
  const { disconnect } = useDisconnect();

  return (
    <StyledSidebar opened={opened}>
      <SidebarInsetContainer>
        <SidebarLink
          active={active === 'Dashboard'}
          href={'/'}
          onClick={() => setOpenedSidebar(false)}
        >
          <DashboardIcon
            width={`${isMobile ? 20 : 24}px`}
            height={`${isMobile ? 20 : 24}px`}
          />
          Dashboard
        </SidebarLink>
        <SidebarLink
          active={active === 'Claim'}
          href="/claim"
          onClick={() => setOpenedSidebar(false)}
        >
          <ClaimIcon
            width={`${isMobile ? 20 : 24}px`}
            height={`${isMobile ? 20 : 24}px`}
          />
          Claim
        </SidebarLink>
        <SidebarLink
          active={active === 'Calculator'}
          href="/calculator"
          onClick={() => setOpenedSidebar(false)}
        >
          <CalculatorIcon
            width={`${isMobile ? 20 : 24}px`}
            height={`${isMobile ? 20 : 24}px`}
          />
          Calculator
        </SidebarLink>
        <SidebarLink
          active={active === 'Stake'}
          href="/stake"
          onClick={() => setOpenedSidebar(false)}
        >
          <SwapIcon
            width={`${isMobile ? 20 : 24}px`}
            height={`${isMobile ? 20 : 24}px`}
          />
          Stake
        </SidebarLink>
        {(active === 'Stake' || active === 'Wrap' || active === 'History') && (
          <SideBarSubMenu>
            <SideBarSubMenuItem
              active={active === 'Wrap'}
              href="/stake/wrap"
              onClick={() => setOpenedSidebar(false)}
            >
              <span>Wrap</span>
            </SideBarSubMenuItem>
            <SideBarSubMenuItem
              active={active === 'History'}
              href="/stake/rewards"
              onClick={() => setOpenedSidebar(false)}
            >
              <span>History</span>
            </SideBarSubMenuItem>
          </SideBarSubMenu>
        )}

        <SidebarLink
          active={active === 'Stablecoin'}
          href="/stablecoin"
          onClick={() => setOpenedSidebar(false)}
        >
          <StakeSideIcon
            width={`${isMobile ? 20 : 24}px`}
            height={`${isMobile ? 20 : 24}px`}
          />
          Stablecoin
        </SidebarLink>
        <SidebarLink
          active={active === 'Swap'}
          href="/swap"
          onClick={() => setOpenedSidebar(false)}
        >
          <SwapIcon
            width={`${isMobile ? 20 : 24}px`}
            height={`${isMobile ? 20 : 24}px`}
          />
          Swap
        </SidebarLink>
        <SidebarLink href="/" onClick={() => setOpenedSidebar(false)}>
          <DocIcon
            width={`${isMobile ? 20 : 24}px`}
            height={`${isMobile ? 20 : 24}px`}
          />
          Docs
        </SidebarLink>
      </SidebarInsetContainer>

      <SidebarInsetContainer>
        <SidebarLink href="/" onClick={() => setOpenedSidebar(false)}>
          <SettingsIcon
            width={`${isMobile ? 20 : 24}px`}
            height={`${isMobile ? 20 : 24}px`}
          />
          Settings
        </SidebarLink>
        <SidebarLink
          href=""
          onClick={() => {
            if (disconnect) disconnect();
            setOpenedSidebar(false);
          }}
        >
          <LogoutIcon
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
