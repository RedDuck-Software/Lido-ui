import { FC } from 'react';
import { Text } from '@lidofinance/lido-ui';
import { HeaderStyle, HeaderActionsStyle } from './headerStyles';
import HeaderWallet from './headerWallet';
import { useRouter } from 'next/router';
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints';
import { IHeaderProps } from './types';
import { getActivePage } from '../Sidebar/Sidebar';

const Header: FC<IHeaderProps> = (props) => {
  const { isMobile } = useMatchBreakpoints();
  const routes = useRouter();

  const active = getActivePage(routes.pathname);

  return (
    <HeaderStyle size="full" forwardedAs="header">
      {!isMobile && (
        <Text size="lg" style={{ fontWeight: 700 }}>
          {active}
        </Text>
      )}
      <HeaderActionsStyle>
        <HeaderWallet {...props} />
      </HeaderActionsStyle>
    </HeaderStyle>
  );
};

export default Header;
