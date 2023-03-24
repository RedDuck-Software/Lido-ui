import invariant from 'tiny-invariant';
import { BaseContract } from '@ethersproject/contracts';
import { useLidoSWR, SWRResponse } from './useLidoSWR';
import { FilterAsyncMethods, UnpackedPromise } from './types';
import { SWRConfiguration } from 'swr';

export const useContractSWR = <
  C extends BaseContract,
  M extends FilterAsyncMethods<C>,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  R extends UnpackedPromise<ReturnType<C[M]>>,
  F extends boolean,
>(props: {
  contract: C;
  method: M;
  shouldFetch?: F;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  params?: F extends false ? unknown[] : Parameters<C[M]>;
  config?: SWRConfiguration<R, Error>;
}): SWRResponse<R, Error> => {
  const { shouldFetch = true, params = [], contract, method, config } = props;

  invariant(contract != null, 'Contract is required');
  invariant(method != null, 'Method is required');

  return useLidoSWR<R, Error>(
    shouldFetch ? [contract, method, ...params] : null,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (contract: C, method: M, ...params: Parameters<C[M]>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return contract[method](...params);
    },
    config,
  );
};
