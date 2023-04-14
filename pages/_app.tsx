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

const getTitle = (path: string): string => {
  switch (path) {
    case '/stake':
      return 'Stake PLS';
    case '/stake/wrap':
      return 'Wrap & Unwrap';
    case '/stake/rewards':
      return 'Reward History';
    default:
      return '';
  }
};
const getDescription = (path: string): string => {
  switch (path) {
    case '/stake':
      return 'Stake PLS and receive stPLS while staking.';
    case '/stake/wrap':
      return 'Stable-balance stPLS wrapper for DeFi';
    case '/stake/rewards':
      return 'Track your staking rewards.';
    default:
      return '';
  }
};

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;
  const routes = useRouter();

  const title = getTitle(routes.pathname);
  const description = getDescription(routes.pathname);

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
