import React, { FC } from 'react';
import {
  DashboardContainer,
  DashboardStatsContainer,
  DashboardLabel,
  DashboardTablesContainer,
  DashboardWrapper,
  DashboardRebaseContainer,
  DashboardRebaseStatContainer,
  DashboardGraphContainer,
  DashboardTableContainer,
} from '../components/dashboard/styles';
import Image from 'next/image';
import AvgHoldIcon from '../images/dashboard/market/averageHolding.png';
import ApyIcon from '../images/dashboard/market/apy.png';
import BackendIcon from '../images/dashboard/market/backed.png';
import CircIcon from '../images/dashboard/market/circulating.png';
import CapIcon from '../images/dashboard/market/marketCap.png';
import RebaseIcon from '../images/dashboard/market/nextRebase.png';
import LockIcon from '../images/dashboard/icons/padlock.png';
import HexIcon from '../images/dashboard/icons/hex.png';
import PlsIcon from '../images/dashboard/icons/pulsechain.png';
import PlsxIcon from '../images/dashboard/icons/plsx.png';
import GraphIcon from '../images/dashboard/usdChart.png';
import GraphSupIcon from '../images/dashboard/supply.png';
import useMatchBreakpoints from '../hooks/useMatchBreakpoints';
import { Table, Tbody, Td, Th, Thead, Tr } from '@lidofinance/lido-ui';

const Dashboard: FC = () => {
  const { isMobile } = useMatchBreakpoints();
  return (
    <DashboardWrapper>
      <DashboardTablesContainer>
        <DashboardContainer>
          <DashboardStatsContainer>
            <DashboardLabel>
              <div>
                <div>
                  <Image
                    src={CapIcon}
                    alt={'icon'}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <p>Market Cap</p>
              </div>
              <p>$249,574,281.98</p>
            </DashboardLabel>

            <DashboardLabel>
              <div>
                <div>
                  <Image
                    src={ApyIcon}
                    alt={'icon'}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <p>APY Statistics</p>
              </div>
              <p>$0.1960</p>
            </DashboardLabel>

            <DashboardLabel>
              <div>
                <div>
                  <Image
                    src={RebaseIcon}
                    alt={'icon'}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <p>Next Rebase</p>
              </div>
              <p>00:17:59</p>
            </DashboardLabel>

            <DashboardLabel>
              <div>
                <div>
                  <Image
                    src={CircIcon}
                    alt={'icon'}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <p>Circulating Supply</p>
              </div>
              <p>1,273,260,219</p>
            </DashboardLabel>

            <DashboardLabel>
              <div>
                <div>
                  <Image
                    src={BackendIcon}
                    alt={'icon'}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <p>Backend Liquidity</p>
              </div>
              <p>159.14%</p>
            </DashboardLabel>

            <DashboardLabel>
              <div>
                <div>
                  <Image
                    src={AvgHoldIcon}
                    alt={'icon'}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <p>Average Holding</p>
              </div>
              <p>$4,065.88</p>
            </DashboardLabel>
          </DashboardStatsContainer>
        </DashboardContainer>

        <DashboardContainer>
          <DashboardRebaseContainer>
            <DashboardLabel lg>
              <div>
                <div>
                  <Image
                    src={LockIcon}
                    alt={'icon'}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <p style={{ fontWeight: 700 }}>Next Rebase</p>
              </div>
              <p style={{ color: '#17a8fa', fontWeight: 700, opacity: 1 }}>
                $5,245,205.87 USD
              </p>
            </DashboardLabel>
            <DashboardRebaseStatContainer>
              <DashboardLabel>
                <p>$249.12</p>
                <div>
                  <div>
                    <Image
                      src={HexIcon}
                      alt={'icon'}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <p style={{ fontWeight: 700 }}>HEX</p>
                </div>
              </DashboardLabel>
              <DashboardLabel>
                <p>$249.12</p>
                <div>
                  <div>
                    <Image
                      src={PlsIcon}
                      alt={'icon'}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <p style={{ fontWeight: 700 }}>PLS</p>
                </div>
              </DashboardLabel>
              <DashboardLabel>
                <p>$249.12</p>
                <div>
                  <div>
                    <Image
                      src={PlsxIcon}
                      alt={'icon'}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <p style={{ fontWeight: 700 }}>PLSX</p>
                </div>
              </DashboardLabel>
            </DashboardRebaseStatContainer>
          </DashboardRebaseContainer>
        </DashboardContainer>

        <DashboardContainer>
          <DashboardGraphContainer>
            <Image
              src={GraphIcon}
              alt={'icon'}
              layout="fill"
              objectFit="contain"
            />
          </DashboardGraphContainer>
        </DashboardContainer>

        <DashboardContainer>
          <DashboardGraphContainer
            style={{ height: isMobile ? '320px' : undefined }}
          >
            <Image
              src={GraphSupIcon}
              alt={'icon'}
              layout="fill"
              objectFit="contain"
            />
          </DashboardGraphContainer>
        </DashboardContainer>
      </DashboardTablesContainer>
      <DashboardContainer>
        <DashboardTableContainer>
          <Table width="100%">
            <Thead>
              <Tr>
                <Th>Ticker</Th>
                <Th>Address Name</Th>
                <Th>Balance</Th>
                <Th>Price</Th>
                <Th>Value (USD)</Th>
                <Th>Address</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>PulseChain</Td>
                <Td>0x5555</Td>
                <Td>207.962</Td>
                <Td>$837.02</Td>
                <Td>$2,365.01</Td>
                <Td>0x1618</Td>
                <Td>0x1618</Td>
              </Tr>
              <Tr>
                <Td>Pulsex</Td>
                <Td>0x5555</Td>
                <Td>207.962</Td>
                <Td>$837.02</Td>
                <Td>$2,365.01</Td>
                <Td>0x1618</Td>
                <Td>0x1618</Td>
              </Tr>
              <Tr>
                <Td>Hex</Td>
                <Td>0x5555</Td>
                <Td>207.962</Td>
                <Td>$837.02</Td>
                <Td>$2,365.01</Td>
                <Td>0x1618</Td>
                <Td>0x1618</Td>
              </Tr>
            </Tbody>
          </Table>
        </DashboardTableContainer>
      </DashboardContainer>
    </DashboardWrapper>
  );
};

export default Dashboard;
