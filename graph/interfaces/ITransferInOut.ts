export interface ITransferInOut {
  from: string;
  to: string;
  value: string;
  shares: string | null;
  sharesBeforeDecrease: string | null;
  sharesAfterDecrease: string | null;
  sharesBeforeIncrease: string | null;
  sharesAfterIncrease: string | null;
  totalPooledEther: string;
  totalShares: string;
  balanceAfterDecrease: string | null;
  balanceAfterIncrease: string | null;
  mintWithoutSubmission: boolean;
  block: string;
  blockTime: string;
  transactionHash: string;
  transactionIndex: string;
  logIndex: string;
  transactionLogIndex: string;
}

export interface ITransfersInOutResponse {
  lidoTransfers: ITransferInOut[];
}
