import { FC, PropsWithChildren } from 'react';
import { CHAINS, ProviderWeb3 } from 'sdk';
import { backendRPC } from 'config';
import dynamics from '../config/dynamics';

export type EnvConfig = {
  defaultChain: string;
  supportedChains: string;
};

const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ProviderWeb3
      defaultChainId={dynamics.defaultChain as CHAINS}
      supportedChainIds={dynamics.supportedChains as CHAINS[]}
      rpc={backendRPC}
    >
      {children}
    </ProviderWeb3>
  );
};

export default Web3Provider;
