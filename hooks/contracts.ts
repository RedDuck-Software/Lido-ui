import { contractHooksFactory } from 'sdk';
import {
  WstethAbi__factory,
  StethAbi__factory,
  LdoAbi__factory,
} from 'generated';
import {
  getWstethAddress,
  getStethAddress,
  getLdoAddress,
} from '../config/addresses';

const wsteth = contractHooksFactory(WstethAbi__factory, (chainId) =>
  getWstethAddress(chainId),
);
const steth = contractHooksFactory(StethAbi__factory, (chainId) =>
  getStethAddress(chainId),
);
const ldo = contractHooksFactory(LdoAbi__factory, (chainId) =>
  getLdoAddress(chainId),
);
export const useWstethContractRPC = wsteth.useContractRPC;
export const useWstethContractWeb3 = wsteth.useContractWeb3;
export const useStethContractRPC = steth.useContractRPC;
export const useStethContractWeb3 = steth.useContractWeb3;
export const useLdoContractRPC = ldo.useContractRPC;
export const useLdoContractWeb3 = ldo.useContractWeb3;
