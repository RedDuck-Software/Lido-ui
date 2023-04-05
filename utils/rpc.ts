import { goerli, mainnet } from 'wagmi/chains';
import { pulsechain } from '../config/chains';

export const rpc = {
  [mainnet.id]: `/rpc-stub?chainId=${mainnet.id}`,
  [goerli.id]: `/rpc-stub?chainId=${goerli.id}`,
  [pulsechain.id]: `/rpc-stub?chainId=${pulsechain.id}`,
};
