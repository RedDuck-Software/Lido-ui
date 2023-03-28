import React, { FC, useCallback } from 'react';
import { useConnectorCoinbase } from 'sdk/web3-react';
import { Coinbase } from '@reef-knot/wallets-icons/react';
import { ConnectWalletProps } from './types';
import { ConnectButton } from '../components';

const ConnectCoinbase: FC<ConnectWalletProps> = (props) => {
  const { onConnect, onBeforeConnect, metrics, ...rest } = props;
  const onClickCoinbase = metrics?.events?.click?.handlers.onClickCoinbase;
  const { connect } = useConnectorCoinbase();

  const handleConnect = useCallback(async () => {
    onBeforeConnect?.();
    onClickCoinbase?.();

    await connect();
  }, [connect, onBeforeConnect, onClickCoinbase]);

  return (
    <ConnectButton
      {...rest}
      iconSrcOrReactElement={<Coinbase />}
      onClick={handleConnect}
    >
      Coinbase
    </ConnectButton>
  );
};

export default ConnectCoinbase;
