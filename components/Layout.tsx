import { styled } from '@mui/material';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

const Main = styled('main')(({ theme }) => ({
  margin: '0 80px',
  [theme.breakpoints.down('sm')]: {
    display: 'grid',
    placeContent: 'center',
    margin: '0 10px',
  },
}));

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Where in the world?</title>
      </Head>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
