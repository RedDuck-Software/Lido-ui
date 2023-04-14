import { FC, PropsWithChildren } from 'react';
import { CookieThemeProvider } from 'ui/theme';

import { GlobalStyle } from 'styles';

import ModalProvider from './modals';
import Web3Provider from './web3';
export { MODAL, ModalContext } from './modals';

export * from './web3';

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <CookieThemeProvider>
    <GlobalStyle />
    <Web3Provider>
      <ModalProvider>{children}</ModalProvider>
    </Web3Provider>
  </CookieThemeProvider>
);

export default Providers;
