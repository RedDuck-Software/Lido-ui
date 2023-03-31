import { FC, useMemo } from 'react';
import Link from 'next/link';
import { LidoLogo, MainMenu, Stake, Wrap, Wallet } from '@lidofinance/lido-ui';
import {
  HeaderStyle,
  HeaderLogoStyle,
  HeaderActionsStyle,
} from './headerStyles';
import HeaderWallet from './headerWallet';
import MainMenuItem from 'components/mainMenu/MainMenuItem';
import { useRouter } from 'next/router';

const Header: FC = () => {
  const routes = useRouter();

  const active = useMemo<'stake' | 'wrap' | 'rewards'>(() => {
    return routes.pathname === '/'
      ? 'stake'
      : routes.pathname === '/wrap'
      ? 'wrap'
      : 'rewards';
  }, [routes.pathname]);

  return (
    <HeaderStyle size="full" forwardedAs="header">
      <HeaderLogoStyle>
        <Link href="/">
          <LidoLogo />
        </Link>
      </HeaderLogoStyle>
      <MainMenu>
        <MainMenuItem
          active={active === 'stake'}
          icon={<Stake />}
          onClick={() => routes.push('/')}
        >
          Stake
        </MainMenuItem>
        <MainMenuItem
          active={active === 'wrap'}
          icon={<Wrap />}
          onClick={() => routes.push('/wrap')}
        >
          Wrap
        </MainMenuItem>
        <MainMenuItem
          active={active === 'rewards'}
          icon={<Wallet />}
          onClick={() => routes.push('/rewards')}
        >
          Rewards
        </MainMenuItem>
      </MainMenu>
      <HeaderActionsStyle>
        <HeaderWallet />
      </HeaderActionsStyle>
    </HeaderStyle>
  );
};

export default Header;
