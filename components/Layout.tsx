import Head from 'next/head';
import Footer from './Footer';
import Header from './header';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Where in the world?</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
