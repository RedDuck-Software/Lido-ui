import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  StethAbi,
  useAllowance,
  useContractSWR,
  useEthereumBalance,
  useSDK,
  useSTETHBalance,
  useTxPrice,
  useWSTETHBalance,
  useWSTETHContractRPC,
  useWSTETHContractWeb3,
  WstethAbi,
} from '../../../sdk';
import { useStethContractWeb3 } from '../../../hooks';
import { MatomoEventType, trackEvent } from '@lidofinance/analytics-matomo';
import { constants, utils } from 'ethers';
import notify from '../../../utils/notify';
import Head from 'next/head';
import Wallet from '../../../components/wallet';
import {
  Block,
  Button,
  DataTable,
  DataTableRow,
  Input,
  InputGroup,
  SelectIcon,
  Option,
  Wsteth,
} from '@lidofinance/lido-ui';
import StatusModal from '../../../components/statusModal';
import Tabs from '../../../components/tabs/Tabs';
import styled from 'styled-components';
import { INITIAL_STATUS, IStatus, setStatusData } from '../../../config/steps';
import { BigNumber } from '@ethersproject/bignumber';
import { getStethAddress, getWstethAddress } from '../../../config/addresses';
import { useAsyncFetch } from '../../../sdk/react/hooks/useAsyncFetch';
import { Pulse, Steth } from '../../../ui/icons';

const iconsMap = {
  pls: <Pulse width="24px" height="24px" />,
  stpls: <Steth width="24px" height="24px" />,
};

const InputWrapper = styled(InputGroup)`
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
`;

const Wrap = () => {
  const ref = useRef(null);
  const { account, chainId } = useSDK();
  const wstethWEB3 = useWSTETHContractWeb3();
  const wstethRPC = useWSTETHContractRPC();
  const [selectedTab, setSelectedTab] = useState<string>('WRAP');
  const stETH = useStethContractWeb3();
  const [enteredAmount, setEnteredAmount] = useState('');
  const [status, setStatus] = useState<IStatus>(INITIAL_STATUS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canStake, setCanStake] = useState(false);
  const [activeToken, setActiveToken] =
    useState<keyof typeof iconsMap>('stpls');

  const oneStToWst = useContractSWR({
    contract: wstethRPC,
    method: 'getWstETHByStETH',
    params: [constants.WeiPerEther],
  });
  const oneWstToSt = useContractSWR({
    contract: wstethRPC,
    method: 'getStETHByWstETH',
    params: [constants.WeiPerEther],
  });

  const stethBalance = useSTETHBalance();
  const wstethBalance = useWSTETHBalance();
  const ethBalance = useEthereumBalance();

  const stethAllowance = useAllowance(
    getStethAddress(chainId),
    getWstethAddress(chainId),
  );

  useEffect(() => {
    const matomoSomeEvent: MatomoEventType = [
      'Lido_Frontend_Template',
      'Mount index component',
      'mount_index_component',
    ];

    trackEvent(...matomoSomeEvent);
  }, []);

  const currentBalance = useMemo<string>(() => {
    return selectedTab === 'UNWRAP'
      ? utils.formatUnits(wstethBalance.data || constants.Zero)
      : activeToken === 'pls'
      ? utils.formatUnits(ethBalance.data || constants.Zero)
      : utils.formatUnits(stethBalance.data || constants.Zero);
  }, [
    ethBalance.data,
    wstethBalance.data,
    stethBalance.data,
    activeToken,
    selectedTab,
  ]);

  const insufficientBalance = useMemo(() => {
    return parseFloat(currentBalance) < parseFloat(enteredAmount);
  }, [currentBalance, enteredAmount]);

  const approveGas = useAsyncFetch<BigNumber>(async () => {
    if (stETH) {
      return await stETH.estimateGas.approve(
        getWstethAddress(chainId),
        utils.parseUnits('0.000000001'),
      );
    }
    return constants.Zero;
  }, [stETH]);

  const approveTxPrice = useTxPrice(approveGas.data || constants.Zero);

  const submitGas = useAsyncFetch<BigNumber>(async () => {
    if (stETH) {
      return await stETH.estimateGas.submit(constants.AddressZero, {
        value: utils.parseUnits('0.000000001'),
      });
    }
    return constants.Zero;
  }, [stETH]);

  const wrapGas = useAsyncFetch<BigNumber>(async () => {
    if (wstethWEB3 && stETH) {
      const allowance = await stETH.allowance(
        account ?? '',
        getWstethAddress(chainId),
      );
      if (allowance.eq(constants.Zero)) return constants.Zero;
      return await wstethWEB3.estimateGas.wrap(allowance);
    }
    return constants.Zero;
  }, [wstethWEB3, stETH]);

  const unwrapGas = useAsyncFetch<BigNumber>(async () => {
    if (wstethWEB3 && stETH) {
      return await wstethWEB3.estimateGas.unwrap(
        utils.parseUnits('0.000000001'),
      );
    }
    return constants.Zero;
  }, [wstethWEB3, stETH]);

  const submitPrice = useTxPrice(submitGas.data || constants.Zero);

  const wrapPrice = useTxPrice(wrapGas.data || constants.Zero);
  const unwrapPrice = useTxPrice(unwrapGas.data || constants.Zero);

  const approve = async (
    contract: WstethAbi | StethAbi,
    amount: BigNumber,
    recipient: string,
  ) => {
    const allowance = await contract.allowance(account ?? '', recipient);
    if (allowance.gte(amount)) return;

    setStatusData({
      amount: enteredAmount,
      step: 'approve-confirm',
      chainId,
      setStatus: (val) => setStatus(val),
    });
    const receipt = await contract.approve(recipient, amount);
    setStatusData({
      amount: enteredAmount,
      step: 'approve-processing',
      chainId,
      setStatus: (val) => setStatus(val),
    });
    const response = await receipt.wait();
    const { status, transactionHash } = response;
    if (status) {
      setStatusData({
        amount: enteredAmount,
        transactionHash,
        step: 'approve-success',
        chainId,
        setStatus: (val) => setStatus(val),
      });
    } else {
      setStatusData({
        transactionHash,
        step: 'failed',
        retry: true,
        chainId,
        setStatus: (val) => setStatus(val),
      });
    }
  };

  const wrapTokens = async (amount: BigNumber) => {
    if (stETH && wstethWEB3) {
      let stETHAmount = amount;
      if (activeToken === 'pls') {
        setStatusData({
          amount: utils.formatUnits(stETHAmount),
          step: 'submit-confirm',
          chainId,
          setStatus: (val) => setStatus(val),
        });
        stETHAmount = await stETH.callStatic.submit(constants.AddressZero, {
          value: amount,
        });
        const submit = await stETH.submit(constants.AddressZero, {
          value: amount,
        });
        setStatusData({
          amount: utils.formatUnits(stETHAmount),
          step: 'submit-processing',
          chainId,
          setStatus: (val) => setStatus(val),
        });
        const response = await submit.wait();
        const { status, transactionHash } = response;
        if (status) {
          setStatusData({
            amount: utils.formatUnits(stETHAmount),
            transactionHash,
            step: 'submit-success',
            chainId,
            setStatus: (val) => setStatus(val),
          });
        } else {
          setStatusData({
            transactionHash,
            step: 'failed',
            retry: true,
            chainId,
            setStatus: (val) => setStatus(val),
          });
        }
      }
      console.log(+stETHAmount, +amount);
      await approve(stETH, stETHAmount, getWstethAddress(chainId));

      setStatusData({
        amount: utils.formatUnits(stETHAmount),
        step: 'wrap-confirm',
        chainId,
        setStatus: (val) => setStatus(val),
      });
      const wrap = await wstethWEB3.wrap(stETHAmount);
      setStatusData({
        amount: utils.formatUnits(stETHAmount),
        step: 'wrap-processing',
        chainId,
        setStatus: (val) => setStatus(val),
      });
      const response = await wrap.wait();
      const { status, transactionHash } = response;
      if (status) {
        setStatusData({
          amount: utils.formatUnits(stETHAmount),
          transactionHash,
          step: 'wrap-success',
          chainId,
          setStatus: (val) => setStatus(val),
        });
      } else {
        setStatusData({
          transactionHash,
          step: 'failed',
          retry: true,
          chainId,
          setStatus: (val) => setStatus(val),
        });
      }
    } else {
      notify('stETH undefined', 'error');
    }
  };

  const unwrapTokens = async (amount: BigNumber) => {
    if (wstethWEB3) {
      setStatusData({
        amount: enteredAmount,
        step: 'unwrap-confirm',
        chainId,
        setStatus: (val) => setStatus(val),
      });
      const unwrap = await wstethWEB3.unwrap(amount);
      setStatusData({
        amount: enteredAmount,
        step: 'unwrap-processing',
        chainId,
        setStatus: (val) => setStatus(val),
      });
      const response = await unwrap.wait();
      const { status, transactionHash } = response;
      if (status) {
        setStatusData({
          amount: enteredAmount,
          transactionHash,
          step: 'unwrap-success',
          chainId,
          setStatus: (val) => setStatus(val),
        });
      } else {
        setStatusData({
          transactionHash,
          step: 'failed',
          retry: true,
          chainId,
          setStatus: (val) => setStatus(val),
        });
      }
    } else {
      notify('wstethWEB3 undefined', 'error');
    }
  };

  const handleClickTx = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enteredAmount && enteredAmount !== '0' && stETH) {
      setIsSubmitting(true);
      try {
        const parsedAmount = utils.parseUnits(enteredAmount);
        if (selectedTab === 'WRAP') {
          await wrapTokens(parsedAmount);
        } else {
          await unwrapTokens(parsedAmount);
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
        <title>Poolsea | Wrap</title>
      </Head>
      <Tabs
        options={['WRAP', 'UNWRAP']}
        selected={selectedTab}
        onSelectTab={setSelectedTab}
      />
      <Wallet />
      <Block>
        <form action="stake/wrap" method="post" onSubmit={handleClickTx}>
          <InputWrapper fullwidth ref={ref}>
            {selectedTab === 'WRAP' && (
              <SelectIcon
                anchorRef={ref}
                icon={iconsMap[activeToken]}
                value={activeToken}
                onChange={(value: keyof typeof iconsMap) =>
                  setActiveToken(value)
                }
              >
                <Option leftDecorator={iconsMap.stpls} value="stpls">
                  Poolsea (stPLS)
                </Option>
                <Option leftDecorator={iconsMap.pls} value="pls">
                  Pulse (PLS)
                </Option>
              </SelectIcon>
            )}
            <Input
              fullwidth
              value={enteredAmount}
              placeholder="0"
              leftDecorator={selectedTab === 'UNWRAP' ? <Wsteth /> : undefined}
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
            {insufficientBalance
              ? 'Insufficient Balance'
              : selectedTab === 'UNWRAP'
              ? 'Unwrap'
              : 'Wrap'}
          </Button>
        </form>
        <DataTable style={{ paddingTop: '24px' }}>
          {selectedTab === 'WRAP' && (
            <DataTableRow
              title="Max unlock fee"
              loading={approveTxPrice.initialLoading}
            >
              ${(approveTxPrice.data || 0).toFixed(2)}
            </DataTableRow>
          )}
          <DataTableRow
            title="Max gas fee"
            loading={
              wrapPrice.initialLoading ||
              submitPrice.initialLoading ||
              unwrapPrice.initialLoading ||
              approveTxPrice.initialLoading
            }
          >
            $
            {(selectedTab === 'UNWRAP'
              ? unwrapPrice.data || 0
              : (approveTxPrice.data || 0) +
                (wrapPrice.data || 0) +
                (activeToken === 'pls' ? submitPrice.data || 0 : 0)
            ).toFixed(2)}
          </DataTableRow>
          <DataTableRow
            title="Exchange rate"
            loading={
              selectedTab === 'UNWRAP'
                ? oneWstToSt.initialLoading
                : oneStToWst.initialLoading
            }
          >
            {`1 ${
              selectedTab === 'WRAP' ? activeToken.toUpperCase() : 'WSTPLS'
            } = ${(+utils.formatUnits(
              (selectedTab === 'UNWRAP' ? oneWstToSt.data : oneStToWst.data) ||
                constants.Zero,
            )).toFixed(4)} ${selectedTab === 'WRAP' ? 'wstPLS' : 'stPLS'}`}
          </DataTableRow>
          {selectedTab === 'WRAP' && (
            <>
              <DataTableRow
                title="Allowance"
                loading={stethAllowance.initialLoading}
              >
                {(+utils.formatUnits(
                  stethAllowance.data || constants.Zero,
                )).toFixed(4)}{' '}
                stPLS
              </DataTableRow>
              <DataTableRow
                title="You will receive"
                loading={oneStToWst.initialLoading}
              >
                {(+utils.formatUnits(
                  utils
                    .parseUnits(enteredAmount || '0')
                    .mul(oneStToWst.data || constants.Zero),
                  36,
                )).toFixed(4)}{' '}
                wstPLS
              </DataTableRow>
            </>
          )}
        </DataTable>
      </Block>
      <StatusModal
        title={status.title}
        subtitle={status.subtitle}
        additionalDetails={status.additionalDetails}
        link={status.link}
        type={status.type}
        show={status.show}
        onClose={() => setStatus(INITIAL_STATUS)}
        retry={status.retry}
        onRetry={handleClickTx}
      />
    </>
  );
};

export default Wrap;
