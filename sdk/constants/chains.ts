export enum CHAINS {
  Mainnet = 1,
  Goerli = 5,
  Sepolia = 11155111,
}

export const CHAINS_IDS = [CHAINS.Goerli, CHAINS.Sepolia];

export const CHAINS_COLORS: {
  [key in CHAINS]?: string;
} = {
  [CHAINS.Mainnet]: '#29b6af',
  [CHAINS.Goerli]: '#3099f2',
  [CHAINS.Sepolia]: '#9064ff',
};

export const getChainColor = (chainId: CHAINS): string => {
  return CHAINS_COLORS[chainId] ?? '#29b6af';
};
