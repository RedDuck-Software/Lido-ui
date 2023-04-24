import { FC, FormEvent, useEffect, useMemo, useState } from 'react';
import { GetStaticProps } from 'next';
import styled from 'styled-components';
import Head from 'next/head';
import {
  useContractSWR,
  useSTETHContractRPC,
  useSDK,
  getEtherscanTokenLink,
  useEthPrice,
  useTxPrice,
  useEthereumBalance,
} from 'sdk';
import {
  Block,
  Link,
  DataTable,
  DataTableRow,
  Input,
  Button,
} from '@lidofinance/lido-ui';
import { trackEvent, MatomoEventType } from '@lidofinance/analytics-matomo';

import Wallet from 'components/wallet';
import Section from 'components/section';
import { useStethContractWeb3 } from '../../hooks';
import { constants, utils } from 'ethers';
import notify from '../../utils/notify';
import StatusModal from 'components/statusModal';
import { getStethAddress } from '../../config/addresses';
import { INITIAL_STATUS, setStatusData } from '../../config/steps';
import { useAsyncFetch } from '../../sdk/react/hooks/useAsyncFetch';
import { BigNumber } from '@ethersproject/bignumber';
import { Steth } from '../../ui/icons';

const InputWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
`;

const Home: FC = () => {
  const { chainId } = useSDK();
  const stETH = useStethContractWeb3();
  const [enteredAmount, setEnteredAmount] = useState('');
  const [status, setStatus] = useState(INITIAL_STATUS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canStake, setCanStake] = useState(false);
  const ethBalance = useEthereumBalance();

  const insufficientBalance = useMemo(() => {
    return (
      parseFloat(utils.formatUnits(ethBalance.data || constants.Zero)) <
      parseFloat(enteredAmount)
    );
  }, [ethBalance.data, enteredAmount]);

  useEffect(() => {
    const matomoSomeEvent: MatomoEventType = [
      'Stake your PLS',
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
  const totalStaked = useContractSWR({
    contract: contractRpc,
    method: 'getTotalPooledEther',
  });

  const ethPrice = useEthPrice();

  const submitGas = useAsyncFetch<BigNumber>(async () => {
    if (stETH) {
      const estimationWrap = await stETH.estimateGas.submit(
        constants.AddressZero,
        { value: utils.parseUnits('0.000000001') },
      );
      console.log('estimation', +estimationWrap);
      return estimationWrap;
    }
    return constants.Zero;
  }, [stETH]);

  const txPrice = useTxPrice(submitGas.data || constants.Zero);

  const handleSubmitTokens = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enteredAmount && enteredAmount !== '0' && stETH) {
      setIsSubmitting(true);
      try {
        const parsedAmount = utils.parseUnits(enteredAmount);
        setStatusData({
          amount: enteredAmount,
          step: 'submit-confirm',
          chainId,
          setStatus: (val) => setStatus(val),
        });
        const submit = await stETH.submit(constants.AddressZero, {
          value: parsedAmount,
        });
        setStatusData({
          amount: enteredAmount,
          step: 'submit-processing',
          chainId,
          setStatus: (val) => setStatus(val),
        });
        const response = await submit.wait();
        const { status, transactionHash } = response;
        if (status) {
          setStatusData({
            amount: enteredAmount,
            transactionHash,
            step: 'submit-success',
            chainId,
            setStatus: (val) => setStatus(val),
          });
          setEnteredAmount('');
          setCanStake(false);
        } else {
          setStatusData({
            transactionHash,
            step: 'failed',
            retry: true,
            chainId,
            setStatus: (val) => setStatus(val),
          });
        }
        setIsSubmitting(false);
      } catch (ex) {
        const error = ex as Error;
        setStatusData({
          step: 'failed',
          reason: error.message.replace('MetaMask Tx Signature: ', ''),
          retry: true,
          chainId,
          setStatus: (val) => setStatus(val),
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
      <Wallet onlyStETH />
      <Block>
        <form action="pages" method="post" onSubmit={handleSubmitTokens}>
          <InputWrapper>
            <Input
              fullwidth
              value={enteredAmount}
              placeholder="0"
              leftDecorator={<Steth width="24px" height="24px" />}
              disabled={isSubmitting}
              onChange={handleChange}
              label="Amount"
            />
          </InputWrapper>
          <Button
            fullwidth
            type="submit"
            disabled={!canStake || insufficientBalance}
          >
            {insufficientBalance ? 'Insufficient Balance' : 'Submit'}
          </Button>
        </form>
        <DataTable style={{ paddingTop: '24px' }}>
          <DataTableRow
            title="You will receive"
            loading={tokenName.initialLoading}
          >
            {enteredAmount || 0} stPLS
          </DataTableRow>
          <DataTableRow
            title="Exchange rate"
            loading={tokenName.initialLoading}
          >
            1 PLS = 1 stPLS
          </DataTableRow>
          <DataTableRow
            title="Max transaction cost"
            loading={txPrice.initialLoading}
          >
            ${(txPrice.data ?? 0).toFixed(2)}
          </DataTableRow>
          <DataTableRow
            title="Reward fee"
            loading={tokenName.initialLoading}
            help="Please note: this fee applies to staking rewards only, and is NOT taken from your staked amount."
          >
            15%
          </DataTableRow>
        </DataTable>
      </Block>
      <Section
        title="Statistics"
        headerDecorator={
          <Link href={getEtherscanTokenLink(chainId, getStethAddress(chainId))}>
            View on Etherscan
          </Link>
        }
      >
        <Block>
          <DataTable>
            <DataTableRow
              title="Total staked"
              loading={totalStaked.initialLoading}
            >
              {(+utils.formatUnits(
                totalStaked.data ?? constants.Zero,
              )).toLocaleString()}{' '}
              PLS
            </DataTableRow>
            <DataTableRow
              title="stETH market cap"
              loading={tokenName.initialLoading || ethPrice.loading}
            >
              $
              {(
                +utils.formatUnits(totalStaked.data ?? constants.Zero) *
                (ethPrice.data ?? 0)
              ).toLocaleString()}
            </DataTableRow>
          </DataTable>
        </Block>
      </Section>
      <StatusModal
        title={status.title}
        subtitle={status.subtitle}
        additionalDetails={status.additionalDetails}
        link={status.link}
        type={status.type}
        show={status.show}
        onClose={() => setStatus(INITIAL_STATUS)}
        retry={status.retry}
        onRetry={handleSubmitTokens}
      />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
