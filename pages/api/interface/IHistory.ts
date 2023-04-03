export type ITypes = 'Reward' | 'Transfer' | 'Staking';

export interface IHistory {
  date: string;
  type: ITypes;
  change: string;
  apr: string;
  balance: string;
}
