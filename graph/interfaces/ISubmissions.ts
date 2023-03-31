export interface ISubmissions {
  sender: string;
  amount: string;
  shares: string;
  sharesBefore: string;
  sharesAfter: string;
  totalPooledEtherBefore: string;
  totalPooledEtherAfter: string;
  totalSharesBefore: string;
  totalSharesAfter: string;
  balanceAfter: string;
  block: string;
  blockTime: string;
  transactionHash: string;
  transactionIndex: string;
  logIndex: string;
  transactionLogIndex: string;
}

export interface ISubmissionsResponse {
  lidoSubmissions: ISubmissions[];
}
