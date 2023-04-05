import { CHAINS } from '../sdk/constants';

export const WSTETH_BY_NETWORK: {
  [key in CHAINS]: string;
} = {
  [CHAINS.Mainnet]: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
  [CHAINS.Pulsechain]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Goerli]: '0x6320cd32aa674d2898a68ec82e869385fc5f7e2f',
};

export const STETH_BY_NETWORK: {
  [key in CHAINS]: string;
} = {
  [CHAINS.Mainnet]: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  [CHAINS.Pulsechain]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Goerli]: '0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F',
};

export const LDO_BY_NETWORK: {
  [key in CHAINS]: string;
} = {
  [CHAINS.Mainnet]: '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32',
  [CHAINS.Pulsechain]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Goerli]: '0x56340274fB5a72af1A3C6609061c451De7961Bd4',
};

export const getWstethAddress = (chainId: CHAINS): string => {
  return WSTETH_BY_NETWORK[chainId];
};
export const getStethAddress = (chainId: CHAINS): string => {
  return STETH_BY_NETWORK[chainId];
};
export const getLdoAddress = (chainId: CHAINS): string => {
  return LDO_BY_NETWORK[chainId];
};
