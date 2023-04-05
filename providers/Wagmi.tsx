import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { ReactNode } from 'react';
import { mainnet, goerli } from 'wagmi/chains';
import { createConnectors } from '@reef-knot/core-react';
import { rpc } from '../utils/rpc';
import { pulsechain } from '../config/chains';

const { provider, webSocketProvider } = configureChains(
  [mainnet, goerli, pulsechain],
  [publicProvider()],
);
const connectors = createConnectors({
  rpc,
});

const client = createClient({
  connectors,
  autoConnect: true,
  provider,
  webSocketProvider,
});

const Wagmi = (props: { children: ReactNode }) => {
  const { children } = props;

  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};

export default Wagmi;
