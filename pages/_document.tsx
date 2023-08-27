import { CssBaseline } from '@geist-ui/core';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = CssBaseline.flush();

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang='en' className='scroll-smooth'>
        <Head>
          <link
            rel='apple-touch-icon'
            sizes='76x76'
            href='/static/favicons/memoji.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/static/favicons/memoji.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/static/favicons/memoji.png'
          />
          <link rel='manifest' href='/static/favicons/site.webmanifest' />
          <meta name='msapplication-TileColor' content='#000000' />
          <meta name='theme-color' content='#000000' />
          <link rel='alternate' type='application/rss+xml' href='/feed.xml' />
        </Head>
        <body className='bg-white text-black antialiased dark:bg-gray-900 dark:text-white'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
