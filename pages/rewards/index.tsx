import React, { useEffect, useMemo, useState } from 'react';
import {
  useContractSWR,
  useEthPrice,
  useLidoSWR,
  useSDK,
  useSTETHBalance,
  useSTETHContractRPC,
} from '../../sdk';
import { MatomoEventType, trackEvent } from '@lidofinance/analytics-matomo';
import Head from 'next/head';
import {
  Block,
  Input,
  HStack,
  StackItem,
  Text,
  Link,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Checkbox,
} from '@lidofinance/lido-ui';
import { standardFetcher } from '../../utils';
import { WalletCard } from '../../components/walletCard';
import Section from '../../components/section';
import { IHistory } from '../api/interface/IHistory';
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints';
import { constants, utils } from 'ethers';
import { weiToHumanReadable } from '../api/rewards';
import styled from 'styled-components';

export const YellowLabel = styled.div`
  width: 100%;
  color: rgb(255, 172, 47);
  background-color: rgba(255, 172, 47, 0.1);
  text-align: center;
  margin-top: 16px;
  padding: 8px;
  border-radius: 8px;
`;

const Wrap = () => {
  const { account, chainId } = useSDK();
  const { isMobile } = useMatchBreakpoints();
  const ethPrice = useEthPrice();
  const stETHBalance = useSTETHBalance();
  const stethRPC = useSTETHContractRPC();

  const [address, setAddress] = useState<string>('');
  const [onlyRewards, setOnlyRewards] = useState(false);

  useEffect(() => {
    if (account) {
      setAddress(account);
    }
  }, [account]);

  useEffect(() => {
    const matomoSomeEvent: MatomoEventType = [
      'Lido_Frontend_Template',
      'Mount index component',
      'mount_index_component',
    ];

    trackEvent(...matomoSomeEvent);
  }, []);

  const history = useLidoSWR<IHistory[]>(
    `/api/rewards?address=${address ?? ''}&chainId=${chainId}`,
    standardFetcher,
    { suspense: utils.isAddress(address) },
  );

  const sharesByOneETH = useContractSWR({
    contract: stethRPC,
    method: 'getSharesByPooledEth',
    params: [constants.WeiPerEther],
  });

  const filteredHistory = useMemo<IHistory[]>(() => {
    if (history.data) {
      if (onlyRewards)
        return history.data.filter((data) => data.type === 'Reward');
      return history.data;
    }
    return [];
  }, [history, onlyRewards]);

  const rewards = useMemo<number>(() => {
    if (filteredHistory.length === 0) return 0;
    return filteredHistory
      .filter((data) => data.type === 'Reward')
      .reduce(
        (previousValue, currentValue) =>
          previousValue + parseFloat(currentValue.change),
        0,
      );
  }, [filteredHistory]);

  const rewardsInUsd = useMemo<number>(() => {
    if (ethPrice.data) {
      return rewards * ethPrice.data;
    }
    return 0;
  }, [rewards, ethPrice]);

  const avgAPR = useMemo<string>(() => {
    if (filteredHistory.length !== 0) {
      const sumAPR = filteredHistory.reduce(
        (previousValue, currentValue) => previousValue + +currentValue.apr,
        0,
      );
      return (sumAPR / filteredHistory.length).toLocaleString();
    }
    return '-';
  }, [filteredHistory]);

  return (
    <>
      <Head>
        <title>Lido | Frontend Template</title>
      </Head>
      <WalletCard>
        <Input
          fullwidth
          value={address}
          placeholder="Enter address"
          disabled
          error={
            !utils.isAddress(address) && address ? 'Incorrect address.' : ''
          }
        />
        <YellowLabel>
          Current balance may differ from last balance in the table due to
          rounding.
        </YellowLabel>
      </WalletCard>
      <Block>
        <HStack>
          <StackItem basis="25%">
            <HStack>
              <StackItem basis="100%">
                <Text size="xs">stETH balance</Text>
              </StackItem>
              <StackItem basis="100%">
                <HStack>
                  <StackItem basis="10%">
                    <Text size="lg" style={{ fontWeight: 700 }}>
                      Ξ
                    </Text>
                  </StackItem>
                  <StackItem>
                    <Text size="lg" style={{ fontWeight: 500 }}>
                      {weiToHumanReadable(
                        (stETHBalance.data || 0).toString(),
                        8,
                      )}
                    </Text>
                  </StackItem>
                </HStack>
              </StackItem>
              <StackItem basis="100%">
                <Text size="xs" style={{ fontWeight: 300 }}>
                  ${' '}
                  {(
                    parseFloat(
                      weiToHumanReadable((stETHBalance.data || 0).toString()),
                    ) * (ethPrice.data || 0)
                  ).toLocaleString()}
                </Text>
              </StackItem>
            </HStack>
          </StackItem>
          <StackItem basis="25%">
            <HStack>
              <StackItem basis="100%">
                <Text size="xs">stETH rewarded</Text>
              </StackItem>
              <StackItem basis="100%">
                <HStack>
                  <StackItem basis="10%">
                    <Text size="lg" style={{ fontWeight: 700 }} color="success">
                      Ξ
                    </Text>
                  </StackItem>
                  <StackItem>
                    <Text size="lg" style={{ fontWeight: 500 }} color="success">
                      {rewards}
                    </Text>
                  </StackItem>
                </HStack>
              </StackItem>
              <StackItem basis="100%">
                <Text size="xs" style={{ fontWeight: 300 }}>
                  $ {rewardsInUsd.toLocaleString()}
                </Text>
              </StackItem>
            </HStack>
          </StackItem>
          <StackItem basis="25%">
            <HStack>
              <StackItem basis="100%">
                <Text size="xs">Average APR</Text>
              </StackItem>
              <StackItem basis="100%">
                <Text size="lg">
                  {avgAPR}
                  {filteredHistory.length === 0 ? '' : '%'}
                </Text>
              </StackItem>
              <StackItem basis="100%">
                <Link
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '14px',
                    textDecoration: 'underline',
                  }}
                  href="https://lido.fi/faq"
                >
                  More info
                </Link>
              </StackItem>
            </HStack>
          </StackItem>
          <StackItem basis="25%">
            <HStack>
              <StackItem basis="100%">
                <Text size="xs">stETH price</Text>
              </StackItem>
              <StackItem basis="100%">
                <HStack>
                  <StackItem basis="10%">
                    <Text size="lg" style={{ fontWeight: 700 }}>
                      $
                    </Text>
                  </StackItem>
                  <StackItem>
                    <Text size="lg" style={{ fontWeight: 500 }}>
                      {(ethPrice.data || 0).toLocaleString()}
                    </Text>
                  </StackItem>
                </HStack>
              </StackItem>
              <StackItem basis="100%">
                <HStack>
                  <StackItem basis="7%">
                    <Text size="xs" style={{ fontWeight: 300 }}>
                      Ξ
                    </Text>
                  </StackItem>
                  <StackItem>
                    <Text size="xs" style={{ fontWeight: 300 }}>
                      {weiToHumanReadable(
                        (sharesByOneETH.data || 0).toString(),
                        18,
                      )}
                    </Text>
                  </StackItem>
                </HStack>
              </StackItem>
            </HStack>
          </StackItem>
        </HStack>
      </Block>
      <Section>
        <Block>
          <HStack style={{ marginBottom: '24px' }}>
            <StackItem basis={isMobile ? '100%' : undefined}>
              <Text
                size="xs"
                color="secondary"
                style={{ fontWeight: 700, marginRight: '24px' }}
              >
                Rewards history
              </Text>
            </StackItem>
            <StackItem basis={isMobile ? '100%' : undefined}>
              <Checkbox
                style={{ marginTop: isMobile ? '12px' : '' }}
                checked={onlyRewards}
                onClick={() => setOnlyRewards((prev) => !prev)}
                label="Only Show Rewards"
              />
            </StackItem>
          </HStack>
          <Table width="100%">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Type</Th>
                <Th>Ξ Change</Th>
                {!isMobile && (
                  <>
                    <Th>$ Change</Th>
                    <Th>APR</Th>
                    <Th>Balance</Th>
                  </>
                )}
              </Tr>
            </Thead>
            {filteredHistory.length !== 0 && (
              <Tbody>
                {filteredHistory.map((data) => (
                  <Tr key={JSON.stringify(data)}>
                    <Td>{data.date}</Td>
                    <Td>{data.type}</Td>
                    <Td>{data.change}</Td>
                    {!isMobile && (
                      <>
                        <Td>
                          {(
                            parseFloat(data.change) * (ethPrice.data || 0)
                          ).toFixed(8)}
                        </Td>
                        <Td>{data.apr}</Td>
                        <Td>{data.balance}</Td>
                      </>
                    )}
                  </Tr>
                ))}
              </Tbody>
            )}
          </Table>
          {filteredHistory.length === 0 && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Text>no data</Text>
            </div>
          )}
        </Block>
      </Section>
    </>
  );
};

export default Wrap;
