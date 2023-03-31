// export const ADDRESS = process.env.ADDRESS;
import { CHAINS } from '../sdk';

export const GRAPH_URL_BY_NETWORK: {
  [key in CHAINS]: string;
} = {
  [CHAINS.Mainnet]: 'https://api.thegraph.com/subgraphs/name/lidofinance/lido',
  [CHAINS.Sepolia]: '',
  [CHAINS.Goerli]:
    'https://api.thegraph.com/subgraphs/name/lidofinance/lido-testnet',
};
export const getGraphUrl = (chainId: CHAINS): string => {
  return GRAPH_URL_BY_NETWORK[chainId];
};

export const RPC_BY_NETWORK: {
  [key in CHAINS]: string;
} = {
  [CHAINS.Mainnet]: process.env[`API_PROVIDER_URL_${CHAINS.Mainnet}`] ?? '',
  [CHAINS.Goerli]: process.env[`API_PROVIDER_URL_${CHAINS.Goerli}`] ?? '',
  [CHAINS.Sepolia]: process.env[`API_PROVIDER_URL_${CHAINS.Sepolia}`] ?? '',
};
export const getRPC = (chainId: CHAINS): string => {
  return RPC_BY_NETWORK[chainId];
};
