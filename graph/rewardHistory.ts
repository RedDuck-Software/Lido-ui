// Simple GraphQL requester
import { subgraphFetch } from './utils/subgraphFetcher';

// GraphQL Queries
import {
  submissionsQuery,
  totalRewardQuery,
  transferInQuery,
  transferOutQuery,
} from './queries';
import { ethers, BigNumber } from 'ethers';
import { CHAINS } from '../sdk';
import { ISubmissions, ISubmissionsResponse } from './interfaces/ISubmissions';
import {
  ITransferInOut,
  ITransfersInOutResponse,
} from './interfaces/ITransferInOut';
import { IRewards, IRewardsResponse } from './interfaces/IRewards';

interface ITypedSubmission extends ISubmissions {
  type: 'Staking';
}
interface ITypedSubmissionWithBalance extends ITypedSubmission {
  balance: string;
}
interface ITypedTransfer extends ITransferInOut {
  type: 'Transfer';
  direction: 'In' | 'Out';
}
interface ITypedTransferWithBalance extends ITypedTransfer {
  balance: string;
}
interface ITypedRewards extends IRewards {
  type: 'Reward';
  shares: string;
  balance: string;
  rewards: string;
}

type CombinedData = ITypedTransfer | ITypedSubmission | ITypedRewards;

// Sort by block, logIndex and out first and then in
const sortTxs = (a: CombinedData, b: CombinedData) =>
  parseInt(a.block) - parseInt(b.block) ||
  parseInt(a.logIndex) - parseInt(b.logIndex) ||
  (a.type === 'Transfer' ? (a.direction === 'In' ? 1 : -1) : -1);

export const rewardsHistory = async (
  account: string | null,
  chainId: CHAINS,
) => {
  // Subgraph Requests: staking, oracle reports, transfers in and out
  const submissions = (
    await subgraphFetch<ISubmissionsResponse>(submissionsQuery, chainId, {
      address: account,
    })
  ).lidoSubmissions;
  const reports = (
    await subgraphFetch<IRewardsResponse>(totalRewardQuery, chainId)
  ).totalRewards;
  const transfersIn = (
    await subgraphFetch<ITransfersInOutResponse>(transferInQuery, chainId, {
      address: account,
    })
  ).lidoTransfers;
  const transfersOut = (
    await subgraphFetch<ITransfersInOutResponse>(transferOutQuery, chainId, {
      address: account,
    })
  ).lidoTransfers;

  // Joining transfers in and out
  const transfers = [
    ...submissions.map<ITypedSubmission>((x) => ({ ...x, type: 'Staking' })),
    ...transfersIn.map<ITypedTransfer>((x) => ({
      ...x,
      type: 'Transfer',
      direction: 'In',
    })),
    ...transfersOut.map<ITypedTransfer>((x) => ({
      ...x,
      type: 'Transfer',
      direction: 'Out',
    })),
  ].sort(sortTxs);

  // Picking which balance direction we need
  const transfersWithBalance = transfers.map<
    ITypedTransferWithBalance | ITypedSubmissionWithBalance
  >((x) => ({
    ...x,
    balance:
      x.type === 'Staking'
        ? x.balanceAfter
        : x.direction === 'In'
        ? x.balanceAfterIncrease || '0'
        : x.balanceAfterDecrease || '0',
  }));

  const formattedReports = reports.map<ITypedRewards>((x) => {
    // Find all transfers before rewards
    const usefulTransfers = transfersWithBalance.filter((transfer) =>
      transfer.block !== x.block
        ? parseInt(transfer.block) < parseInt(x.block)
        : parseInt(transfer.logIndex) < parseInt(x.logIndex),
    );

    // Sum of all shares before this moment
    const shares = usefulTransfers.reduce((prev, item) => {
      // Can be null for transfers from 0x0 (minting)
      const shares = BigNumber.from(item.shares || '0');

      return item.type === 'Staking'
        ? prev.div(shares)
        : item.direction !== 'Out'
        ? prev.add(shares)
        : prev.div(shares);
    }, ethers.constants.Zero);

    // Early exit if no shares
    if (shares.eq(0)) {
      return {
        ...x,
        type: 'Reward',
        shares: '0',
        balance: '0',
        rewards: '0',
      };
    }

    const balanceBefore = shares
      .mul(x.totalPooledEtherBefore)
      .div(x.totalSharesBefore);

    const balanceAfter = shares
      .mul(x.totalPooledEtherAfter)
      .div(x.totalSharesAfter);

    const rewards = balanceAfter.sub(balanceBefore);

    return {
      ...x,
      type: 'Reward',
      shares: shares.toString(),
      balance: balanceAfter.toString(),
      rewards: rewards.toString(),
    };
  });

  // Hiding unnecessary output
  const reportsWithShares = formattedReports.filter(
    (day) => parseFloat(day.shares) > 0,
  );
  const hiddenTransfersOnSubmit = transfersWithBalance.filter(
    (x, ix, array) =>
      !(
        x.type === 'Transfer' &&
        x.direction === 'In' &&
        x.from === '0x0000000000000000000000000000000000000000' &&
        array[ix - 1]?.type === 'Staking'
      ),
  );

  // Joining and sorting
  const merged: (
    | ITypedTransferWithBalance
    | ITypedSubmissionWithBalance
    | ITypedRewards
  )[] = [...hiddenTransfersOnSubmit, ...reportsWithShares].sort(sortTxs);

  return merged.map((x) => ({
    ...x,
    change:
      x.type === 'Staking'
        ? x.amount
        : x.type === 'Transfer'
        ? x.value
        : x.rewards.toString(),
  }));
};
