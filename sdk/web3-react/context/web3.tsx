import React, { memo, FC, useEffect, useState } from 'react';
import invariant from 'tiny-invariant';
import {
  Web3Provider,
  ExternalProvider,
  JsonRpcFetchFunc,
} from '@ethersproject/providers';
import { CHAINS } from 'sdk/constants';
import { getStaticRpcBatchProvider } from 'sdk/providers';
import { ProviderSDK as ProviderSDKBase } from 'sdk/react';
import { Web3ReactProvider } from '@web3-react/core';
import { useAccount } from 'wagmi';
import { SWRConfiguration } from 'swr';
import { useWeb3 } from '../hooks/index';
import { POLLING_INTERVAL } from '../constants';
import ProviderConnectors, { ConnectorsContextProps } from './connectors';

export interface ProviderWeb3Props extends ConnectorsContextProps {
  defaultChainId: CHAINS;
  supportedChainIds: CHAINS[];
  swrConfig?: SWRConfiguration;
  pollingInterval?: number;
  onError?: (error: unknown) => void;
}

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

const ProviderSDK: FC<ProviderWeb3Props> = (props) => {
  const {
    rpc,
    defaultChainId,
    supportedChainIds,
    children,
    pollingInterval = POLLING_INTERVAL,
    ...rest
  } = props;
  const { chainId = defaultChainId, library, account } = useWeb3();
  const [providerWeb3, setProviderWeb3] = useState(library);

  // attempt to get providerWeb3 from wagmi
  const { connector: connectorWagmi, isConnected } = useAccount();
  useEffect(() => {
    (async () => {
      if (library) {
        setProviderWeb3(library);
      } else if (isConnected && !providerWeb3 && connectorWagmi) {
        const p = await connectorWagmi.getProvider();
        setProviderWeb3(getLibrary(p));
      }
    })();
  }, [connectorWagmi, isConnected, library, providerWeb3]);

  invariant(rpc[chainId], `RPC url for chain ${chainId} is not provided`);
  invariant(rpc[CHAINS.Mainnet], 'RPC url for mainnet is not provided');

  const providerRpc = getStaticRpcBatchProvider(
    chainId,
    rpc[chainId],
    0,
    pollingInterval,
  );

  const providerMainnetRpc = getStaticRpcBatchProvider(
    CHAINS.Mainnet,
    rpc[CHAINS.Mainnet],
    0,
    pollingInterval,
  );

  return (
    <ProviderSDKBase
      chainId={chainId}
      supportedChainIds={supportedChainIds}
      providerWeb3={providerWeb3}
      providerRpc={providerRpc}
      providerMainnetRpc={providerMainnetRpc}
      account={account ?? undefined}
      {...rest}
    >
      {children}
    </ProviderSDKBase>
  );
};

const ProviderWeb3: FC<ProviderWeb3Props> = (props) => {
  const { children, rpc, appName, appLogoUrl, ...sdkProps } = props;
  const { defaultChainId } = props;
  const connectorsProps = { rpc, appName, appLogoUrl, defaultChainId };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ProviderSDK rpc={rpc} {...sdkProps}>
        <ProviderConnectors {...connectorsProps}>{children}</ProviderConnectors>
      </ProviderSDK>
    </Web3ReactProvider>
  );
};

export default memo<FC<ProviderWeb3Props>>(ProviderWeb3);
