import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { Fonts, LidoUIHead } from 'ui/theme';
import { ServerStyleSheet } from 'styled-components';
import { dynamics } from '../config';

// for prod and dev use https and real domain
let host = 'http://localhost';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    if (ctx?.req?.headers?.host) {
      host = `https://${ctx?.req?.headers?.host}`;
    }

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  get metaTitle(): string {
    return 'Poolsea';
  }

  get metaDescription(): string {
    return (
      'Poolsea. ' +
      'Stake PLS with Poolsea to earn daily rewards while keeping full control of your staked tokens. ' +
      'Start earning rewards in just a few clicks.'
    );
  }

  get metaPreviewImgUrl(): string {
    return `${host}/lido-preview.png`;
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/logo.svg" sizes="any" />
          <link rel="icon" type="image/svg+xml" href="/logo.svg" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            sizes="194x194"
            type="image/svg+xml"
            href="/logo.svg"
          />
          <link
            rel="icon"
            sizes="32x32"
            type="image/svg+xml"
            href="/logo.svg"
          />
          <link
            rel="icon"
            sizes="16x16"
            type="image/svg+xml"
            href="/logo.svg"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={this.metaTitle} />
          <meta property="og:description" content={this.metaDescription} />
          <meta property="og:image" content={this.metaPreviewImgUrl} />
          <meta name="description" content={this.metaDescription} />
          <meta name="currentChain" content={String(dynamics.defaultChain)} />
          <Fonts />
          <LidoUIHead />
          <script src="/runtime/window-env.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
