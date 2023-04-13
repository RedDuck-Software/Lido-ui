import { FC, PropsWithChildren } from 'react';
import { MainStyle } from './mainStyles';
import { useRouter } from 'next/router';

const Main: FC<PropsWithChildren> = (props) => {
  const routes = useRouter();
  return (
    <MainStyle
      style={{
        maxWidth: routes.pathname === '/stake/rewards' ? '960px' : undefined,
      }}
      size="tight"
      forwardedAs="main"
      {...props}
    />
  );
};

export default Main;
