import { FC, FormEvent, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import styled from 'styled-components';
import Head from 'next/head';
import {
  useContractSWR,
  useSTETHContractRPC,
  useLidoSWR,
  useSDK,
  getEtherscanTxLink,
} from 'sdk';
import {
  Block,
  Link,
  DataTable,
  DataTableRow,
  Input,
  Steth,
  Button,
} from '@lidofinance/lido-ui';
import { trackEvent, MatomoEventType } from '@lidofinance/analytics-matomo';

import Wallet from 'components/wallet';
import Section from 'components/section';
import Faq from 'components/faq';
import { standardFetcher } from 'utils';
import { FAQItem, getFaqList } from 'utils/faqList';
import { useStethContractWeb3 } from '../hooks';
import { constants, utils } from 'ethers';
import notify from '../utils/notify';
import StatusModal from 'components/statusModal';

interface HomeProps {
  faqList: FAQItem[];
}

const InputWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
`;

type StatusProps = {
  step: string;
  amount?: string;
  reason?: string;
  transactionHash?: string;
  retry?: boolean;
};

const initialStatus = {
  title: '',
  subtitle: '',
  additionalDetails: '',
  link: '',
  type: '',
  show: false,
  retry: false,
};

const Home: FC<HomeProps> = ({ faqList }) => {
  const { chainId } = useSDK();
  const stETH = useStethContractWeb3();
  const [enteredAmount, setEnteredAmount] = useState('');
  const [status, setStatus] = useState(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canStake, setCanStake] = useState(false);

  useEffect(() => {
    const matomoSomeEvent: MatomoEventType = [
      'Lido_Frontend_Template',
      'Mount index component',
      'mount_index_component',
    ];

    trackEvent(...matomoSomeEvent);
  }, []);

  const contractRpc = useSTETHContractRPC();
  const tokenName = useContractSWR({
    contract: contractRpc,
    method: 'name',
  });

  const { data } = useLidoSWR<number>('/api/oneinch-rate', standardFetcher);
  const oneInchRate = data ? (100 - (1 / data) * 100).toFixed(2) : 1;

  const setStatusData = ({
    amount,
    step,
    transactionHash,
    retry,
    reason,
  }: StatusProps) => {
    switch (step) {
      case 'confirm':
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
      case 'processing':
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
    }
  };

  const handleSubmitTokens = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enteredAmount && enteredAmount !== '0' && stETH) {
      setIsSubmitting(true);
      try {
        const parsedAmount = utils.parseUnits(enteredAmount);
        setStatusData({ amount: enteredAmount, step: 'confirm' });
        const submit = await stETH.submit(constants.AddressZero, {
          value: parsedAmount,
        });
        setStatusData({ amount: enteredAmount, step: 'processing' });
        const response = await submit.wait();
        const { status, transactionHash } = response;
        if (status) {
          setStatusData({
            amount: enteredAmount,
            transactionHash,
            step: 'success',
          });
          setEnteredAmount('');
          setCanStake(false);
        } else {
          setStatusData({ transactionHash, step: 'failed', retry: true });
        }
        setIsSubmitting(false);
      } catch (ex) {
        const error = ex as Error;
        setStatusData({
          step: 'failed',
          reason: error.message.replace('MetaMask Tx Signature: ', ''),
          retry: true,
        });
        setIsSubmitting(false);
      }
    } else {
      notify('Please enter the amount', 'error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    if (isNaN(+amount) || /^00/.test(amount) || +amount < 0) {
      return;
    }
    if (+amount === 0) {
      setCanStake(false);
    } else {
      setCanStake(true);
    }
    setEnteredAmount(amount);
  };

  return (
    <>
      <Head>
        <title>Lido | Frontend Template</title>
      </Head>
      <Wallet />
      <Block>
        <form action="" method="post" onSubmit={handleSubmitTokens}>
          <InputWrapper>
            <Input
              fullwidth
              value={enteredAmount}
              placeholder="0"
              leftDecorator={<Steth />}
              disabled={isSubmitting}
              onChange={handleChange}
              label="Amount"
            />
          </InputWrapper>
          <Button fullwidth type="submit" disabled={!canStake}>
            Submit
          </Button>
        </form>
      </Block>
      <Section title="Data table" headerDecorator={<Link href="#">Link</Link>}>
        <Block>
          <DataTable>
            <DataTableRow title="Token name" loading={tokenName.initialLoading}>
              {tokenName.data}
            </DataTableRow>
            <DataTableRow title="1inch rate" loading={tokenName.initialLoading}>
              {oneInchRate}
            </DataTableRow>
          </DataTable>
        </Block>
      </Section>
      <Faq faqList={faqList} />
      <StatusModal
        title={status.title}
        subtitle={status.subtitle}
        additionalDetails={status.additionalDetails}
        link={status.link}
        type={status.type}
        show={status.show}
        onClose={() => setStatus(initialStatus)}
        retry={status.retry}
        onRetry={handleSubmitTokens}
      />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: {
    faqList: await getFaqList(['lido-frontend-template']),
  },
});
