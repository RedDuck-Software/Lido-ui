import { Chain } from 'wagmi';

export const pulsechain: Chain = {
  /** ID in number form */
  id: 942,
  /** Human-readable name */
  name: 'Pulsechain V3',
  /** Internal network name */
  network: 'PulseChain Testnet V3',
  /** Currency used by chain */
  nativeCurrency: {
    name: 'tPLS',
    symbol: 'tPLS',
    decimals: 18,
  },
  /** Collection of RPC endpoints */
  rpcUrls: {
    default: { http: ['https://rpc.v3.testnet.pulsechain.com'] },
    public: { http: ['https://rpc.v3.testnet.pulsechain.com'] },
  },
  /** Collection of block explorers */
  blockExplorers: {
    default: {
      name: 'PulseScan',
      url: 'https://scan.v3.testnet.pulsechain.com',
    },
  },
  // /** Collection of contracts */
  // contracts: {
  //   ensRegistry?: {
  //      address: "";
  //      blockCreated: number;
  //   }
  //   ensUniversalResolver?: Contract;
  //   multicall3?: Contract;
  // },
  /** Flag for test networks */
  testnet: true,
};
