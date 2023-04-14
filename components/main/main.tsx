import { FC, PropsWithChildren } from 'react';
import { MainStyle } from './mainStyles';
import { useRouter } from 'next/router';

const getMaxWidthByPath = (path: string): string | undefined => {
  switch (path) {
    case '/':
      return '100%';
    case '/stake/rewards':
      return '960px';
    default:
      return undefined;
  }
};

const Main: FC<PropsWithChildren> = (props) => {
  const routes = useRouter();
  return (
    <MainStyle
      style={{
        maxWidth: getMaxWidthByPath(routes.pathname),
      }}
      size="tight"
      forwardedAs="main"
      {...props}
    />
  );
};

export default Main;
