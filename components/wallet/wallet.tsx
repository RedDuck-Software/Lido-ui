import {
  WalletCard,
  WalletCardBalance,
  WalletCardRow,
  WalletCardAccount,
} from 'components/walletCard';
import { Divider } from '@lidofinance/lido-ui';
import {
  TOKENS,
  useContractSWR,
  useEthereumBalance,
  useSDK,
  useSTETHBalance,
  useTokenAddress,
  useWSTETHBalance,
  useWSTETHContractRPC,
} from 'sdk';
import { useWeb3 } from '@reef-knot/web3-react';
import FormatToken from 'components/formatToken';
import FallbackWallet from 'components/fallbackWallet';
import TokenToWallet from 'components/tokenToWallet';
import { WalletComponent } from './types';
import { constants } from 'ethers';

const Wallet: WalletComponent = (props) => {
  const { account } = useSDK();
  const wstethRPC = useWSTETHContractRPC();
  const eth = useEthereumBalance();
  const steth = useSTETHBalance();
  const wsteth = useWSTETHBalance();

  const stethAddress = useTokenAddress(TOKENS.STETH);
  const wstethAddress = useTokenAddress(TOKENS.WSTETH);

  const stETHToWstETH = useContractSWR({
    contract: wstethRPC,
    method: 'getWstETHByStETH',
    params: [steth.data || constants.Zero],
  });
  const wstETHToStETH = useContractSWR({
    contract: wstethRPC,
    method: 'getStETHByWstETH',
    params: [wsteth.data || constants.Zero],
  });

  return (
    <WalletCard {...props}>
      <WalletCardRow>
        <WalletCardBalance
          title="PLS balance"
          loading={eth.initialLoading}
          value={<FormatToken amount={eth.data} symbol="PLS" />}
        />
        <WalletCardAccount account={account} />
      </WalletCardRow>
      <Divider />
      <WalletCardRow>
        <WalletCardBalance
          small
          title={props.onlyStETH ? 'Staked balance' : 'Token balance'}
          loading={steth.initialLoading || stETHToWstETH.initialLoading}
          value={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormatToken amount={steth.data} symbol="stPLS" />
                <TokenToWallet address={stethAddress} />
              </div>
              {!props.onlyStETH && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ fontWeight: 400, fontSize: '12px' }}>~</p>
                  <FormatToken
                    style={{ fontWeight: 400, fontSize: '12px' }}
                    amount={stETHToWstETH.data}
                    symbol="wstPLS"
                  />
                </div>
              )}
            </div>
          }
        />
        {!props.onlyStETH && (
          <WalletCardBalance
            small
            title="Token balance"
            loading={wsteth.initialLoading}
            value={
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FormatToken amount={wsteth.data} symbol="wstPLS" />
                  <TokenToWallet address={wstethAddress} />
                </div>
                {!props.onlyStETH && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ fontWeight: 400, fontSize: '12px' }}>~</p>
                    <FormatToken
                      style={{ fontWeight: 400, fontSize: '12px' }}
                      amount={wstETHToStETH.data}
                      symbol="stPLS"
                    />
                  </div>
                )}
              </div>
            }
          />
        )}
      </WalletCardRow>
    </WalletCard>
  );
};

const WalletWrapper: WalletComponent = (props) => {
  const { active } = useWeb3();
  return active ? <Wallet {...props} /> : <FallbackWallet {...props} />;
};

export default WalletWrapper;
