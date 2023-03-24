import { FC } from 'react';
import { useSDK, CHAINS, getChainColor } from 'sdk';
import { useWeb3 } from '@reef-knot/web3-react';
import { ThemeToggler } from '@lidofinance/lido-ui';

import WalletButton from 'components/walletButton';
import WalletConnect from 'components/walletConnect';

import { HeaderWalletChainStyle } from './headerWalletStyles';

const HeaderWallet: FC = () => {
  const { active } = useWeb3();
  const { chainId } = useSDK();

  const chainName = CHAINS[chainId];
  const testNet = chainId !== CHAINS.Mainnet;
  const showNet = testNet && active;

  return (
    <>
      {showNet && (
        <HeaderWalletChainStyle $color={getChainColor(chainId)}>
          {chainName}
        </HeaderWalletChainStyle>
      )}
      {active ? <WalletButton /> : <WalletConnect size="sm" />}
      <ThemeToggler />
    </>
  );
};

export default HeaderWallet;
