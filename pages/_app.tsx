import { memo } from 'react';
import NextApp, { AppContext, AppProps } from 'next/app';
import {
  ToastContainer,
  CookiesTooltip,
  migrationAllowCookieToCrossDomainCookieClientSide,
  migrationThemeCookiesToCrossDomainCookiesClientSide,
} from '@lidofinance/lido-ui';
import Providers from 'providers';
import { CustomAppProps } from 'types';
import { withCsp } from 'utils/withCsp';
import Layout from 'components/layout';
import { useRouter } from 'next/router';

// Migrations old cookies to new cross domain cookies
migrationThemeCookiesToCrossDomainCookiesClientSide();

// Migrations old allow cookies to new cross domain cookies
migrationAllowCookieToCrossDomainCookieClientSide(
  'LIDO_WIDGET__COOKIES_ALLOWED',
);

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;
  const routes = useRouter();

  const title =
    routes.pathname === '/'
      ? 'Stake Ether'
      : routes.pathname === '/wrap'
      ? 'Wrap & Unwrap'
      : 'Rewards';
  const description =
    routes.pathname === '/'
      ? 'Stake ETH and receive stETH while staking.'
      : routes.pathname === '/wrap'
      ? 'Stable-balance stETH wrapper for DeFi'
      : 'Rewards stats';

  return (
    <Layout title={title} subtitle={description}>
      <Component {...pageProps} />
    </Layout>
  );
};

const MemoApp = memo(App);

const AppWrapper = (props: CustomAppProps): JSX.Element => {
  const { ...rest } = props;

  return (
    <Providers>
      <MemoApp {...rest} />
      <CookiesTooltip />
      <ToastContainer />
    </Providers>
  );
};

AppWrapper.getInitialProps = async (appContext: AppContext) => {
  return await NextApp.getInitialProps(appContext);
};

export default process.env.NODE_ENV === 'development'
  ? AppWrapper
  : withCsp(AppWrapper);
