import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/header';
import Country from '../components/country';
import CountryType from '../types/CountryType';
import styles from '../styles/Home.module.scss';
import axios from 'axios';
import crypto from 'crypto';

/* export async function getServerSideProps(context: { params: { name: string; region: string } }) {
  const url =
    context.params.region !== 'None'
      ? `https://restcountries.com/v3.1/region/${context.params.region}`
      : context.params.name !== ''
      ? `https://restcountries.com/v3.1/name/${context.params.name}`
      : 'https://restcountries.com/v3.1/all';
  const res = await axios.get(url);
  const countries: CountryType = await res.data;
  return { props: { countries } };
} */

export default function Home(/* { countries } */) {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [region, setRegion] = useState<string>('None');
  const [query, setQuery] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const getData = async () => {
      const url =
        region !== 'None'
          ? `https://restcountries.com/v3.1/region/${region}`
          : name !== ''
          ? `https://restcountries.com/v3.1/name/${name}`
          : 'https://restcountries.com/v3.1/all';
      const res = await axios.get(url);
      const countryData: CountryType[] = await res.data;
      setCountries(countryData);
    };
    getData();
  }, [region, name]);

  const search = () => {
    const query: string = (document.querySelector('#name') as HTMLInputElement).value;
    setName(query);
  };

  return (
    <main className={styles.main}>
      <Head>
        <title>Where in the world?</title>
      </Head>
      <Header />
      <div className={styles.filters}>
        <div>
          <input type='text' name='name' id='name' placeholder='Search for a country' />
          <button onClick={() => search()}>Search</button>
        </div>
        <div className={styles.dropdown}>
          <span>Filter by region: {region}</span>
          <div className={styles.dropdownContent}>
            <div onClick={() => setRegion('Africa')}>Africa</div>
            <div onClick={() => setRegion('America')}>America</div>
            <div onClick={() => setRegion('Europe')}>Europe</div>
            <div onClick={() => setRegion('Asia')}>Asia</div>
            <div onClick={() => setRegion('Oceania')}>Oceania</div>
            <div onClick={() => setRegion('None')}>None</div>
          </div>
        </div>
      </div>
      <div className={styles.cardGrid}>
        {countries.map((country: CountryType) => {
          const key = crypto.randomBytes(20).toString('hex');
          return (
            <React.Fragment key={key}>
              <Country data={country} />
            </React.Fragment>
          );
        })}
      </div>
    </main>
  );
}
