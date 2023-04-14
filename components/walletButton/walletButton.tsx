import { FC } from 'react';
import { ButtonProps } from '@lidofinance/lido-ui';
import AddressBadge from 'components/addressBadge';
import {
  WalledButtonStyle,
  WalledButtonWrapperStyle,
  WalledButtonBalanceStyle,
  WalledButtonLoaderStyle,
} from './walletButtonStyles';
import { useModal } from 'hooks';
import { useEthereumBalance, useSDK } from 'sdk';
import FormatToken from 'components/formatToken';
import { MODAL } from 'providers';

const WalletButton: FC<ButtonProps> = (props) => {
  const { onClick, ...rest } = props;
  const { openModal } = useModal(MODAL.wallet);
  const { account } = useSDK();
  const { data: balance, initialLoading } = useEthereumBalance();

  return (
    <WalledButtonStyle
      size="sm"
      variant="text"
      color="secondary"
      onClick={openModal}
      {...rest}
    >
      <WalledButtonWrapperStyle>
        <WalledButtonBalanceStyle>
          {initialLoading ? (
            <WalledButtonLoaderStyle />
          ) : (
            <FormatToken amount={balance} symbol="PLS" />
          )}
        </WalledButtonBalanceStyle>
        <AddressBadge address={account} />
      </WalledButtonWrapperStyle>
    </WalledButtonStyle>
  );
};

export default WalletButton;
