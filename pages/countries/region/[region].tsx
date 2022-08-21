import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import Country from '../../../components/Country';
import CountryType from '../../../types/CountryType';
import styles from '../../../styles/Home.module.scss';
import { useRouter } from 'next/router';

export async function getServerSideProps(context: { params: { region: string } }) {
  const region = context.params.region;
  const res = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
  const countries: CountryType[] = await res.data;
  return { props: { countries, region } };
}

export default function CountriesByRegion({ countries, region }: { countries: CountryType[]; region: string }) {
  const router = useRouter();

  const filterRegion = (region: string) => {
    console.log(region);

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
          <span>Filter by region: {region}</span>
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