export interface IRewards {
  totalPooledEtherBefore: string;
  totalPooledEtherAfter: string;
  totalSharesBefore: string;
  totalSharesAfter: string;
  block: string;
  blockTime: string;
  logIndex: string;
}

export interface IRewardsResponse {
  totalRewards: IRewards[];
}
