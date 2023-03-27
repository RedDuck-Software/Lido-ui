import { CHAINS, getEtherscanTxLink } from '../sdk';

export type StatusProps = {
  step: string;
  amount?: string;
  reason?: string;
  transactionHash?: string;
  retry?: boolean;
  chainId: CHAINS;
  setStatus: (status: IStatus) => void;
};

export interface IStatus {
  title: string;
  subtitle: string;
  additionalDetails: string;
  link: string;
  type: string;
  show: boolean;
  retry: boolean;
}

export const setStatusData = ({
  amount,
  step,
  transactionHash,
  retry,
  reason,
  chainId,
  setStatus,
}: StatusProps) => {
  switch (step) {
    case 'approve-confirm':
      setStatus({
        title: `You are now approving.`,
        subtitle: `You will approve your tokens. `,
        additionalDetails: 'Confirm this transaction in your wallet',
        type: 'loading',
        link: '',
        show: true,
        retry: false,
      });
      break;
    case 'approve-processing':
      setStatus({
        title: `You are now approving.`,
        subtitle: `You will approve your tokens. `,
        additionalDetails: 'Processing your transaction',
        type: 'loading',
        link: '',
        show: true,
        retry: false,
      });
      break;
    case 'approve-success':
      setStatus({
        title: `Approve successful.`,
        subtitle: `Your tokens approved. `,
        additionalDetails: 'Confirm this transaction in your wallet',
        type: 'loading',
        link: '',
        show: true,
        retry: false,
      });
      break;
    case 'wrap-confirm':
      setStatus({
        title: `You are now wrapping stETH/ETH`,
        subtitle: `Wrapping ${amount}. You will receive wstETH. `,
        additionalDetails: 'Confirm this transaction in your wallet',
        type: 'loading',
        link: '',
        show: true,
        retry: false,
      });
      break;
    case 'wrap-processing':
      setStatus({
        title: `You are now wrapping stETH/ETH`,
        subtitle: `Wrapping ${amount}. You will receive wstETH. `,
        additionalDetails: 'Processing your transaction',
        type: 'loading',
        link: '',
        show: true,
        retry: false,
      });
      break;
    case 'wrap-success':
      setStatus({
        title: `Wrap successful`,
        subtitle: `You wrapped ${amount} stETH/ETH.`,
        additionalDetails: '',
        type: 'success',
        link: transactionHash
          ? getEtherscanTxLink(chainId, transactionHash)
          : '',
        show: true,
        retry: false,
      });
      break;
    case 'unwrap-confirm':
      setStatus({
        title: `You are now unwrapping wstETH`,
        subtitle: `Unwrapping ${amount}. You will receive stETH. `,
        additionalDetails: 'Confirm this transaction in your wallet',
        type: 'loading',
        link: '',
        show: true,
        retry: false,
      });
      break;
    case 'unwrap-processing':
      setStatus({
        title: `You are now unwrapping wstETH`,
        subtitle: `Unwrapping ${amount}. You will receive stETH. `,
        additionalDetails: 'Processing your transaction',
        type: 'loading',
        link: '',
        show: true,
        retry: false,
      });
      break;
    case 'unwrap-success':
      setStatus({
        title: `Unwrap successful`,
        subtitle: `You unwrapped ${amount} wstETH.`,
        additionalDetails: '',
        type: 'success',
        link: transactionHash
          ? getEtherscanTxLink(chainId, transactionHash)
          : '',
        show: true,
        retry: false,
      });
      break;
    case 'submit-confirm':
      setStatus({
        title: `You are now submitting ETH`,
        subtitle: `Submitting ${amount}. You will receive stETH. `,
        additionalDetails: 'Confirm this transaction in your wallet',
        type: 'loading',
        link: '',
        show: true,
        retry: false,
      });
      break;
    case 'submit-processing':
      setStatus({
        title: `You are now submitting ETH`,
        subtitle: `Submitting ${amount}. You will receive stETH. `,
        additionalDetails: 'Processing your transaction',
        type: 'loading',
        link: '',
        show: true,
        retry: false,
      });
      break;
    case 'submit-success':
      setStatus({
        title: `Submit successful`,
        subtitle: `You have submitted ${amount} ETH.`,
        additionalDetails: '',
        type: 'success',
        link: transactionHash
          ? getEtherscanTxLink(chainId, transactionHash)
          : '',
        show: true,
        retry: false,
      });
      break;
    case 'failed':
      setStatus({
        title: `Transaction Failed`,
        subtitle: reason || 'Something went wrong',
        additionalDetails: '',
        type: 'error',
        link: transactionHash
          ? getEtherscanTxLink(chainId, transactionHash)
          : '',
        show: true,
        retry: retry || false,
      });
      break;
    default:
      setStatus({
        title: `Transaction Failed`,
        subtitle: reason || 'Something went wrong',
        additionalDetails: '',
        type: 'error',
        link: transactionHash
          ? getEtherscanTxLink(chainId, transactionHash)
          : '',
        show: true,
        retry: retry || false,
      });
      break;
  }
};

export const INITIAL_STATUS = {
  title: '',
  subtitle: '',
  additionalDetails: '',
  link: '',
  type: '',
  show: false,
  retry: false,
};
