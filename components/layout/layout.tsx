import { FC, PropsWithChildren, useState } from 'react';
import Head from 'next/head';
import Header from 'components/header';
import Main from 'components/main';
import {
  LayoutTitleStyle,
  LayoutSubTitleStyle,
  LayoutWrapper,
  LayoutInsertWrapper,
} from './layoutStyles';
import { LayoutProps } from './types';
import Sidebar from '../Sidebar/Sidebar';

const Layout: FC<PropsWithChildren<LayoutProps>> = (props) => {
  const { title, subtitle } = props;
  const { children } = props;
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <LayoutWrapper>
      <Sidebar opened={isOpened} />
      <LayoutInsertWrapper>
        <Head>
          <meta name="description" content="Lido Template" />
        </Head>
        <Header setOpenedSidebar={setIsOpened} />
        <Main>
          <LayoutTitleStyle>{title}</LayoutTitleStyle>
          <LayoutSubTitleStyle>{subtitle}</LayoutSubTitleStyle>
          {children}
        </Main>
      </LayoutInsertWrapper>
    </LayoutWrapper>
  );
};

export default Layout;
