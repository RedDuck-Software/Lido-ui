export enum CHAINS {
  Mainnet = 1,
  Goerli = 5,
  Pulsechain = 942,
}

export const CHAINS_IDS = [CHAINS.Goerli, CHAINS.Pulsechain];

export const CHAINS_COLORS: {
  [key in CHAINS]?: string;
} = {
  [CHAINS.Mainnet]: '#29b6af',
  [CHAINS.Goerli]: '#3099f2',
  [CHAINS.Pulsechain]: '#9064ff',
};

export const getChainColor = (chainId: CHAINS): string => {
  return CHAINS_COLORS[chainId] ?? '#29b6af';
};
