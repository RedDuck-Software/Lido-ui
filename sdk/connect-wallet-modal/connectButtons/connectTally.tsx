import React, { FC, useCallback } from 'react';
import { useConnectorTally } from 'sdk/web3-react';
import { Tally } from '@reef-knot/wallets-icons/react';
import { ConnectWalletProps } from './types';
import { ConnectButton } from '../components';
import { isMobileOrTablet } from '../helpers';

const ConnectTally: FC<ConnectWalletProps> = (props: ConnectWalletProps) => {
  const {
    onConnect,
    onBeforeConnect,
    shouldInvertWalletIcon,
    setRequirements,
    metrics,
    ...rest
  } = props;
  const onClickTally = metrics?.events?.click?.handlers.onClickTally;
  const { connect } = useConnectorTally();

  const handleConnect = useCallback(async () => {
    onBeforeConnect?.();
    onClickTally?.();

    if (!connect || isMobileOrTablet) {
      setRequirements(true, {
        icon: <Tally />,
        title: "Tally Ho wallet couldn't connect",
        text: 'At the current moment, it is only available as extension for Chrome, Brave, and Firefox.',
      });
      return;
    }

    await connect();
  }, [connect, onBeforeConnect, onClickTally, setRequirements]);

  return (
    <ConnectButton
      {...rest}
      iconSrcOrReactElement={<Tally />}
      onClick={handleConnect}
    >
      Tally
    </ConnectButton>
  );
};

export default ConnectTally;
