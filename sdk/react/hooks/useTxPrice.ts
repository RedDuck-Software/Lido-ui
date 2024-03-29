import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { WeiPerEther } from '@ethersproject/constants';
import { divide } from '../../helpers';
import { useCallback, useMemo } from 'react';
import { useEthereumSWR } from './useEthereumSWR';
import { useEthPrice } from './useEthPrice';
import { SWRResponse } from './useLidoSWR';
import { useSDK } from './useSDK';
import { useAsyncFetch } from './useAsyncFetch';
import { constants } from 'ethers';

const getTxPrice = (
  gasLimit: BigNumberish,
  ethPrice?: number,
  gasPrice?: BigNumber,
) => {
  if (!gasLimit || ethPrice == null || gasPrice == null) {
    return undefined;
  }

  const txCostInWei = gasPrice.mul(BigNumber.from(gasLimit));
  const txCostInEth = divide(txCostInWei, WeiPerEther);

  return ethPrice * txCostInEth;
};

export const useTxPrice = (
  gasLimit?: BigNumberish,
): Omit<SWRResponse<number>, 'mutate'> => {
  const { providerRpc } = useSDK();

  const {
    data: gasLimitInternal,
    loading: limitLoading,
    error: limitError,
  } = useAsyncFetch<BigNumberish>(async () => {
    if (gasLimit) return gasLimit;

    return await providerRpc
      .getBlock('latest')
      .then((result) => result.gasLimit);
  }, [gasLimit]);

  const eth = useEthPrice();
  const gas = useEthereumSWR({ method: 'getGasPrice' });

  const ethPrice = eth.data;
  const gasPrice = gas.data;

  const data = useMemo(() => {
    return getTxPrice(gasLimitInternal ?? constants.Zero, ethPrice, gasPrice);
  }, [gasLimitInternal, ethPrice, gasPrice]);

  const updateEth = eth.update;
  const updateGas = gas.update;

  const update = useCallback(async () => {
    const [ethPrice, gasPrice] = await Promise.all([updateEth(), updateGas()]);
    return getTxPrice(gasLimitInternal ?? constants.Zero, ethPrice, gasPrice);
  }, [gasLimitInternal, updateEth, updateGas]);

  return {
    update,
    data,

    /*
     * support dependency collection
     * https://swr.vercel.app/advanced/performance#dependency-collection
     */

    get loading() {
      return eth.loading || gas.loading || limitLoading;
    },
    get initialLoading() {
      return eth.initialLoading || gas.initialLoading;
    },
    get error() {
      return eth.error || gas.error || limitError;
    },
  };
};
