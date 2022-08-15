import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import Header from '../components/header';
import Country from '../components/country';
import { CountryType } from '../types/types';
import Link from 'next/link';

// https://restcountries.com/v3.1/all
// https://restcountries.com/v3.1/name/peru

function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}

export async function getServerSideProps() {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const allCountryData = await res.json();
  return {
    props: { allCountryData },
  };
}

export default function Home({ allCountryData }) {
  return (
    <div>
      <Head>
        <title>Where in the world?</title>
      </Head>
      <Header />
      <input type='text' name='name' id='name' placeholder='Search for a country' />
      <div className={styles.grid}>
        {allCountryData.map((country) => {
          const id: string = country.name.official;
          return (
            <>
              <Country data={country} id={id} />
            </>
          );
        })}
      </div>
    </div>
  );
}
