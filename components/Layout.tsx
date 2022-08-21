import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';
import styles from '../styles/Layout.module.scss';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Where in the world?</title>
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
