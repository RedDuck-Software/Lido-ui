import { WalletsModalProps } from '@reef-knot/connect-wallet-modal';

export type WalletsModalForEthProps = Omit<WalletsModalProps, 'children'> & {
  hiddenWallets?: string[];
};
