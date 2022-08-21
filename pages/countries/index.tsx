import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Country from '../../components/Country';
import CountryType from '../../types/CountryType';
import styles from '../../styles/Home.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';

export async function getServerSideProps() {
  const url = 'https://restcountries.com/v3.1/all';
  const res = await axios.get(url);
  const countries: CountryType[] = await res.data;
  return { props: { countries } };
}

export default function Countries({ countries }: { countries: CountryType[] }) {
  const router = useRouter();

  const filterRegion = (region: string) => {
    const url = region === 'None' ? '/countries' : `/countries/region/${region}`;
    router.push(url);
  };

  const search = () => {
    const query: string = (document.querySelector('#name') as HTMLInputElement).value;
    const url = query === '' ? '/countries' : `/countries/name/${query}`;
    router.push(url);
  };

  return (
    <>
      <div className={styles.filters}>
        <div>
          <input type='text' name='name' id='name' placeholder='Search for a country' />
          <button onClick={() => search()}>Search</button>
        </div>
        <div className={styles.dropdown}>
          <span>Filter by region: {'None'}</span>
          <div className={styles.dropdownContent}>
            <div onClick={() => filterRegion('Africa')}>Africa</div>
            <div onClick={() => filterRegion('America')}>America</div>
            <div onClick={() => filterRegion('Europe')}>Europe</div>
            <div onClick={() => filterRegion('Asia')}>Asia</div>
            <div onClick={() => filterRegion('Oceania')}>Oceania</div>
            <div onClick={() => filterRegion('None')}>None</div>
          </div>
        </div>
      </div>
      <div className={styles.cardGrid}>
        {countries.map((country: CountryType) => {
          return (
            <React.Fragment key={country.cca2}>
              <Country data={country} />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
