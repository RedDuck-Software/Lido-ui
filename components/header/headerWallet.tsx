import { FC, useEffect, useState } from 'react';
import { useSDK, CHAINS, getChainColor } from 'sdk';
import { useWeb3 } from '@reef-knot/web3-react';

import WalletButton from 'components/walletButton';
import WalletConnect from 'components/walletConnect';

import { HeaderWalletChainStyle } from './headerWalletStyles';
import { IHeaderProps } from './types';
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints';
import { BurgerWrapper } from '../Burger';

const HeaderWallet: FC<IHeaderProps> = ({ setOpenedSidebar }) => {
  const { active } = useWeb3();
  const { chainId } = useSDK();
  const { isMobile } = useMatchBreakpoints();

  const chainName = CHAINS[chainId];
  const testNet = chainId !== CHAINS.Mainnet;
  const showNet = testNet && active;
  const [activeBurger, setActiveBurger] = useState<boolean>(false);

  useEffect(() => {
    if (activeBurger) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = 'unset';
  }, [activeBurger]);

  return (
    <>
      {showNet && (
        <HeaderWalletChainStyle $color={getChainColor(chainId)}>
          {chainName}
        </HeaderWalletChainStyle>
      )}
      {active ? <WalletButton /> : <WalletConnect size="sm" />}
      {isMobile && (
        <BurgerWrapper
          onClick={() =>
            setOpenedSidebar((prev) => {
              const newState = !prev;
              setActiveBurger(newState);
              return newState;
            })
          }
          active={activeBurger}
        />
      )}
    </>
  );
};

export default HeaderWallet;
