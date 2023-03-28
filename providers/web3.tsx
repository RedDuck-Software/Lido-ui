import { FC, PropsWithChildren } from 'react';
import { CHAINS, ProviderWeb3 } from 'sdk';
import { backendRPC } from 'config';
import dynamics from '../config/dynamics';
import Wagmi from './Wagmi';

export type EnvConfig = {
  defaultChain: string;
  supportedChains: string;
};

const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wagmi>
      <ProviderWeb3
        defaultChainId={dynamics.defaultChain as CHAINS}
        supportedChainIds={dynamics.supportedChains as CHAINS[]}
        rpc={backendRPC}
      >
        {children}
      </ProviderWeb3>
    </Wagmi>
  );
};

export default Web3Provider;
