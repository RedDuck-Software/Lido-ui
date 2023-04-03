import { CHAINS } from 'sdk';
import {
  wrapRequest,
  defaultErrorHandler,
  API,
} from '@lidofinance/next-api-wrapper';
import { serverLogger } from 'utils/serverLogger';
import { utils } from 'ethers';
import { rewardsHistory } from '../../graph/rewardHistory';
import { IHistory, ITypes } from './interface/IHistory';
// Date utilities
import { fromUnixTime, format } from 'date-fns';
import { BigNumber } from '@ethersproject/bignumber';

// Helpers to display data in easily readable form
export const weiToHumanReadable = (wei: string, digits?: number): string =>
  utils.formatUnits(
    BigNumber.from(wei).div(10 ** (18 - (digits || 8))),
    digits || 8,
  );
const dateToHumanReadable = (date: number) =>
  format(fromUnixTime(date), 'dd.MM.yyyy');

const rewards: API = async (req, res) => {
  serverLogger.debug('Fetch rewards');
  const address = String(req.query.address);
  const chainId = Number(req.query.chainId);

  if (!CHAINS[chainId]) {
    throw new Error(`Chain ${chainId} is not supported`);
  }
  if (!utils.isAddress(address)) {
    throw new Error(`Address ${address} invalid`);
  }

  const history = await rewardsHistory(address, chainId);

  const formattedHistory = history.map<IHistory>((rew) => {
    return {
      date: dateToHumanReadable(parseInt(rew.blockTime)),
      type: rew.type as ITypes,
      change: weiToHumanReadable(rew.change),
      apr: '10',
      balance: weiToHumanReadable(rew.balance),
    };
  });

  res.setHeader(
    'Content-Type',
    // requested.headers.get('Content-Type') ?? 'application/json',
    'application/json',
  );
  res.status(200).send(JSON.stringify(formattedHistory));
};

// Error handler wrapper
export default wrapRequest([
  defaultErrorHandler({ serverLogger: serverLogger }),
])(rewards);
