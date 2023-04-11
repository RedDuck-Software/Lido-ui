import invariant from 'tiny-invariant';
import { CHAINS } from './chains';

export enum TOKENS {
  WSTETH = 'WSTETH',
  STETH = 'STETH',
  LDO = 'LDO',
}

export const TOKENS_BY_NETWORK: {
  [key in CHAINS]?: { [key in TOKENS]?: string };
} = {
  [CHAINS.Mainnet]: {
    [TOKENS.WSTETH]: '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
    [TOKENS.STETH]: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
    [TOKENS.LDO]: '0x5a98fcbea516cf06857215779fd812ca3bef1b32',
  },
  [CHAINS.Goerli]: {
    [TOKENS.WSTETH]: '0x6320cD32aA674d2898A68ec82e869385Fc5f7E2f',
    [TOKENS.STETH]: '0x1643e812ae58766192cf7d2cf9567df2c37e9b7f',
    [TOKENS.LDO]: '0xc3e39834c92c90463fab675a99def1bdd195fb04',
  },
  [CHAINS.Pulsechain]: {
    [TOKENS.WSTETH]: '0x05dC2003D9Ebc1C18d14ee527D86ED563DD7E681',
    [TOKENS.STETH]: '0x6722D8b336e932bbB0894eC59421B0db2e454dFE',
    [TOKENS.LDO]: '0x7d519b2E426711A6643bB6E81922d7CD3669d7b4',
  },
};

export const getTokenAddress = (chainId: CHAINS, token: TOKENS): string => {
  const tokens = TOKENS_BY_NETWORK[chainId];
  invariant(tokens != null, 'Chain is not supported');

  const address = tokens[token];
  invariant(address != null, 'Token is not supported');

  return address;
};
