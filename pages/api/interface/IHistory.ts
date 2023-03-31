export type ITypes = 'Rewards' | 'Transfer' | 'Staking';

export interface IHistory {
  date: string;
  type: ITypes;
  change: string;
  apr: string;
  balance: string;
}
