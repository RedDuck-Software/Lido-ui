import { Gauge } from 'prom-client';
import { CHAINS } from 'sdk';
import { dynamics, METRICS_PREFIX } from 'config';
import {
  getLdoAddress,
  getStethAddress,
  getWstethAddress,
} from '../../config/addresses';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const chainId = +dynamics.defaultChain as CHAINS;

const contracts: Record<string, string> = {
  wsteth: getWstethAddress(chainId),
  steth: getStethAddress(chainId),
  ldo: getLdoAddress(chainId),
};

const contractNames = Object.keys(contracts);
const contractAddrs = contractNames.map((cName) => contracts[cName]);

export const contractInfo = new Gauge({
  name: METRICS_PREFIX + 'contract_info',
  help: `Contract configuration for default chain (${CHAINS[chainId]})`,
  labelNames: contractNames,
  registers: [],
});

contractInfo.labels(...contractAddrs).set(1);
